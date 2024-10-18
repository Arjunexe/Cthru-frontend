// import Button from "react-bootstrap/Button";
// import '../../bootstrap/bootstrap.min.css'
// import Form from "react-bootstrap/Form";
import "../signup/signup.css";
// import Container from "react-bootstrap/esm/Container";
import { useContext, useEffect, useState } from "react";
import { isValidate } from "../../valid.js/signupValid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtToken } from "../../jwt/jwt";
import UserSessionContext from "../../hooks/sessionProvider";

// import { UserLoggedIn } from "../../valid.js/userCheck";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(UserSessionContext)
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
          "Password must contain at least one special character (@$!%*?&)."
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
      if (await isValidate({ ...userData, seter: setError }))  {
        const response = await axios.post(
          "http://localhost:5000/user/signup",
          userData
        );
        localStorage.setItem(jwtToken, response.data.token);
        console.log("hiiiiiiiii");
        // UserLoggedIn(userData)
        navigate("/ProfileUpload");
        login()

        setFullName("");
        setUsername("");
        setEmailOrMobile("");
        setPassword("");
        setError("");
        setPassError("");
      } else {
        console.log("didn't go through Axios");
      }
    } catch (error) {
      console.log("error during handleClick: ", error);
    }
  };

  return (
    

// Ai

<div className="flex justify-center w-full ">
  <div className="container  mx-auto p-4 w-80">
    <p className="text-center">Sign up to see photos and videos from your friends.</p>
    <form className="mt-4">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
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
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
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
        <label htmlFor="emailOrMobile" className="block text-sm font-medium text-gray-600">
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
        <p className="text-xs text-gray-500 mt-1">
          We'll never share your email or mobile number with anyone else.
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
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

      {passErrors ? <p className="text-red-500 text-sm">{passErrors}</p> : null}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        type="button"
        onClick={handleClick}
      >
        Sign Up
      </button>

      {error ? <p className="text-red-500 text-sm mt-2">{`! ${error}`}</p> : null}
    </form>
  </div>
</div>


  );
}

export default Signup;
