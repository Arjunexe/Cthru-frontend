// import Form from "react-bootstrap/Form";
import "../login/login.css";
// import Container from "react-bootstrap/esm/Container";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
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

  async function handleClick(e) {
    try {
      console.log("Backend API:", process.env.REACT_APP_BACKEND_API);
      e.preventDefault();
      const userData = { emailOrmobile, password };
      if (isitEmpty({ ...userData, setError })) {
        const response = await axios.post("/user/login", userData);
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
    // <div className=" flex justify-center text-red-700 ">
    //   <form >
    //     <div className=" border border-red-600  items-center">
    //       <div className="">
    //         <label>Email or Mobile Number</label>
    //         <input className="bg-gray-50 border border-gray-300 "
    //           type="text"
    //           name="emailOrmobile"
    //           value={emailOrmobile}
    //           onChange={(e) => {
    //             seTEmailPassword(e.target.value);
    //           }}
    //           placeholder="Enter your email or mobile number"
    //         />
    //         <p className="">
    //           We'll never share your email with anyone else.
    //         </p>
    //       </div>

    //       <div className="">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           name="Password"
    //           value={password}
    //           onChange={(e) => {
    //             seTPassword(e.target.value);
    //           }}
    //           placeholder="Password"
    //         />
    //       </div>

    //       {/* <div className="mb-3" controlId="formBasicCheckbox">
    //         <Form.Check type="checkbox" label="Check me out" />
    //       </div> */}
    //       <button variant="primary" type="submit" onClick={handleClick}>
    //         Submit
    //       </button>
    //       <h4>
    //         <Link to="/signup">Signup</Link>
    //       </h4>

    //       {errors ? <p className="errors">{`! ${errors} `}</p> : null}
    //     </div>
    //   </form>
    // </div>

    <div className="flex justify-center w-full   mt-9">
      <form className="">
        <div className="bg-slate-800 border border-gray-400 rounded-md p-8">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-500 mb-2">
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
            <p className="text-gray-500 text-xs italic mt-2">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-500 mb-2">
              Password
            </label>
            <input
              className="w-full py-2 px-3 border morph-shadow"
              type="password"
              name="password"
              value={password}
              onChange={(e) => seTPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            className="bg-morph-gray hover:bg-gray-600 text-gray-600 font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleClick}
          >
            Submit
          </button>

          <h4 className="mt-4 text-sm">
            <Link to="/signup" className="text-gray-700 hover:underline">
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
