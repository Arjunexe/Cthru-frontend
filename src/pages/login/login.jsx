import "../login/login.css";
import { useContext, useEffect, useState } from "react";
import API from "../../api/axios";
import { isitEmpty } from "../../valid.js/signupValid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtToken } from "../../jwt/jwt";
import SessionContext from "../../context/SessionContext";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaGithub, FaTwitter } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login, setIsLoggedIn } = useContext(SessionContext);
  const [emailOrmobile, seTEmailPassword] = useState("");
  const [password, seTPassword] = useState("");
  const [errors, setError] = useState("");

  async function handleClick(e) {
    try {
      e.preventDefault();
      const userData = { emailOrmobile, password };
      if (isitEmpty({ ...userData, setError })) {
        const response = await API.post("/user/login", userData);
        localStorage.setItem(jwtToken, response.data.token);

        // setIsLoggedIn(true)
        login();
        navigate("/");
      } else {
        console.log("login- didn't go through");
      }
    } catch (error) {
      console.log("error during login handleclick: ", error);
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#071126] to-[#0b1320] opacity-90" />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'><filter id=\\'n\\'><feTurbulence baseFrequency=\\'0.9\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/><feColorMatrix type=\\'saturate\\' values=\\'0\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.6\\'/></svg>')",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />
      <div className="absolute -left-32 -top-24 w-96 h-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-pink-500 via-violet-500 to-indigo-500" />
      <div className="absolute -right-32 -bottom-24 w-80 h-80 rounded-full blur-2xl opacity-25 bg-gradient-to-tr from-cyan-400 via-sky-500 to-emerald-400" />

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

        {/*------------------- login form ----------------*/}
        <form className="space-y-4">
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-slate-300" />
            <input
              type="text"
              placeholder="you@example.com"
              value={emailOrmobile}
              onChange={(e) => seTEmailPassword(e.target.value)}
              name="emailOrmobile"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-slate-300" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => seTPassword(e.target.value)}
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

          {/* <div className="flex items-center justify-between text-sm text-slate-300"> */}
          {/*   <label className="inline-flex items-center gap-2"> */}
          {/*     <input type="checkbox" className="rounded-sm" /> */}
          {/*     <span> Remember me</span> */}
          {/*   </label> */}
          {/*   <a href="#" className="hover:underline"> */}
          {/*     Forgot? */}
          {/*   </a> */}
          {/* </div> */}

          <button
            type="submit"
            onClick={handleClick}
            className="w-full mt-2 py-3 rounded-xl text-white font-semibold text-sm
                       bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
                       hover:scale-[1.01] active:scale-95 transition-transform shadow-md"
          >
            Login
          </button>
          {errors && (
            <p className="text-red-500 text-sm  italic mt-2">{`! ${errors} `}</p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-4 text-xs text-slate-400/70 text-center">
          By continuing you agree to Cthru's Terms.
        </div>
      </motion.div>

      {/*--------------- card -------------*/}
      {/* <form className=""> */}
      {/*   <div className="w-80  backdrop-blur-xl border-2  mt-52 bg-gradient-to-b from-slate-950/10 to-slate-800/15 border-white/30 shadow-lg rounded-2xl p-8"> */}
      {/*     <div className="mb-4"> */}
      {/*       <label className="block text-sm font-bold text-white mb-2"> */}
      {/*         Email or Mobile Number */}
      {/*       </label> */}
      {/*       <input */}
      {/*         className="w-full py-2 px-3 border border-gray-300 rounded" */}
      {/*         type="text" */}
      {/*         name="emailOrmobile" */}
      {/*         value={emailOrmobile} */}
      {/*         onChange={(e) => seTEmailPassword(e.target.value)} */}
      {/*         placeholder="Email or Mobile number" */}
      {/*       /> */}
      {/*       <p className="text-white text-xs italic mt-2"> */}
      {/*         We'll never share your email or mobile number with anyone else. */}
      {/*       </p> */}
      {/*     </div> */}
      {/**/}
      {/*     <div className="mb-4"> */}
      {/*       <label className="block text-sm font-bold text-white  mb-2"> */}
      {/*         Password */}
      {/*       </label> */}
      {/*       <input */}
      {/*         className="w-full py-2 px-3 border rounded morph-shadow" */}
      {/*         type="password" */}
      {/*         name="password" */}
      {/*         value={password} */}
      {/*         onChange={(e) => seTPassword(e.target.value)} */}
      {/*         placeholder="Password" */}
      {/*       /> */}
      {/*     </div> */}
      {/**/}
      {/*     <button */}
      {/*       className="w-full mt-4 bg-cyan-500/80 hover:bg-cyan-400 text-white font-semibold py-2 rounded transition duration-300" */}
      {/*       type="submit" */}
      {/*       onClick={handleClick} */}
      {/*     > */}
      {/*       Login */}
      {/*     </button> */}
      {/**/}
      {/*     <p className="mt-4 text-sm"> */}
      {/*       <span className="text-white">Don't have an account?</span> */}
      {/*       <br /> */}
      {/**/}
      {/*       <Link */}
      {/*         to="/signup" */}
      {/*         className="text-cyan-600 hover:underline font-semibold" */}
      {/*       > */}
      {/*         Signup */}
      {/*       </Link> */}
      {/*     </p> */}
      {/**/}
      {/*     {errors && ( */}
      {/*       <p className="text-red-500 text-xs italic mt-4">{`! ${errors} `}</p> */}
      {/*     )} */}
      {/*   </div> */}
      {/* </form> */}

      <style>{`
        :root { color-scheme: dark; }
        input::placeholder{ color: rgba(203,213,225,0.45); }
        button:focus, input:focus { outline: 2px solid transparent; }
      `}</style>
    </div>
  );
}

export default Login;
