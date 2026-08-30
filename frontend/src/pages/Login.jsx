import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 bg-white/10 backdrop-blur-md min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-sky-200/20 blur-3xl top-20 left-10 rounded-full" />
        <div className="absolute w-96 h-96 bg-blue-200/20 blur-3xl bottom-20 right-10 rounded-full" />
      </div>

      {/* Container */}
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
            <p className="text-2xl">👋</p>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to continue your interview preparation</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/60">
          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleForm}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleForm}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <BsEyeSlash className="w-5 h-5" />
                  ) : (
                    <BsEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 mt-6 ${
                loading
                  ? "bg-sky-300 cursor-not-allowed"
                  : "bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-[0.98] shadow-md"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-sky-600 hover:text-sky-700 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Having trouble? Contact support or try demo mode
        </p>
      </div>
    </div>
  );
};

export default Login;
