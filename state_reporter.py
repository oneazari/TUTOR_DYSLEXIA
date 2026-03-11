class StateReporter:
    def __init__(self, high_threshold=0.70, low_threshold=0.30):
        """
        Thresholds determine when to trigger alerts.
        0.70+ = High probability of struggling/dyslexic patterns.
        0.30- = Very low engagement (potentially distracted/skimming).
        """
        self.high_threshold = high_threshold
        self.low_threshold = low_threshold

    def format_for_frontend(self, probability):
        """
        Converts the ML math into clear labels for the React frontend.
        """
        # 1. Identify "Struggling" (High reading effort/Dyslexia pattern)
        if probability >= self.high_threshold:
            return {
                "state": "Struggling",
                "score": round(probability, 2),
                "ui_color": "red",
                "recommendation": "Show Hint / Simplify Text",
                "is_alert": True
            }

        # 2. Identify "Distracted" (Erratic/Too fast/Low effort pattern)
        elif probability <= self.low_threshold:
            return {
                "state": "Distracted",
                "score": round(1 - probability, 2), # Inverse for 'distraction' confidence
                "ui_color": "yellow",
                "recommendation": "Highlight current line / Audio Prompt",
                "is_alert": True
            }

        # 3. Identify "Focused" (Efficient reading pattern)
        else:
            return {
                "state": "Focused",
                "score": 0.5, # Neutral/Stable
                "ui_color": "green",
                "recommendation": "Continue",
                "is_alert": False
            }