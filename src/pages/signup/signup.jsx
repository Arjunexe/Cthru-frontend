// import Button from "react-bootstrap/Button";
// import '../../bootstrap/bootstrap.min.css'
// import Form from "react-bootstrap/Form";
import "../signup/signup.css";
// import Container from "react-bootstrap/esm/Container";
import { useContext, useEffect, useState } from "react";
import { isValidate } from "../../valid.js/signupValid";
// import axios from "axios";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtToken } from "../../jwt/jwt";
import { Link } from "react-router-dom";
import SessionContext from "../../context/SessionContext";

// import { UserLoggedIn } from "../../valid.js/userCheck";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(SessionContext);
  const [Fullname, setFullName] = useState("");
  const [Username, setUsername] = useState("");
  const [EmailOrMobile, setEmailOrMobile] = useState("");
  const [error, setError] = useState("");
  const [Password, setPassword] = useState("");
  const [passErrors, setPassError] = useState("");

  // const storedToken = localStorage.getItem("jwtToken");
  // useEffect(() => {
  //   if (storedToken) {
  //     navigate("/");
  //   }
  // },[navigate, storedToken]);

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

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const userData = { Fullname, Username, EmailOrMobile, Password };
      // const isValidate = await signupValid(userData)
      if (await isValidate({ ...userData, seter: setError })) {
        const response = await API.post("/user/signup", userData);
        localStorage.setItem(jwtToken, response.data.token);
        console.log("hiiiiiiiii");
        // UserLoggedIn(userData)
        login();
        navigate("/ProfileUpload");

        // setFullName("");
        // setUsername("");
        // setEmailOrMobile("");
        // setPassword("");
        // setError("");
        // setPassError("");
      } else {
        console.log("didn't go through Axios");
      }
    } catch (error) {
      console.log("error during handleClick: ", error);
    }
  };

  return (
    // Ai

    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-slate-950
      to-slate-950"
    >
      <h1 className=" -mt-14 text-center w-full text-5xl  text-white tracking-widest">
        Cthru
      </h1>
      <div
        className="mt-12 bg-gradient-to-b from-slate-800
      to-slate-950 backdrop-blur-xl border-2 w-80 border-gray-500 rounded-2xl p-8"
      >
        {/* <p className="text-center"> */}
        {/*   Sign up to see photos and videos from your friends. */}
        {/* </p> */}
        <form className="">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-bold  text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="Fullname"
              value={Fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-bold text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter a username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-bold text-white"
            >
              Email or Mobile Number
            </label>
            <input
              type="text"
              id="emailOrMobile"
              name="EmailOrMobile"
              value={EmailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email or mobile number"
            />
            <p className="text-xs text-white mt-1">
              We'll never share your email or mobile number with anyone else.
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="Password"
              value={Password}
              onChange={(e) => handlePassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Password"
            />
          </div>

          {passErrors ? (
            <p className="text-red-500 text-sm">{passErrors}</p>
          ) : null}

          <button
            className="bg-cyan-500/80 hover:bg-cyan-400 text-white mt-4  w-full font-semibold py-2 rounded transition duration-300"
            type="button"
            onClick={handleClick}
          >
            Sign Up
          </button>
          <p className="mt-4 text-sm">
            <span className="text-white">Have an account?</span>
            <br />
            <Link
              to="/login"
              className="text-cyan-600 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>

          {error ? (
            <p className="text-red-500 text-sm mt-2">{`! ${error}`}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Signup;
