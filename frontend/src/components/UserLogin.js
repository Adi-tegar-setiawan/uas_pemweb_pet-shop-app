// src/components/UserLogin.js
import React, { useState } from "react";

const UserLogin = ({ setUserLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "user" && password === "user123") {
      setUserLoggedIn(true);
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Admin</h2>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserLogin;
