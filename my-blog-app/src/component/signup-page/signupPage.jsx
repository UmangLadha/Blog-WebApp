import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router";

const SignUpPage = () => {
  const [inputValue, setInputValue] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleBlur = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputValue.username || !inputValue.password || !inputValue.email) {
        setErrorMsg("Input fields cannot be blank!");
      } else if (inputValue.password !== inputValue.confirmPassword) {
        setErrorMsg("Passwords do not match!");
      } else {
        setErrorMsg("");
      }
    },
    [inputValue]
  );

  const handleSignup = (e) => {
    e.preventDefault();
	// const prevUserData = localStorage.setItem('userData', JSON.stringify(inputValue)) || {};
	// const currentUserData = {
	// 	...prevUserData,
	// 	...inputValue
	// };
    localStorage.setItem(inputValue.username,JSON.stringify(inputValue));
    setInputValue({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
	// e.target.reset();
    alert("You are successfully register!");
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center text-center w-full">
      <div className="shadow-xl w-full mx-auto border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5 ">
        <h1 className="text-xl font-bold pb-6 pt-3">SIGNUP</h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-4/5 md:w-3/4"
          onSubmit={handleSignup}
        >
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <label htmlFor="Fullname" className="font-semibold ">
            Fullname
          </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="text"
            name="fullname"
            autoComplete="current-name"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, fullname: e.target.value })
            }
            onBlur={handleBlur}
            placeholder="Enter your fullname"
            required
          />

          <label htmlFor="Username" className="font-semibold ">
            Username
          </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="text"
            name="username"
            autoComplete="username"
            value={inputValue.username}
            onChange={(e) =>
              setInputValue({ ...inputValue, username: e.target.value })
            }
            onBlur={handleBlur}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="Email" className="font-semibold ">
            Email
          </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="email"
            name="email"
            autoComplete="email"
            value={inputValue.email}
            onChange={(e) =>
              setInputValue({ ...inputValue, email: e.target.value })
            }
            onBlur={handleBlur}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="Password" className="font-semibold">
            Password
          </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            minLength={8}
            maxLength={14}
            value={inputValue.password}
            onChange={(e) =>
              setInputValue({ ...inputValue, password: e.target.value })
            }
            onBlur={handleBlur}
            placeholder="Enter your password"
            required
          />

          <label htmlFor="Password" className="font-semibold">
            Confirm Password
          </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="password"
            name="confirmPassword"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            minLength={8}
            maxLength={14}
            value={inputValue.confirmPassword}
            onChange={(e) =>
              setInputValue({ ...inputValue, confirmPassword: e.target.value })
            }
            onBlur={handleBlur}
            placeholder="Enter your confirm password"
            required
          />

          <button
            type="submit"
            value="sign in"
            className="bg-purple-600 mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 "
          >
            Sign up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline text-purple-600">
            Login
          </Link>
        </p>
        <span className="my-3">OR</span>
        <div>google signin options</div>
      </div>
    </div>
  );
};

export { SignUpPage };
