export const Theme = {
  // --- COLORS ---
  background: "#f8fafc", 
  sidebar: "#9b2420",
  accent: "#3498db",
  success: "#2ecc71",
  textMain: "#071a2e", 
  textMuted: "#64748b",
  
  // --- TYPOGRAPHY ---
  fontFamily: "'Lexend', sans-serif", 
  lineHeight: "1.8",      
  letterSpacing: "1.5px", 
  fontSize: {
    header: "32px",
    base: "22px", 
    small: "16px"
  },
  
  // --- LAYOUT ---
  borderRadius: "20px",
  cardShadow: "0 10px 30px rgba(0,0,0,0.1)", // Kept the bigger, cooler shadow!

  // --- COMPONENTS ---
  levelButton: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    fontSize: "28px",
    fontWeight: "bold",
    borderRadius: "20px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "transform 0.2s, background-color 0.3s",
    marginBottom: "20px",
    color: "white" 
  }
};