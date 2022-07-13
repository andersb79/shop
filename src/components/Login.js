import React, { useState } from "react";

export default function Login({ store, onLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <img className="login-img" src="loddelogo.jpg" alt="skillzta" />

      <div className="login-img-wrapper">
        <div className="login-user-name">
          <input
            placeholder="Användarnamn"
            className="login-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="login-password">
          <input
            placeholder="Lösenord"
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button variant="contained">LOGIN</button>
      </div>
    </div>
  );
}
