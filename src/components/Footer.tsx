import { Rocket } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ExoClassify
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered exoplanet classification for the NASA Space Apps Challenge.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#classifier" className="hover:text-primary transition-colors">
                  Classifier Tool
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About the Model
                </a>
              </li>
              <li>
                <a href="kaggle.com/datasets/arashnic/exoplanets" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  NASA Exoplanet Dataset
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>© 2025 ExoClassify. Built for NASA Space Apps Challenge.</p>
          <p className="mt-1">Team: devnull37 (Faris Allafi), Farah Muhssin</p>
          <p className="mt-1">Mentor: Mr. Mohamed Salah</p>
          <p className="mt-1">School: Yas American Academy(Aldar Schools Abu Dhabi)</p>
          <p className="mt-1">Dataset: <a href="kaggle.com/datasets/arashnic/exoplanets" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Kepler Exoplanet Dataset (Kaggle)</a></p>
        </div>
      </div>
    </footer>
  );
};
