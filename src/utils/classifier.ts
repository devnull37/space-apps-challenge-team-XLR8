// Note: onnxruntime-web must be imported properly in the final project
import * as ort from 'onnxruntime-web';

// Types
export interface ProcessedFeatures {
  features: number[];
  featureNames: string[];
}

export interface ClassificationResult {
  prediction: string;
  probabilities: { class: string; probability: number }[];
  confidence: number;
  perModel?: { model: string; probabilities: { class: string; probability: number }[]; note?: string }[];
}

// Preprocessing configuration from preprocessing.json
const PREPROCESSING_CONFIG = {
  feature_names: [
    "koi_score",
    "koi_fpflag_nt",
    "koi_fpflag_ss",
    "koi_fpflag_co",
    "koi_fpflag_ec",
    "koi_period",
    "koi_period_err1",
    "koi_period_err2",
    "koi_time0bk",
    "koi_time0bk_err1",
    "koi_time0bk_err2",
    "koi_impact",
    "koi_impact_err1",
    "koi_impact_err2",
    "koi_duration",
    "koi_duration_err1",
    "koi_duration_err2",
    "koi_depth",
    "koi_depth_err1",
    "koi_depth_err2",
    "koi_prad",
    "koi_prad_err1",
    "koi_prad_err2",
    "koi_teq",
    "koi_insol",
    "koi_insol_err1",
    "koi_insol_err2",
    "koi_model_snr",
    "koi_tce_plnt_num",
    "koi_steff",
    "koi_steff_err1",
    "koi_steff_err2",
    "koi_slogg",
    "koi_slogg_err1",
    "koi_slogg_err2",
    "koi_srad",
    "koi_srad_err1",
    "koi_srad_err2",
    "ra",
    "dec",
    "koi_kepmag",
    "koi_period_sym_unc",
    "koi_period_rel_unc",
    "koi_time0bk_sym_unc",
    "koi_time0bk_rel_unc",
    "koi_impact_sym_unc",
    "koi_impact_rel_unc",
    "koi_duration_sym_unc",
    "koi_duration_rel_unc",
    "koi_depth_sym_unc",
    "koi_depth_rel_unc",
    "koi_prad_sym_unc",
    "koi_prad_rel_unc",
    "koi_insol_sym_unc",
    "koi_insol_rel_unc",
    "koi_steff_sym_unc",
    "koi_steff_rel_unc",
    "koi_slogg_sym_unc",
    "koi_slogg_rel_unc",
    "koi_srad_sym_unc",
    "koi_srad_rel_unc"
  ],
  imputer: {
    strategy: "median",
    statistics_: [
      0.334, 0, 0, 0, 0, 9.75283067, 3.52e-05, -3.52e-05, 137.22459500000002,
      0.00413, -0.00413, 0.428, 0.112, -0.089, 3.7926, 0.142, -0.142,
      68.4, 4.2, -4.2, 1.17, 0.08, -0.08, 878, 0.29, 0.04, -0.04,
      24.3, 5, 3788, 54, -54, 4.72, 0.11, -0.11, 0.52, 0.03, -0.03,
      286.17539, 44.26812, 14.762, 
      3.52e-05, 5.098010303581797e-06, 0.00413,
      2.7977769861987246e-05, 0.1005, 0.2348, 0.145, 0.0377, 4.2, 0.0514,
      0.08, 0.0684, 0.04, 0.1379, 54, 0.0143, 0.11, 0.0233, 0.03, 0.0577
    ]
  },
  label_classes: ["CANDIDATE", "CONFIRMED", "FALSE POSITIVE"]
};

// Class to manage model loading and inference
class EnsembleClassifier {
  private xgboostSession: ort.InferenceSession | null = null;
  private rfSession: ort.InferenceSession | null = null;
  private lgbSession: ort.InferenceSession | null = null;
  private isLoaded = false;

  async loadModels(): Promise<void> {
    if (this.isLoaded) {
      console.log('📋 loadModels: Models already loaded, skipping');
      return;
    }

    console.log('🚀 loadModels: Starting model loading process...');

    try {
      console.log('🔄 loadModels: Creating inference sessions...');

      // Configure wasm runtime path for onnxruntime-web. Avoid deep imports
      // that can confuse the bundler; instead point to a CDN or a local
      // /public copy of the wasm file. Replace with a local path if you
      // prefer to host the wasm file alongside your app (e.g. '/ort-wasm.wasm').
      try {
        if (ort?.env?.wasm) {
          // Point to the dist directory (trailing slash important). The runtime
          // will append platform-specific names like `ort-wasm-simd.wasm`.
          const cdnWasmDir = 'https://unpkg.com/onnxruntime-web@1.18.0/dist/';
          ort.env.wasm.wasmPaths = cdnWasmDir;
          // Force single-threaded mode to avoid crossOriginIsolated requirements
          // which are hard to enable in local dev without special headers.
          try {
            ort.env.wasm.numThreads = 1;
          } catch (_) {
            // Some builds expose numThreads as non-writable; ignore in that case.
          }
          console.log('🔧 loadModels: Configured ort.env.wasm.wasmPaths ->', cdnWasmDir);
          console.log('🔧 loadModels: Forced ort.env.wasm.numThreads = 1 to avoid COI requirements');
        } else {
          console.warn('⚠️ loadModels: ort.env.wasm not available; runtime may fail to load wasm.');
        }
      } catch (e) {
        console.warn('⚠️ loadModels: Failed to configure wasm path:', e);
      }

      const createOpts = { executionProviders: ['wasm'], graphOptimizationLevel: 'all' } as any;

      console.log('🔄 loadModels: Loading XGBoost model...');
      const xgboost = await ort.InferenceSession.create('/xgboost_model.onnx', createOpts);
      console.log('✅ loadModels: XGBoost model loaded, input names:', xgboost.inputNames, 'output names:', xgboost.outputNames);

      console.log('🔄 loadModels: Loading Random Forest model...');
      const rf = await ort.InferenceSession.create('/rf_model.onnx', createOpts);
      console.log('✅ loadModels: RF model loaded, input names:', rf.inputNames, 'output names:', rf.outputNames);

      console.log('🔄 loadModels: Loading LightGBM model...');
      const lgb = await ort.InferenceSession.create('/lgb_model.onnx', createOpts);
      console.log('✅ loadModels: LGB model loaded, input names:', lgb.inputNames, 'output names:', lgb.outputNames);

      this.xgboostSession = xgboost;
      this.rfSession = rf;
      this.lgbSession = lgb;
      this.isLoaded = true;

      console.log('✅ loadModels: All models loaded successfully');
    } catch (error) {
      console.error('❌ loadModels: Failed to load models:', error);
      throw new Error('Model loading failed. Please check console for details.');
    }
  }

  async runEnsembleInference(inputData: any[]): Promise<ClassificationResult> {
  console.log('🚀 runEnsembleInference: Starting ensemble inference...');
    console.log('📊 runEnsembleInference: Input data sample:', JSON.stringify(inputData[0], null, 2));

    if (!this.isLoaded) {
      console.log('❌ runEnsembleInference: Models not loaded!');
      throw new Error('Models not loaded');
    }

    try {
      console.log('🔄 runEnsembleInference: Starting data preprocessing...');
      // Preprocess the input data
      const processedFeatures = this.preprocessData(inputData); 
      console.log('✅ runEnsembleInference: Data preprocessed, features length:', processedFeatures.features.length);
      console.log('🔍 runEnsembleInference: Feature sample:', processedFeatures.features.slice(0, 10));

      console.log('🔄 runEnsembleInference: Starting model inference on all loaded models...');

      // Helper: robustly convert model raw output to probability vector matching label_classes
      const robustToProbs = (out: number[] | undefined): { probs: number[] | null; note?: string } => {
        const N = PREPROCESSING_CONFIG.label_classes.length;
        if (!out) return { probs: null, note: 'no output' };

        // If single integer -> interpret as class index
        if (out.length === 1 && Number.isInteger(out[0]) && out[0] >= 0 && out[0] < N) {
          const idx = out[0];
          return { probs: PREPROCESSING_CONFIG.label_classes.map((_, i) => (i === idx ? 1 : 0)), note: 'interpreted as class index' };
        }

        // If exactly N values
        if (out.length === N) {
          const sum = out.reduce((s, v) => s + v, 0);
          if (Math.abs(sum - 1) < 1e-3 && out.every(v => v >= 0)) {
            return { probs: out.slice(), note: 'already probabilities' };
          }
          // treat as logits
          try {
            const exps = out.map(v => Math.exp(v));
            const s = exps.reduce((a, b) => a + b, 0);
            return { probs: exps.map(e => e / s), note: 'softmaxed logits' };
          } catch (e) {
            return { probs: null, note: 'softmax failed' };
          }
        }

        // If more than N, try taking the last N values (common in some exporters)
        if (out.length > N) {
          const last = out.slice(-N);
          try {
            const exps = last.map(v => Math.exp(v));
            const s = exps.reduce((a, b) => a + b, 0);
            return { probs: exps.map(e => e / s), note: `took last ${N} values and softmaxed` };
          } catch (e) {
            // fallback: normalize last N by sum
            const s = last.reduce((a, b) => a + b, 0);
            if (s === 0) return { probs: null, note: 'cannot normalize last N (sum=0)' };
            return { probs: last.map(v => v / s), note: `took last ${N} values and normalized` };
          }
        }

        // If fewer than N but >1: try to normalize and distribute remaining mass
        if (out.length > 1 && out.length < N) {
          const sum = out.reduce((s, v) => s + v, 0);
          // If they look like probabilities
          if (Math.abs(sum - 1) < 1e-3 && out.every(v => v >= 0)) {
            const missing = N - out.length;
            const remaining = 0; // since sum ~=1, nothing to distribute
            const probs = out.concat(Array(missing).fill(remaining / Math.max(1, missing)));
            // normalize to be safe
            const s2 = probs.reduce((a, b) => a + b, 0);
            return { probs: probs.map(v => v / s2), note: `padded probabilities to ${N}` };
          }

          // Treat as logits for the provided classes, then pad remaining classes equally
          try {
            const exps = out.map(v => Math.exp(v));
            const s = exps.reduce((a, b) => a + b, 0);
            const probsProvided = exps.map(e => e / s);
            const missing = N - out.length;
            const fill = missing > 0 ? (1 - probsProvided.reduce((a, b) => a + b, 0)) / missing : 0;
            const probs = probsProvided.concat(Array(missing).fill(fill));
            // normalize residual rounding
            const s2 = probs.reduce((a, b) => a + b, 0);
            return { probs: probs.map(v => v / s2), note: `softmaxed ${out.length} logits and padded ${missing} classes` };
          } catch (e) {
            return { probs: null, note: 'failed to softmax and pad' };
          }
        }

        // If single value but not integer
        if (out.length === 1) {
          const v = out[0];
          if (!Number.isFinite(v)) return { probs: null, note: 'single non-finite value' };
          if (v >= 0 && v <= 1) {
            // assume it's probability for the middle class: distribute remaining mass equally
            const remaining = 1 - v;
            const pad = remaining / (N - 1);
            const probs = [pad, v, pad].slice(0, N);
            return { probs, note: 'mapped single probability to middle class and padded others' };
          }
          // otherwise, try softmax over vector [0, v, 0] to make relative score
          try {
            const vec = [0, v, 0].slice(0, N);
            const exps = vec.map(x => Math.exp(x));
            const s = exps.reduce((a, b) => a + b, 0);
            return { probs: exps.map(e => e / s), note: 'mapped single value to [0,v,0] and softmaxed' };
          } catch (e) {
            return { probs: null, note: 'unable to map single value' };
          }
        }

        return { probs: null, note: 'unhandled output shape' };
      };

      // Run inference for each available model session
      const sessions: { name: string; session: ort.InferenceSession | null }[] = [
        { name: 'XGBoost', session: this.xgboostSession },
        { name: 'Random Forest', session: this.rfSession },
        { name: 'LightGBM', session: this.lgbSession }
      ];

      const perModel: { model: string; probabilities: { class: string; probability: number }[]; note?: string }[] = [];
      const probsList: number[][] = [];

      for (const s of sessions) {
        if (!s.session) {
          console.log('ℹ️ runEnsembleInference: Session not available for', s.name);
          continue;
        }
        try {
          const raw = await this.runModelInference(s.session, processedFeatures);
          console.log('🔎 runEnsembleInference:', s.name, 'raw output length:', raw ? raw.length : 'none', 'sample:', (raw || []).slice(0, 5));
          const { probs, note } = robustToProbs(raw as number[]);
          if (!probs) {
            console.warn('⚠️ runEnsembleInference:', s.name, 'could not be converted to probabilities. Note:', note);
            // still include a placeholder distribution (uniform) so UI shows the model
            const uniform = Array(PREPROCESSING_CONFIG.label_classes.length).fill(1 / PREPROCESSING_CONFIG.label_classes.length);
            perModel.push({
              model: s.name,
              probabilities: uniform.map((prob, i) => ({ class: PREPROCESSING_CONFIG.label_classes[i], probability: prob })),
              note: `fallback: uniform distribution (${note || 'no note'})`
            });
            probsList.push(uniform);
            continue;
          }
          // ensure numeric array and normalize to sum=1
          const ssum = probs.reduce((a, b) => a + b, 0) || 1;
          const normalized = probs.map(p => p / ssum);
          perModel.push({
            model: s.name,
            probabilities: normalized.map((prob, i) => ({ class: PREPROCESSING_CONFIG.label_classes[i], probability: prob })),
            note
          });
          probsList.push(normalized);
        } catch (e) {
          console.warn('⚠️ runEnsembleInference: Error running model', s.name, e);
          // include uniform fallback so UI still shows the model
          const uniform = Array(PREPROCESSING_CONFIG.label_classes.length).fill(1 / PREPROCESSING_CONFIG.label_classes.length);
          perModel.push({ model: s.name, probabilities: uniform.map((prob, i) => ({ class: PREPROCESSING_CONFIG.label_classes[i], probability: prob })), note: 'error during inference, used uniform fallback' });
          probsList.push(uniform);
        }
      }

      if (probsList.length === 0) {
        throw new Error('No model returned usable probabilities');
      }

      // Average probabilities across models (simple unweighted average)
      const ensembleProbs = probsList[0].map((_, i) => {
        let sum = 0;
        for (const p of probsList) sum += p[i];
        return sum / probsList.length; 
      });

      const maxProb = Math.max(...ensembleProbs);
      const predIndex = ensembleProbs.indexOf(maxProb);
      const prediction = PREPROCESSING_CONFIG.label_classes[predIndex];

      const probabilities = ensembleProbs.map((prob, i) => ({ class: PREPROCESSING_CONFIG.label_classes[i], probability: prob }));

      console.log('🎯 runEnsembleInference: Final ensemble prediction:', prediction, 'confidence:', maxProb);

      return {
        prediction,
        probabilities,
        confidence: maxProb,
        perModel
      };
    } catch (error) {
      console.error('❌ runEnsembleInference: Inference error:', error);
      throw new Error('Classification failed. Please check console for details.');
    }
  }

  private preprocessData(inputData: any[]): ProcessedFeatures {
    if (!Array.isArray(inputData)) {
      throw new Error('Input data must be an array');
    }

    // Assume first element is the data object for a single instance
    const obj = inputData[0] || {};

    // Add uncertainty features
    const augmented = { ...obj };
    const features = PREPROCESSING_CONFIG.feature_names;
    features.forEach(f => {
      if (augmented[f] === undefined) augmented[f] = 0;
    });

    // Compute uncertainties on the fly
    const bases = ['koi_period', 'koi_time0bk', 'koi_impact', 'koi_duration', 'koi_depth', 'koi_prad', 'koi_insol', 'koi_steff', 'koi_slogg', 'koi_srad'];
    bases.forEach(base => {
      const err1 = augmented[base + '_err1'];
      const err2 = augmented[base + '_err2'];
      const val = augmented[base];
      if (!isNaN(val) && !isNaN(err1) && !isNaN(err2)) {
        const sym = 0.5 * (Math.abs(err1) + Math.abs(err2));
        augmented[base + '_sym_unc'] = sym;
        augmented[base + '_rel_unc'] = sym / (Math.abs(val) + 1e-8);
      } else {
        augmented[base + '_sym_unc'] = 0;
        augmented[base + '_rel_unc'] = 0;
      }
    });

    // Select only feature_names, in order, impute
    const featureArray = features.map(f => {
      let v = augmented[f];
      if (isNaN(v) || v === null || v === undefined) {
        const idx = features.indexOf(f);
        v = PREPROCESSING_CONFIG.imputer.statistics_[idx];
      }
      return v;
    });

    return {
      features: featureArray,
      featureNames: features
    };
  }

  private async runModelInference(session: ort.InferenceSession, features: ProcessedFeatures): Promise<number[]> {
    const tensor = new ort.Tensor('float32', new Float32Array(features.features), [1, features.features.length]);

    // Use dynamic input name
    const feeds: { [key: string]: ort.Tensor } = {};
    feeds[session.inputNames[0]] = tensor;

    // Get initial output names from the session
    const modelOutputs = session.outputNames || [];
    let outputs: Record<string, any>;
    let preferredOutputName: string | null = null;

    try {
      // First attempt: Run with all outputs (works for XGBoost)
      outputs = await session.run(feeds);
    } catch (e: any) {
      console.warn(`⚠️ runModelInference: Full output run failed. Retrying with specific outputs. Error: ${e.message}`);
      
      // Try probability outputs first
      const probOutput = modelOutputs.find(n => /prob/i.test(n));
      if (probOutput) {
        try {
          outputs = await session.run(feeds, [probOutput]);
          preferredOutputName = probOutput;
          console.log(`✅ runModelInference: Successfully ran with probability output: ${probOutput}`);
        } catch (probError: any) {
          console.warn(`⚠️ runModelInference: Probability output failed: ${probError.message}`);
        }
      }

      // If probability output failed or wasn't found, try label output
      if (!outputs) {
        const labelOutput = modelOutputs.find(n => /label/i.test(n));
        if (labelOutput) {
          try {
            outputs = await session.run(feeds, [labelOutput]);
            preferredOutputName = labelOutput;
            console.log(`✅ runModelInference: Successfully ran with label output: ${labelOutput}`);
          } catch (labelError: any) {
            console.error(`❌ runModelInference: Label output also failed: ${labelError.message}`);
            return []; // Signal failure to outer loop for fallback
          }
        } else {
          console.error('❌ runModelInference: No probability or label outputs found to try');
          return []; // Signal failure
        }
      }
    }
    // Try to pick the best tensor-like output, but be defensive if the value isn't a tensor
    const tryExtract = (name: string): { ok: boolean; values?: number[]; reason?: string } => {
      let v: any;
      try {
        v = outputs[name];
      } catch (e: any) {
        return { ok: false, reason: `access-threw:${String(e && e.message ? e.message : e)}` };
      }
      if (v == null) return { ok: false, reason: 'missing' };

      try {
        // If it's a tensor-like object with .data, read it safely
        if (typeof v === 'object' && typeof v.data !== 'undefined') {
          try {
            const arr = Array.from(v.data as ArrayLike<any>).map((x: any) => (typeof x === 'bigint' ? Number(x) : Number(x)));
            return { ok: true, values: arr };
          } catch (e: any) {
            return { ok: false, reason: `data-read-failed:${String(e && e.message ? e.message : e)}` };
          }
        }

        // If it's a plain array (sequence output), coerce to numbers
        if (Array.isArray(v)) {
          try {
            const arr = v.map((x: any) => (typeof x === 'bigint' ? Number(x) : Number(x)));
            return { ok: true, values: arr };
          } catch (e: any) {
            return { ok: false, reason: `array-coerce-failed:${String(e && e.message ? e.message : e)}` };
          }
        }

        // If it's a scalar number or bigint
        if (typeof v === 'number' || typeof v === 'bigint') {
          return { ok: true, values: [Number(v)] };
        }

        // If it's a string, attempt to parse as number or map to label index
        if (typeof v === 'string') {
          const maybeNum = Number(v);
          if (!Number.isNaN(maybeNum)) return { ok: true, values: [maybeNum] };
          // try map to known label names
          const idx = PREPROCESSING_CONFIG.label_classes.findIndex(c => c.toLowerCase() === v.toLowerCase());
          if (idx >= 0) return { ok: true, values: [idx] };
          return { ok: false, reason: 'string-unmappable' };
        }

        // Unknown output type: include its keys for debugging in reason
        try {
          const keys = Object.keys(v || {}).slice(0, 5).join(',');
          return { ok: false, reason: `unknown-output-type(keys:${keys})` };
        } catch (e: any) {
          return { ok: false, reason: `unknown-output-uninspectable:${String(e && e.message ? e.message : e)}` };
        }
      } catch (e: any) {
        return { ok: false, reason: `extraction-threw:${String(e && e.message ? e.message : e)}` };
      }
    };

    // Now extract the output data, starting with any preferred output if we found one
    let chosenName: string | undefined;
    let extracted: { ok: boolean; values?: number[]; reason?: string } = { ok: false };

    // First try our preferred output if we found one
    if (preferredOutputName) {
      chosenName = preferredOutputName;
      extracted = tryExtract(chosenName);
    }

    // If that didn't work or we didn't have a preferred output, try to detect model type
    if (!extracted.ok) {
      if (session.inputNames[0] === 'float_input' && modelOutputs.includes('output_probability')) {
        // Random Forest
        chosenName = 'output_probability';
        extracted = tryExtract(chosenName);
      } else if (session.inputNames[0] === 'input' && modelOutputs.includes('probabilities')) {
        // LightGBM
        chosenName = 'probabilities';
        extracted = tryExtract(chosenName);
      } else {
        // Default: prefer named probability outputs
        chosenName = modelOutputs.find(n => /prob/i.test(n));
        extracted = chosenName ? tryExtract(chosenName) : { ok: false };
      }
    }

    if (!extracted.ok) {
      // Try any output that looks tensor-like with length > 1
      for (const n of modelOutputs) {
        const cand = tryExtract(n);
        if (cand.ok && cand.values && cand.values.length > 1) {
          chosenName = n;
          extracted = cand;
          break;
        }
      }
    }

    // Final fallback: try first available output
    if (!extracted.ok) {
      for (const n of modelOutputs) {
        const cand = tryExtract(n);
        if (cand.ok) {
          chosenName = n;
          extracted = cand;
          break;
        }
      }
    }

    // If still not usable, try to extract from non-tensor object output
    if (!extracted.ok || !extracted.values) {
      const debugTypes = modelOutputs.map(n => ({ name: n, type: typeof outputs[n], value: outputs[n] }));
      console.warn('⚠️ runModelInference: No usable output found. Available outputs:', debugTypes, 'reasons: ', extracted.reason);
      
      // Try to extract from object with nested array or 'value' property
      for (const n of modelOutputs) {
        const raw = outputs[n];
        if (raw && typeof raw === 'object') {
          // If it has a 'value' property that's an array
          if (Array.isArray(raw.value)) {
            const arr = raw.value.flat(Infinity).map((v: any) => Number(v));
            if (arr.length > 0) {
              console.log('🔎 runModelInference: Extracted from .value property', n, 'length:', arr.length, 'sample:', arr.slice(0, 5));
              return arr;
            }
          }
          // If it's a nested array
          if (Array.isArray(raw)) {
            const arr = raw.flat(Infinity).map((v: any) => Number(v));
            if (arr.length > 0) {
              console.log('🔎 runModelInference: Extracted from nested array', n, 'length:', arr.length, 'sample:', arr.slice(0, 5));
              return arr;
            }
          }
        }
      }
      throw new Error('Model returned no usable outputs');
    }

    // Extract and cleanup final output
    let result: number[];
    if (Array.isArray(extracted.values)) {
      result = extracted.values.flat(Infinity).map((v: any) => Number(v));
    } else {
      result = [Number(extracted.values)];
    }
    console.log('🔎 runModelInference: Final output from', chosenName, 'length:', result.length, 'sample:', result.slice(0, 5));
    return result;
  }
}

// Global classifier instance
let classifier: EnsembleClassifier | null = null;

export async function initializeClassifier(): Promise<void> {
  if (!classifier) {
    classifier = new EnsembleClassifier();
  }
  await classifier.loadModels();
}

export async function classifyExoplanet(inputData: any[]): Promise<ClassificationResult> {
  if (!classifier) {
    throw new Error('Classifier not initialized');
  }
  return classifier.runEnsembleInference(inputData);
}
