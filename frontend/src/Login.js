import React, { useState } from "react";
import "./App.css";

function Login({ onSuccess, onBack }) {
  const [username, setUsername] = useState("");

  return (
    <div style={{ textAlign: "center", paddingTop: "80px" }}>
      <h2 style={{ fontSize: "28px" }}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        <button style={{ backgroundColor: "#4CAF50", color: "white" }} onClick={() => onSuccess(username)}>Login</button>
        <button style={{ backgroundColor: "#999", color: "white" }} onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default Login;
