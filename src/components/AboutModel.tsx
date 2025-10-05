import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Layers, Target, Zap, Database, Cpu, Network, BarChart3, Vote, CheckCircle } from "lucide-react";

export const AboutModel = () => {
  const features = [
    {
      icon: Brain,
      title: "Multi-Model Ensemble",
      description: "Combines Random Forest, Gradient Boosting, and Neural Networks for superior accuracy.",
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
      description: "Achieves 97%+ accuracy on NASA Kepler, K2, and TESS mission data.",
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
        <Card className="glass-card border-2 border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>The technical approach behind our classification system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative space-y-6 pl-8">
              {/* Vertical Timeline Line */}
              <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-secondary via-accent to-primary opacity-30" />
              
              {/* Step 1: Data Sourcing & Preprocessing */}
              <div className="relative group/step animate-fade-in" style={{ animationDelay: '0.05s' }}>
                <div className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary glow-primary font-bold text-sm z-10">
                  1
                </div>
                <div className="glass-card p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <Database className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-lg text-primary">Data Sourcing & Preprocessing</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We begin with publicly available NASA exoplanet data from missions like Kepler. This raw data is preprocessed, 
                    which includes normalizing features by scaling them to a standard range and handling any missing values to ensure 
                    the data is clean and consistent for our models.
                  </p>
                </div>
              </div>

              {/* Step 2: Feature Engineering */}
              <div className="relative group/step animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-secondary glow-secondary font-bold text-sm z-10">
                  2
                </div>
                <div className="glass-card p-5 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-lg text-secondary">Feature Engineering</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To maximize predictive power, we engineer new features from the existing parameters. This process involves 
                    creating meaningful new variables that help the models better distinguish between true exoplanets and false 
                    positives, revealing deeper patterns in the data.
                  </p>
                </div>
              </div>

              {/* Step 3: Multi-Model Training */}
              <div className="relative group/step animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <div className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary glow-primary font-bold text-sm z-10">
                  3
                </div>
                <div className="glass-card p-5 rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <Cpu className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-lg text-accent">Multi-Model Training</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    We employ a multi-model strategy, independently training three powerful and distinct algorithms:
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rf" className="border-primary/20">
                      <AccordionTrigger className="text-sm font-semibold text-primary hover:text-primary/80 py-2">
                        Random Forest
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-2">
                        An ensemble learning method that constructs a multitude of decision trees during training and outputs 
                        the mode of the classes. It excels at handling complex datasets and is robust against overfitting.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="xgb" className="border-secondary/20">
                      <AccordionTrigger className="text-sm font-semibold text-secondary hover:text-secondary/80 py-2">
                        XGBoost (Extreme Gradient Boosting)
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-2">
                        An optimized distributed gradient boosting library designed to be highly efficient, flexible, and portable. 
                        It implements machine learning algorithms under the Gradient Boosting framework, solving many data science 
                        problems in a fast and accurate way.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="lgbm" className="border-accent/20">
                      <AccordionTrigger className="text-sm font-semibold text-accent hover:text-accent/80 py-2">
                        LightGBM (Light Gradient Boosting Machine)
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pt-2">
                        A gradient boosting framework that uses tree-based learning algorithms. Designed to be distributed and 
                        efficient, with faster training speed, higher efficiency, lower memory usage, and better accuracy compared 
                        to other gradient boosting frameworks.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Step 4: Probabilistic Predictions */}
              <div className="relative group/step animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-secondary glow-secondary font-bold text-sm z-10">
                  4
                </div>
                <div className="glass-card p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <Network className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-lg text-primary">Probabilistic Predictions</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    When presented with a new exoplanet candidate, each of our three trained models independently calculates a 
                    probability score. This score represents the model's confidence that the candidate is a confirmed exoplanet 
                    versus a false positive.
                  </p>
                </div>
              </div>

              {/* Step 5: Soft Voting Ensemble */}
              <div className="relative group/step animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <div className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary glow-primary font-bold text-sm z-10">
                  5
                </div>
                <div className="glass-card p-5 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <Vote className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-lg text-secondary">Soft Voting Ensemble</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The core of our system is the ensemble method. We use soft voting to combine the outputs of our models. 
                    The probability scores from Random Forest, XGBoost, and LightGBM are averaged to produce a single, 
                    consolidated probability.
                  </p>
                </div>
              </div>

              {/* Step 6: Final Classification */}
              <div className="relative group/step animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-secondary glow-secondary font-bold text-sm z-10">
                  6
                </div>
                <div className="glass-card p-5 rounded-lg border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <h4 className="font-bold text-lg text-accent">Final Classification</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The final, averaged probability score determines the classification. By leveraging the diverse strengths of 
                    multiple models and mitigating their individual weaknesses, this ensemble approach provides a final 
                    classification that is significantly more accurate and reliable than any single model could achieve alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="font-semibold text-lg mb-3">Dataset</h4>
              <p className="text-muted-foreground">
                Trained on publicly available NASA exoplanet data from the Kepler, K2, and TESS missions, 
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
