import { useAppDispatch } from "../../redux/app/hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/auth/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";

interface  Userdetails{
  username:string,
  password:string,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<Userdetails>({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  // const [loginBtn, setLoginBtn] = useState<boolen>(false);
  

  const handleBlur = (e:React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!inputValue.username || !inputValue.password) {
      setErrorMsg("Username or Password fields cannot be blank!");
    } else {
      setErrorMsg("");
      // setLoginBtn(!loginBtn);
    }
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function authenticatingUser(userCredential: {
    username: string;
    password: string;
  }) {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userCredential
      );
      localStorage.setItem("authenticated", response.data.authenticated);
      dispatch(login(response.data.user)); //
      toast.success("Login successfully!");
      setInputValue({username:"",password:""});
      navigate("/");
    } catch (error) {
      console.log("login error", error);
      toast.error("username or password incorrect. Try again!");
    }
  }

  const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userCredential = {
      username: inputValue.username,
      password: inputValue.password,
    };

    authenticatingUser(userCredential);
  };

  return (
    <div className="flex py-8 items-center justify-center text-center w-full">
      <div className="shadow-xl bg-white w-full mx-4 border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3">
        <h1 className="text-2xl font-bold pb-6 pt-3 text-gray-700">Login</h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-3/5"
          onSubmit={handleLogin}
        >
          {errorMsg && (
            <p className="text-red-600 text-sm mb-3 w-full text-left">
              {errorMsg}
            </p>
          )}

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
            // disabled={loginBtn}
            className={`bg-purple-600 mt-4 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-300`}
          >
            Login
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-600">
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
