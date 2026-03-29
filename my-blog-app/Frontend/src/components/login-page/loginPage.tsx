import { useAppDispatch } from "../../redux/app/hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/auth/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";

interface Userdetails {
  username: string,
  password: string,
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


  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!inputValue.username || !inputValue.password) {
      setErrorMsg("Username or Password fields cannot be blank!");
    } else {
      setErrorMsg("");
      // setLoginBtn(!loginBtn);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        userCredential
      );
      localStorage.setItem("authenticated", response.data.authenticated);
      dispatch(login(response.data.user)); //
      toast.success("Login successfully!");
      setInputValue({ username: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log("login error", error);
      toast.error("username or password incorrect. Try again!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userCredential = {
      username: inputValue.username,
      password: inputValue.password,
    };

    authenticatingUser(userCredential);
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              type="text"
              name="username"
              autoComplete="username"
              value={inputValue.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              type="password"
              name="password"
              autoComplete="current-password"
              value={inputValue.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white rounded-xl py-3 px-4 font-semibold hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export { LoginPage };
