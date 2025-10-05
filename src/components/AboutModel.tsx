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
                  <h4 className="font-semibold text-lg mb-1">Data Sourcing & Preprocessing</h4>
                  <p className="text-muted-foreground">
                    We begin with publicly available NASA exoplanet data from missions like Kepler. This raw data is meticulously preprocessed, which includes normalizing features by scaling them to a standard range and handling any missing values to ensure the data is clean and consistent for our models.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Feature Engineering</h4>
                  <p className="text-muted-foreground">
                    To maximize predictive power, we engineer new features from the existing parameters. This process involves creating meaningful new variables that help the models better distinguish between true exoplanets and false positives, revealing deeper patterns in the data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Multi-Model Training</h4>
                  <p className="text-muted-foreground">
                    We employ a multi-model strategy, independently training three powerful and distinct algorithms:
                    <br /><br />
                    Random Forest: An ensemble learning method that constructs a multitude of decision trees
                    during training and outputs the mode of the classes (classification) or mean prediction (regression)
                    of the individual trees. It excels at handling complex datasets and is robust against overfitting.
                    <br /><br />
                    XGBoost (Extreme Gradient Boosting): An optimized distributed gradient boosting library
                    designed to be highly efficient, flexible, and portable. It implements machine learning algorithms
                    under the Gradient Boosting framework. XGBoost provides a parallel tree boosting
                    (also known as GBDT, GBM) that solves many data science problems in a fast and accurate way.
                    <br /><br />
                    LightGBM (Light Gradient Boosting Machine): A gradient boosting framework that uses
                    tree-based learning algorithms. It is designed to be distributed and efficient,
                    with faster training speed and higher efficiency, lower memory usage, and better accuracy
                    compared to other gradient boosting frameworks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Probabilistic Predictions</h4>
                  <p className="text-muted-foreground">
                    When presented with a new exoplanet candidate, each of our three trained models independently calculates a probability score. This score represents the model's confidence that the candidate is a confirmed exoplanet versus a false positive.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Soft Voting Ensemble</h4>
                  <p className="text-muted-foreground">
                    The core of our system is the ensemble method. We use soft voting to combine the outputs of our models. The probability scores from Random Forest, XGBoost, and LightGBM are averaged to produce a single, consolidated probability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Final Classification</h4>
                  <p className="text-muted-foreground">
                    The final, averaged probability score determines the classification. By leveraging the diverse strengths of multiple models and mitigating their individual weaknesses, this ensemble approach provides a final classification that is significantly more accurate and reliable than any single model could achieve alone.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
