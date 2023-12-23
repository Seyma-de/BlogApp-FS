import React, { useState } from "react";
import axios from "axios";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        password,
      });

      if (response.status === 200) {
        alert("registration successful");
      } else {
        alert("registration failed");
      }
    } catch (error) {
      console.error("İstek sırasında bir hata oluştu:", error.message);
      alert("registration failed");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
