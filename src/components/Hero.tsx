import { Button } from "@/components/ui/button";
import { Rocket, Brain, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-exoplanets.jpg";

export const Hero = () => {
  const scrollToClassifier = () => {
    document.getElementById('classifier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">NASA Space Apps Challenge 2025 by Team XLR8</span>
            <a
              href="https://github.com/devnull37/space-apps-challenge-team-XLR8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline ml-4"
            >
              Source Code
            </a>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent text-glow">
              Exoplanet Classification
            </span>
            <br />
            <span className="text-foreground">Powered by AI</span>
          </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Problem: The discovery of thousands of exoplanets has been made possible by space‑based surveying missions, but most of these detections were done manually. Manual identification is slow, labor‑intensive, and unable to keep pace with the vast amounts of data being generated. This creates a bottleneck in advancing our understanding of exoplanets.
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our Solution: We designed an AI/ML pipeline that can automatically and accurately identify exoplanets from NASA’s open‑source datasets. Our pipeline streamlines the detection process, reduces human error, and enables faster, scalable analysis of large datasets.
            </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Multi-Model Ensemble</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary transition-all duration-300"
              onClick={scrollToClassifier}
            >
              Start Classification
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
