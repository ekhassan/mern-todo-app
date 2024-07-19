import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("hassan@gmail.com");
  const [password, setPassword] = useState("Asdfghjkl!");

  const { Login, user } = useAuth();

  const handleLogin = async () => {
    await Login(email, password);
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="p-10 rounded-md ring-2 ring-indigo-800 bg-indigo-950/70 text-white">
          <h1 className="text-3xl mb-10 text-center font-bold">Signin</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-form my-3"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input-form my-3"
          />
          <button className="btn my-3" onClick={handleLogin}>
            Signin
          </button>
          <p className="text-center font-mono font-semibold">or</p>
          <button className="btn-outline my-3">
            Dont have an account? Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default Signin;
