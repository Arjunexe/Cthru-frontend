// import Form from "react-bootstrap/Form";
import "../login/login.css";
// import Container from "react-bootstrap/esm/Container";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import API from "../../api/axios";
import { isitEmpty } from "../../valid.js/signupValid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtToken } from "../../jwt/jwt";
// import UserSessionContext from "../../context/sessionProvider";
// import MainContext from "../../context/context";
import SessionContext from "../../context/SessionContext";

function Login() {
  const navigate = useNavigate();
  const { login, setIsLoggedIn } = useContext(SessionContext);
  const [emailOrmobile, seTEmailPassword] = useState("");
  const [password, seTPassword] = useState("");
  const [errors, setError] = useState("");

  // const storedToken = localStorage.getItem("jwtToken");
  // useEffect(() => {
  //   if (storedToken) {
  //     navigate("/");
  //   }
  // },[navigate, storedToken]);

  // console.log("Backend API:", process.env.REACT_APP_BACKEND_API);
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
    <div
      className="flex justify-center w-full h-screen bg-gradient-to-b from-slate-950
      to-slate-950 "
    >
      <h1 className="absolute mt-28 text-center w-full text-5xl  text-white tracking-widest">
        Cthru
      </h1>
      <form className="">
        {/* bg-slate-400/20 */}
        <div
          className=" bg-gradient-to-b from-slate-800
      to-slate-950 backdrop-blur-xl border-2 mt-52 border-gray-500 rounded-2xl p-8"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold text-white mb-2">
              Email or Mobile Number
            </label>
            <input
              className="w-full py-2 px-3 border border-gray-300 rounded"
              type="text"
              name="emailOrmobile"
              value={emailOrmobile}
              onChange={(e) => seTEmailPassword(e.target.value)}
              placeholder="Email or Mobile number"
            />
            <p className="text-white text-xs italic mt-2">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-white  mb-2">
              Password
            </label>
            <input
              className="w-full py-2 px-3 border rounded morph-shadow"
              type="password"
              name="password"
              value={password}
              onChange={(e) => seTPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            // className="bg-morph-gray hover:bg-gray-600 text-gray-600 font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            className="w-full mt-4 bg-cyan-500/80 hover:bg-cyan-400 text-white font-semibold py-2 rounded-full transition duration-300"
            type="submit"
            onClick={handleClick}
          >
            Login
          </button>

          <h4 className="mt-4 text-sm">
            <Link to="/signup" className="text-white hover:underline">
              Signup
            </Link>
          </h4>

          {errors && (
            <p className="text-red-500 text-xs italic mt-4">{`! ${errors} `}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
