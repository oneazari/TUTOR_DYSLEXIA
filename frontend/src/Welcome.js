import React from "react";

function Welcome({ onCreate, onLogin }) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Welcome to Tutor Dyslexia</h1>
      <p>Your personalized learning assistant</p>

      <br />

      <button onClick={onCreate} style={{ marginRight: "10px" }}>
        Create Account
      </button>

      <button onClick={onLogin}>
        Login
      </button>
    </div>
  );
}

export default Welcome;
