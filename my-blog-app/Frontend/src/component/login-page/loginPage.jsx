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
      );
      console.log(res.data.user); //printing respone in console
      dispatch(login(res.data.user)); //
      navigate("/");
    } catch (error) {
      console.log("error fetching user", error);
      alert("username or password incorrect! Please try again.");
    }
  };

  return (
    <div className="flex py-10 items-center justify-center text-center w-full">
      <div className="shadow-xl w-full mx-auto border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5 ">
        <h1 className="text-xl font-bold pb-6 pt-3">LOGIN</h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-3/5"
          onSubmit={handleLogin}
        >
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <label htmlFor="UserName" className="font-semibold ">
            Username
          </label>
          <input
            id="username"
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="text"
            value={inputValue.username}
            onChange={(e) =>
              setInputValue({ ...inputValue, username: e.target.value })
            }
            onBlur={handleBlur}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="Password" className="font-semibold">
            Password
          </label>
          <input
            id="password"
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="password"
            name="confirm password"
            minLength={8}
            maxLength={14}
            autoComplete="current-password"
            value={inputValue.password}
            onChange={(e) =>
              setInputValue({ ...inputValue, password: e.target.value })
            }
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
