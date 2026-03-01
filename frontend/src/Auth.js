import React, { useState } from "react";
import "./Auth.css";

const Auth = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    onLogin({
      username,
      avatar,
      progress: 0,
      completedChapters: [],
    });
  };

  return (
    <div className="auth-container">
      <h1>{isSignup ? "Create Account" : "Login"}</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isSignup && (
        <div className="avatar-select">
          <p>Select Avatar:</p>
          <button onClick={() => setAvatar("boy")}>👦 Boy</button>
          <button onClick={() => setAvatar("girl")}>👧 Girl</button>
        </div>
      )}

      <button onClick={handleSubmit}>
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p
        className="switch"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Auth;