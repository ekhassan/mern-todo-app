import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../constants/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill all the fields!");
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const res = await response.json();
      if (response.ok) {
        toast.success(res.success);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="p-10 rounded-md ring-2 ring-indigo-800 bg-indigo-950/70 text-white">
          <h1 className="text-3xl mb-10 text-center font-bold">Signup</h1>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-form my-3"
          />
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
          <button className="btn my-3" onClick={handleSignup}>
            Signup
          </button>
          <p className="text-center font-mono font-semibold">or</p>
          <button className="btn-outline my-3">
            Already have an account? Signin
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
