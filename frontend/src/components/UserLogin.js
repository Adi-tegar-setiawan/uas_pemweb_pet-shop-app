// src/components/UserLogin.js
import React, { useState } from "react";

const UserLogin = ({ setUserLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const result = await response.json();

      if (result.status === "success") {
        const user = result.data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          setUserLoggedIn(true);
        } else {
          setError("Email atau password salah");
        }
      } else {
        setError("Gagal mengambil data user");
      }
    } catch (error) {
      setError("Terjadi kesalahan: " + error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, address: "" }),
      });

      if (response.ok) {
        setError("");
        alert("Registrasi berhasil! Silakan login.");
        setIsRegistering(false);
      } else {
        setError("Registrasi gagal");
      }
    } catch (error) {
      setError("Terjadi kesalahan: " + error.message);
    }
  };

  return (
    <div className="login-container">
      {!isRegistering ? (
        <>
          <h2>Login User</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setIsRegistering(true)}>Register</button>
          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <>
          <h2>Register User</h2>
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={() => setIsRegistering(false)}>Kembali ke Login</button>
          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default UserLogin;
