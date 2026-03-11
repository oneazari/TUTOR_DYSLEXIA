import joblib
import numpy as np
import os

class InferenceEngine:
    def __init__(self):
        """
        Option A: Automatically finds the .pkl files in the same 
        directory as this script.
        """
        # Get the absolute path of the current folder (ml_services)
        base_dir = os.path.dirname(os.path.abspath(__file__))
        
        model_path = os.path.join(base_dir, 'dyslexia_svm_model.pkl')
        scaler_path = os.path.join(base_dir, 'scaler.pkl')

        # Load the files
        try:
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            print("✅ ML Engine: Model and Scaler loaded successfully.")
        except FileNotFoundError:
            print(f"❌ ML Engine Error: Could not find .pkl files in {base_dir}")
            raise

    def predict_state(self, raw_data):
        """
        Takes raw dictionary from DataFetcher and returns 
        the probability of the student 'Struggling'.
        """
        try:
            # 1. Feature Engineering (The 70%+ Accuracy Logic)
            # We add +1 to denominators to prevent "Division by Zero" errors
            struggle_idx = raw_data['dwell'] / (raw_data['saccade'] + 1)
            density = raw_data['fixations'] / (raw_data['dwell'] + 1)

            # 2. Arrange features in the exact order the model expects:
            # [struggle_index, fix_density, regressions, saccade, dwell]
            feature_array = np.array([[
                struggle_idx, 
                density, 
                raw_data['regressions'], 
                raw_data['saccade'], 
                raw_data['dwell']
            ]])

            # 3. Transform data using the original training scale
            scaled_features = self.scaler.transform(feature_array)

            # 4. Get Probability of the "Struggling" class
            # predict_proba returns [[prob_0, prob_1]] -> we want prob_1
            probabilities = self.model.predict_proba(scaled_features)
            struggle_probability = probabilities[0][1]

            return struggle_probability

        except Exception as e:
            print(f"❌ Prediction Error: {e}")
            return 0.5  # Return neutral 50% if math fails