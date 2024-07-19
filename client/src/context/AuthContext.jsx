import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUser(token);
    }
    console.log("UseEffect Connected...", token);
  }, [token]);

  const getUser = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      if (response.ok) {
        setUser(res.user);
        console.log(res.user);
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const Login = async (email, password) => {
    if (!email || !password) {
      toast.error("Email and password required!");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();

      if (response.ok) {
        console.log(res.token);
        localStorage.setItem("token", res.token);
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Somthing went wrong!");
    }
  };
  const Logout = () => {
    console.log("Logout");
  };

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
