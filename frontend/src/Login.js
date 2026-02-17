import React, { useState } from "react";

function Login({ onSuccess, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful!");
      } else {
        alert(data.error || "Signup Failed");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        onSuccess(username);   // 🔥 THIS sends user to App.js
      } else {
        alert(data.error || "Login Failed");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login / Signup</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
        Login
      </button>

      <br /><br />

      <button onClick={onBack}>Go Back</button>
    </div>
  );
}

export default Login;
