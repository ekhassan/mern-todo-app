import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <React.StrictMode> */}
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </Router>

    {/* </React.StrictMode> */}
  </>
);
