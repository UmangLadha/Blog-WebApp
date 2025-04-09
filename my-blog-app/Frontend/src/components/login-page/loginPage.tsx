import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { login } from "../../redux/features/auth/authSlice";
import axios from "axios";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBlur = (e) => {
    e.preventDefault();
    if (!inputValue.username || !inputValue.password) {
      setErrorMsg("Username or Password fields cannot be blank!");
    } else {
      setErrorMsg("");
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInputValue((prev)=>({
      ...prev,
      [name]:value,
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userInsertedValue = {
        username: inputValue.username,
        password: inputValue.password,
      };
      const res = await axios.post(
        "http://localhost:5000/login",
        userInsertedValue
      ); // checking the username and password weather user exit or not
      console.log("User has been authenticated succesfully", res.data.user); //printing response in console
	  localStorage.setItem("authenticated", res.data.authenticated);
      dispatch(login(res.data.user)); //
      navigate("/");

    } catch (error) {
      console.log("error fetching user", error);
      alert("username or password incorrect! Please try again.");
    }
  };

//   console.log("Data store in this dataype", typeof Boolean(localStorage.getItem("authenticated")));

  return (
    <div className="flex py-8 items-center justify-center text-center w-full min-h-screen bg-gray-100">
      <div className="shadow-xl bg-white w-full mx-4 border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3">
        <h1 className="text-2xl font-bold pb-6 pt-3 text-gray-700">Login</h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-3/5"
          onSubmit={handleLogin}
        >
          {errorMsg && <p className="text-red-600 text-sm mb-3 w-full text-left">{errorMsg}</p>}

          <label htmlFor="userName" className="font-semibold ">
            Username
          </label>
          <input
            id="username"
            className="border outline-none py-2 px-4 rounded-lg w-full mb-4 focus:ring-2 focus:ring-purple-300"
            type="text"
            name="username"
            autoComplete="username"
            value={inputValue.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="Password" className="font-semibold">
            Password
          </label>
          <input
          id="password"
            className="border outline-none py-2 px-4 rounded-lg w-full mb-4 focus:ring-2 focus:ring-purple-300"
            type="password"
            name="password"
            autoComplete="new-password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            minLength={8}
            value={inputValue.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 transition-colors "
          >
            Login
          </button>
        </form>
        <p>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="underline text-purple-600 hover:text-purple-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export { LoginPage };
