import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const LoginAndRegister = () => {
  const { handlelogin, handleregister, loading, user } = useAuth();

  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      await handlelogin(formData.email, formData.password);
      navigate("/");
    }

    if (mode === "register") {
      await handleregister(formData.name, formData.email, formData.confirm);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 font-mono relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500 opacity-10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs tracking-[0.3em] uppercase">
              System Access
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            {mode === "login"
              ? "Enter credentials to continue"
              : "Register to get started"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Tab Toggle */}
          <div className="flex bg-zinc-800 rounded-xl p-1 mb-8">
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                  mode === tab
                    ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field — register only */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                mode === "register"
                  ? "max-h-24 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-400 transition-colors text-xs"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Confirm Password — register only */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                mode === "register"
                  ? "max-h-24 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>

            {/* Forgot password */}
            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-widest uppercase shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              {mode === "login" ? "Sign In →" : "Create Account →"}
            </button>
          </form>
        </div>

        {/* Footer switch */}
        <p className="text-center text-zinc-600 text-sm mt-6">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            {mode === "login" ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginAndRegister;
