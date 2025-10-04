import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ClassifierForm } from "@/components/ClassifierForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { DataVisualization } from "@/components/DataVisualization";
import { AboutModel } from "@/components/AboutModel";
import { Footer } from "@/components/Footer";
import { ClassificationResult } from "@/utils/classifier";

const Index = () => {
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);

  return (
    <div className="min-h-screen relative">
      <Hero />
      <h1 className="text-center text-5xl font-bold text-primary-foreground mt-8">Team XLR8</h1>
      <ClassifierForm onClassificationResult={setClassificationResult} />
      <ResultsDisplay classificationResult={classificationResult} />
      <DataVisualization />
      <AboutModel />
      <Footer />
    </div>
  );
};

export default Index;
