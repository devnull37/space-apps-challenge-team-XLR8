import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Layers, Target, Zap } from "lucide-react";

export const AboutModel = () => {
  const features = [
    {
      icon: Brain,
      title: "Multi-Model Ensemble",
      description: "Combines Random Forest, XGboost, and, LightGBM for superior accuracy.",
      color: "text-primary",
    },
    {
      icon: Layers,
      title: "Soft Voting System",
      description: "Averages probability predictions from all models, reducing individual model bias.",
      color: "text-secondary",
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "Achieves high accuracy on NASA Kepler(and other probes), exoplanet mission data.",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Fast predictions enable instant classification of new exoplanet candidates.",
      color: "text-primary",
    },
  ];

  return (
    <section id="about" className="py-20 container mx-auto px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            About the <span className="bg-gradient-primary bg-clip-text text-transparent">AI Model</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our soft voting ensemble system leverages multiple machine learning models to achieve 
            state-of-the-art accuracy in exoplanet classification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-card hover:glow-primary transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-primary ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Details */}
        <Card className="glass-card border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>The technical approach behind our classification system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Data Preprocessing</h4>
                  <p className="text-muted-foreground">
                    Exoplanet parameters from NASA missions are normalized and feature-engineered 
                    for optimal model performance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Multi-Model Prediction</h4>
                  <p className="text-muted-foreground">
                    Three independently trained models (Random Forest, XGboost, and, LightGBM) 
                    each generate probability predictions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Soft Voting Ensemble</h4>
                  <p className="text-muted-foreground">
                    Probability predictions are averaged across all models, producing a final 
                    classification with enhanced accuracy and reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="font-semibold text-lg mb-3">Dataset</h4>
              <p className="text-muted-foreground">
                Trained on publicly available NASA exoplanet data from the Kepler mission, 
                containing thousands of confirmed and candidate exoplanets with detailed orbital and 
                physical parameters.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
