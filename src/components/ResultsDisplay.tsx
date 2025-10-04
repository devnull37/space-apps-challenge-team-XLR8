import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, TrendingUp, Cpu, BarChart3 } from "lucide-react";
import { ClassificationResult } from "@/utils/classifier";

interface ResultsDisplayProps {
  classificationResult: ClassificationResult | null;
}

export const ResultsDisplay = ({ classificationResult }: ResultsDisplayProps) => {
  if (!classificationResult) {
    return (
      <section className="py-20 container mx-auto px-4 bg-gradient-to-b from-transparent via-secondary/5 to-transparent">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Classification <span className="bg-gradient-secondary bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload your data above to see the AI-powered analysis with multi-model consensus
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { prediction, probabilities, confidence } = classificationResult;
  const perModels = classificationResult.perModel || [];
  return (
    <section className="py-20 container mx-auto px-4 bg-gradient-to-b from-transparent via-secondary/5 to-transparent">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Classification <span className="bg-gradient-secondary bg-clip-text text-transparent">Results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AI-powered analysis with multi-model consensus
          </p>
        </div>

        {/* Main Result */}
        <Card className="glass-card glow-secondary border-2 border-secondary/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-secondary animate-pulse-glow" />
            </div>
            <CardTitle className="text-3xl">{prediction}</CardTitle>
            <CardDescription className="text-lg">
              Confidence: <span className="text-secondary font-bold">{(confidence * 100).toFixed(1)}%</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={confidence * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Model Votes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card hover:glow-primary transition-all duration-300 col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-center">Ensemble Model Agreement</CardTitle>
              <CardDescription className="text-center">
                Ensemble results combine multiple model predictions for a robust classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {perModels.map((m, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{m.model}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="justify-center py-1 px-3 border-primary/30 bg-primary/10 text-primary text-xs"
                    >
                      {prediction}
                    </Badge>
                    {m.note && <p className="text-xs text-muted-foreground mt-1">{m.note}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Probabilities Display */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Probabilities Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {probabilities.map((prob, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{prob.class}</span>
                <div className="flex items-center gap-2">
                  <Progress value={prob.probability * 100} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground w-16">{(prob.probability * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
