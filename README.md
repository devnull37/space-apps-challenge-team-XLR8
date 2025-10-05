# Exoplanet Classifier Web Application

This project was developed by **Team XLR8** for the **NASA Space Apps Challenge 2025**.

## Team Members

*   devnull37(Faris Allafi)
*   Farah Muhssin
*   Mentor: Mr. Mohamed Salah


**School:** Yas American Academy (Aldar Schools Abu Dhabi)

This project is a web application designed to classify exoplanets using machine learning models. It's built with React, Vite, and TypeScript, and leverages Shadcn UI for a modern and responsive user interface.

## Features

*   **Exoplanet Classification:** Utilizes pre-trained machine learning models (LightGBM, Random Forest, XGBoost in ONNX format) to classify exoplanets.
*   **Interactive User Interface:** Built with React and Shadcn UI for a seamless user experience.
*   **Responsive Design:** Adapts to various screen sizes for optimal viewing on desktop and mobile devices.

## Technologies Used

*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   Shadcn UI
    *   Tailwind CSS
    *   ONNX Runtime Web (for running ML models in the browser)
*   **Machine Learning:**
    *   LightGBM (via ONNX)
    *   Random Forest (via ONNX)
    *   XGBoost (via ONNX)

## Project Structure

```
.
├── public/
│   ├── lgb_model.onnx        # LightGBM ONNX model
│   ├── rf_model.onnx         # Random Forest ONNX model
│   ├── xgboost_model.onnx    # XGBoost ONNX model
│   └── STAGE2/
│       ├── confirmed.csv     # Confirmed exoplanet data
│       └── false-positive.csv # False positive exoplanet data
├── src/
│   ├── components/           # React components
│   │   ├── AboutModel.tsx
│   │   ├── ClassifierForm.tsx
│   │   ├── DataVisualization.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ResultsDisplay.tsx
│   │   └── ui/               # Shadcn UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page components
│   └── utils/
│       └── classifier.ts     # Logic for exoplanet classification
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── ...other config files
```

## Training Code

The machine learning models used in this project were trained using the code available on Kaggle:
[https://www.kaggle.com/code/farisallafi/space-apps-challenge-team-xlr8](https://www.kaggle.com/code/farisallafi/space-apps-challenge-team-xlr8)

## License

This project is licensed under the Apache License 2.0.

##Website

[https://space-apps-challenge-xlr8.netlify.app/](https://space-apps-challenge-xlr8.netlify.app/)

