import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try{


    // Password strength
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Use 8+ chars, uppercase, lowercase, number & symbol"
      );
      return;
    }

    // Match check
    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match ❌");
      return;
    }

    setError("");


     await register({
        username : formData.username,
        email  : formData.email,
        password : formData.password
     })

        navigate("/");
    }catch(err){
        
        const message =
      err.response?.data?.message || "Something went wrong";
        
      setError(message)

    }
    

    
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-3xl 
        bg-white/70 backdrop-blur-lg 
        shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
        border border-white/40">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="new-username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/80 
            shadow-inner border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-orange-400 
            focus:shadow-lg transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="new-email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/80 
            shadow-inner border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-orange-400 
            focus:shadow-lg transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/80 
            shadow-inner border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-orange-400 
            focus:shadow-lg transition"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            autoComplete="new-confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/80 
            shadow-inner border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-orange-400 
            focus:shadow-lg transition"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-medium 
            bg-gradient-to-r from-orange-500 to-orange-600 
            shadow-lg shadow-orange-400/40
            hover:scale-[1.02] hover:shadow-orange-500/60 
            active:scale-[0.98] 
            transition duration-200"
          >
            Sign Up
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>

    </main>
  );
}