import React, { useState } from "react";

function CreateUser({ onCreate, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const success = await onCreate({
      username: username,
      password: password
    });

    if (success) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Account</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Register User</button>
      <button onClick={onBack} style={{ marginLeft: "10px" }}>
        Go Back
      </button>
    </div>
  );
}

export default CreateUser;
