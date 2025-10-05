import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { initializeClassifier, classifyExoplanet, ClassificationResult } from "@/utils/classifier";

interface FormData {
  koi_period: string;
  koi_duration: string;
  koi_prad: string;
  koi_teq: string;
  koi_insol: string;
  koi_srad: string;
  koi_depth: string;
  koi_impact: string;
  koi_kepmag: string;
  koi_gmag: string;
  koi_rmag: string;
  koi_imag: string;
  koi_zmag: string;
  koi_jmag: string;
  koi_hmag: string;
  koi_kpmag: string;
}

interface ClassifierFormProps {
  onClassificationResult: (result: ClassificationResult) => void;
}

export const ClassifierForm = ({ onClassificationResult }: ClassifierFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedAvailableFile, setSelectedAvailableFile] = useState<string | null>("confirmed.csv");
  const [formData, setFormData] = useState<FormData>({
    koi_period: "",
    koi_duration: "",
    koi_prad: "",
    koi_teq: "",
    koi_insol: "",
    koi_srad: "",
    koi_depth: "",
    koi_impact: "",
    koi_kepmag: "",
    koi_gmag: "",
    koi_rmag: "",
    koi_imag: "",
    koi_zmag: "",
    koi_jmag: "",
    koi_hmag: "",
    koi_kpmag: "",
  });

  useEffect(() => {
    console.log('🔄 ClassifierForm: useEffect triggered, starting initialization...');
    const init = async () => {
      try {
        console.log('🔄 ClassifierForm: Calling initializeClassifier...');
        await initializeClassifier();
        console.log('✅ ClassifierForm: initializeClassifier succeeded');
        setIsInitialized(true);
        toast.success("AI models initialized successfully!");
      } catch (error) {
        console.log('❌ ClassifierForm: initializeClassifier failed');
        alert('Model initialization failed: ' + JSON.stringify(error));
        toast.error("Failed to initialize models. Please refresh the page.");
        console.error('Detailed error:', error);
      }
    };
    init();
    console.log('✅ ClassifierForm: useEffect completed');
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = [formData]; // Wrap formData in an array for classifyExoplanet
      const result = await classifyExoplanet(data);
      onClassificationResult(result);
      toast.success("Manual entry classified successfully!");
    } catch (error) {
      console.error('❌ handleManualSubmit: Classification failed with error:', error);
      alert('Classification failed: ' + (error as Error).message);
      toast.error("Classification failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailableDataSubmit = async () => {
    if (!selectedAvailableFile) {
      toast.error("Please select a file from available data.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/STAGE2/${selectedAvailableFile}`);
      const text = await response.text();
      const data = parseCSV(text);
      const result = await classifyExoplanet(data);
      onClassificationResult(result);
      toast.success("Available data classified successfully!");
    } catch (error) {
      console.error('❌ handleAvailableDataSubmit: Classification failed with error:', error);
      alert('Classification failed: ' + (error as Error).message);
      toast.error("Classification failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🔍 handleFileUpload: Function called, checking file...');
    const file = e.target.files?.[0];
    if (!file) {
      console.log('❌ handleFileUpload: No file selected');
      return;
    }

    console.log('✅ handleFileUpload: File selected:', file.name);

    if (!file.name.endsWith('.csv')) {
      console.log('❌ handleFileUpload: File is not CSV:', file.name);
      toast.error("Please upload a CSV file");
      return;
    }

    console.log('✅ handleFileUpload: File validation passed');
    setIsLoading(true);

    try {
      console.log('🔄 handleFileUpload: Starting file reading...');
      const text = await file.text();
      console.log('✅ handleFileUpload: File read successfully, length:', text.length);

      console.log('🔄 handleFileUpload: Starting CSV parsing...');
      const data = parseCSV(text);
      console.log('✅ handleFileUpload: CSV parsed, data length:', data?.length);

      console.log('🔄 handleFileUpload: Starting classification...');
      const result = await classifyExoplanet(data);
      console.log('✅ handleFileUpload: Classification successful');

      onClassificationResult(result);
      toast.success("Classification complete! View results below.");
    } catch (error) {
      console.error('❌ handleFileUpload: Classification failed with error:', error);
      alert('Classification failed: ' + (error as Error).message);
      toast.error("Classification failed. Check console for details.");
    } finally {
      setIsLoading(false);
      console.log('🔄 handleFileUpload: Setting loading to false');
    }
  };

  function parseCSV(text: string): any[] {
    console.log('🔄 parseCSV: Starting CSV parsing...');

    const lines = text.split('\n').filter(l => l.trim());
    console.log('🔍 parseCSV: Lines found:', lines.length);

    if (lines.length < 2) {
      console.log('❌ parseCSV: Insufficient lines for CSV');
      throw new Error('CSV must have header and data rows');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    console.log('✅ parseCSV: Headers extracted:', headers);

    const dataRows = lines.slice(1);
    console.log('🔍 parseCSV: Data rows:', dataRows.length);

    const parsedData = dataRows.map((row, index) => {
      console.log(`🔍 parseCSV: Processing row ${index + 1}:`, row.substring(0, 100) + '...');

      const values = row.split(',').map(v => v.trim().replace(/"/g, ''));
      console.log(`🔍 parseCSV: Row ${index + 1} values:`, values);

      const obj: any = {};
      headers.forEach((h, i) => {
        const raw = values[i];
        // Use Number(...) so non-numeric strings become NaN (which the classifier will impute)
        const num = raw === undefined || raw === '' ? NaN : Number(raw);
        obj[h] = Number.isNaN(num) ? NaN : num;
      });

      console.log(`✅ parseCSV: Parsed row ${index + 1}:`, obj);
      return obj;
    });

    console.log('🎉 parseCSV: CSV parsed successfully, returning data');
    return parsedData;
  }

  return (
    <section id="classifier" className="py-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Classify Exoplanets
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload your data or enter parameters manually for AI-powered classification
          </p>
        </div>

        <Card className="glass-card glow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Input Data
            </CardTitle>
            <CardDescription>Choose your preferred input method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="upload">Upload CSV</TabsTrigger>
                <TabsTrigger value="available">Available Data</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-6 pt-6">
                <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(formData).map(key => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{key.replace("koi_", "").replace(/([A-Z])/g, ' $1').trim()} (KOI)</Label>
                      <Input
                        id={key}
                        type="number"
                        step="any"
                        value={(formData as any)[key]}
                        onChange={(e) => handleInputChange(key as keyof FormData, e.target.value)}
                        placeholder={`Enter ${key.replace("koi_", "").replace(/([A-Z])/g, ' $1').trim()}`}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary text-primary-foreground glow-primary hover:opacity-90"
                      disabled={isLoading || !isInitialized}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Classifying...
                        </>
                      ) : (
                        "Classify Manually"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="upload" className="space-y-6 pt-6">
                <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-2">Upload your CSV file</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    File should contain exoplanet parameters
                  </p>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10"
                      disabled={isLoading}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Choose File"
                      )}
                    </Button>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                  />
                </div>
              </TabsContent>

              <TabsContent value="available" className="space-y-6 pt-6">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Select a pre-loaded dataset to classify.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant={selectedAvailableFile === "confirmed.csv" ? "default" : "outline"}
                      onClick={() => setSelectedAvailableFile("confirmed.csv")}
                      disabled={isLoading}
                    >
                      Confirmed Exoplanets
                    </Button>
                    <Button
                      variant={selectedAvailableFile === "false-positive.csv" ? "default" : "outline"}
                      onClick={() => setSelectedAvailableFile("false-positive.csv")}
                      disabled={isLoading}
                    >
                      False Positives
                    </Button>
                  </div>
                  <Button
                    type="button"
                    className="w-full bg-gradient-primary text-primary-foreground glow-primary hover:opacity-90"
                    onClick={handleAvailableDataSubmit}
                    disabled={isLoading || !isInitialized || !selectedAvailableFile}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Classifying...
                      </>
                    ) : (
                      "Classify Selected Data"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
