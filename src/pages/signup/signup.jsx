import { useContext, useState } from "react";
import "./signup.css";
import { isValidate } from "../../valid.js/signupValid";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtToken } from "../../jwt/jwt";
import { Link } from "react-router-dom";
import SessionContext from "../../context/SessionContext";

import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import OtpModal from "../../components/modals/otpModal/OtpModal";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(SessionContext);
  const [Fullname, setFullName] = useState("");
  const [Username, setUsername] = useState("");
  const [EmailOrMobile, setEmailOrMobile] = useState("");
  const [error, setError] = useState("");
  const [Password, setPassword] = useState("");
  const [passErrors, setPassError] = useState("");

  function passwordValid(value) {
    const passwordRegex = /^(?!\s*$).+/;
    if (!passwordRegex.test(value)) {
      setPassError("Password is required.");
    } else {
      if (!/[A-Z]/.test(value)) {
        setPassError("Password must contain at least one uppercase letter.");
        return;
      }
      if (!/[a-z]/.test(value)) {
        setPassError("Password must contain at least one lowercase letter.");
        return;
      }
      if (!/\d/.test(value)) {
        setPassError("Password must contain at least one digit.");
        return;
      }
      if (!/[@$#!%*?&]/.test(value)) {
        setPassError(
          "Password must contain at least one special character (@$!%*?&).",
        );
        return;
      }
      if (value.length < 6) {
        setPassError("Password must contain at least 6 characters");
        return;
      }
    }
    setPassError("");
    return;
  }

  const handlePassword = async (value) => {
    setPassword(value);
    passwordValid(value);
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userData = { Fullname, Username, EmailOrMobile, Password };
  //     // const isValidate = await signupValid(userData)
  //     if (await isValidate({ ...userData, seter: setError })) {
  //       const response = await API.post("/user/signup", userData);
  //       localStorage.setItem(jwtToken, response.data.token);
  //       console.log("hiiiiiiiii");
  //       // UserLoggedIn(userData)
  //       login();
  //       navigate("/ProfileUpload");
  //
  //       // setFullName("");
  //       // setUsername("");
  //       // setEmailOrMobile("");
  //       // setPassword("");
  //       // setError("");
  //       // setPassError("");
  //     } else {
  //       console.log("didn't go through Axios");
  //     }
  //   } catch (error) {
  //     console.log("error during handleClick: ", error);
  //     setError("Something went wrong");
  //   }
  // };
  // ----------------------------------------

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const userData = { Fullname, Username, EmailOrMobile, Password };

      const isValid = await isValidate({ ...userData, seter: setError });
      if (!isValid) {
        console.log("Validatoin failed");
        return;
      }

      const response = await API.post("/user/signup", userData);

      localStorage.setItem(jwtToken, response.data.token);
      login();
      navigate("/ProfileUpload");
    } catch (error) {
      const backend = error.response?.data;
      if (backend?.errorCode === "DUPLICATE_EMAIL") {
        setError("This email is already exist.");
      }

      console.log("error during handleClick: ", error);
    }
  };

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

        {/*------------------- Signup form ----------------*/}
        <form className="space-y-4" onSubmit={handleClick}>
          {/* ------- Full name ------- */}
          <div className="relative flex items-center">
            <FaAddressCard className="absolute left-3 text-slate-300" />
            <input
              type="text"
              id="fullName"
              value={Fullname}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              name="Fullname"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          {/* -------User name ------- */}
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-slate-300" />
            <input
              type="text"
              id="username"
              value={Username}
              placeholder="Username"
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          {/* -------- Email or Mobile Number ---------- */}
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-slate-300" />
            <input
              type="text"
              id="emailOrMobile"
              placeholder="Email or Mobile Number"
              name="EmailOrMobile"
              value={EmailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          {/* -------- Password ---------- */}
          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-slate-300" />
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              name="Password"
              value={Password}
              onChange={(e) => handlePassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="button"
              className="absolute right-3 text-slate-300 opacity-80"
              aria-label="toggle password"
            >
              <FaEye />
            </button>
          </div>

          {passErrors ? (
            <p className="text-red-500 text-sm">{passErrors}</p>
          ) : null}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl text-white font-semibold text-sm
                       bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
                       hover:scale-[1.01] active:scale-95 transition-transform shadow-md"
          >
            Sign up
          </button>
          {error ? (
            <p className="text-red-500 text-sm mt-2">{`! ${error}`}</p>
          ) : null}
        </form>

        <div className="mt-6 text-center text-sm text-slate-300">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline font-semibold"
          >
            Log in
          </Link>
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
      {/* <div className="justify-center  items-center fixed w-full h-full flex z-50 top-0  left-0 custom-modal"> */}
      {/*   <OtpModal /> */}
      {/* </div> */}
    </div>
  );
}

export default Signup;
