import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaGithub, FaTwitter } from "react-icons/fa";

// CthruLogin.jsx
// React + Tailwind + Framer Motion version (JavaScript)
// Uses react-icons instead of lucide-react to prevent CDN build issues

export default function CthruLogin() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background gradient + subtle radial color pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#071126] to-[#0b1320] opacity-90" />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'><filter id=\\'n\\'><feTurbulence baseFrequency=\\'0.9\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/><feColorMatrix type=\\'saturate\\' values=\\'0\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.6\\'/></svg>')",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* Color blobs */}
      <div className="absolute -left-32 -top-24 w-96 h-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-pink-500 via-violet-500 to-indigo-500" />
      <div className="absolute -right-32 -bottom-24 w-80 h-80 rounded-full blur-2xl opacity-25 bg-gradient-to-tr from-cyan-400 via-sky-500 to-emerald-400" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl
                   bg-white/10 border border-white/10 backdrop-blur-2xl shadow-xl
                   ring-1 ring-white/10"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
              C
            </span>
          </div>
          <div>
            <h1 className="text-white text-2xl font-semibold tracking-widest">
              Cthru
            </h1>
            <p className="text-sm text-slate-300/80">
              See-through social — share small, shine big.
            </p>
          </div>
        </div>

        {/* Login form */}
        <form className="space-y-4">
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-slate-300" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-slate-300" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-slate-300 opacity-80"
              aria-label="toggle password"
            >
              <FaEye />
            </button>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="rounded-sm" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot?
            </a>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl text-white font-semibold text-sm
                       bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
                       hover:scale-[1.01] active:scale-95 transition-transform shadow-md"
          >
            Sign in
          </button>
        </form>

        <div className="mt-5 text-center text-slate-300">or continue with</div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 border border-white/10 text-white">
            <FaGithub />
            <span className="text-sm">GitHub</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 border border-white/10 text-white">
            <FaTwitter />
            <span className="text-sm">Twitter</span>
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-300">
          Don't have an account?{" "}
          <a href="/" className="text-white font-medium hover:underline">
            Sign up
          </a>
        </div>

        <div className="mt-4 text-xs text-slate-400/70 text-center">
          By continuing you agree to Cthru's Terms.
        </div>
      </motion.div>

      <style>{`
        :root { color-scheme: dark; }
        input::placeholder{ color: rgba(203,213,225,0.45); }
        button:focus, input:focus { outline: 2px solid transparent; }
      `}</style>
    </div>
  );
}
