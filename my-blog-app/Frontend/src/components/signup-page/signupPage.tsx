import axios from "axios";
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // checking form input valid or not function
  const checkFormValidation = useCallback(() => {
    if (
      !inputValue.fullname ||
      !inputValue.username ||
      !inputValue.password ||
      !inputValue.email
    ) {
      setErrorMsg("Input fields cannot be blank!");
      return false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  }, [inputValue]);

  // callback function to check validation
  const handleBlur = useCallback(() => {
    checkFormValidation();
  }, [checkFormValidation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //sending userdata to server
  const sendingDataToServer = async () => {
    try {
      const userData = {
        userName: inputValue.username,
        userFullname: inputValue.fullname,
        userEmail: inputValue.email,
        userPassword: inputValue.password,
      };
      const response = await axios.post(
        "http://localhost:5000/users",
        userData
      );
      console.log("here is the response from backend:", response);
      alert(response.data.message || "Signup successfull!");
      setInputValue({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        // checking that of there is error or not
        console.log("error in sending userdata: ", error);
        setErrorMsg(error.response.data.message);
      }
    }
  };

  //form submiting function
  const createUser = (e) => {
    e.preventDefault();
    let isFormValid = checkFormValidation();
    if (!isFormValid) return;

    sendingDataToServer(); //calling the function to submit the data
  };

  return (
    <div className="flex py-8 items-center justify-center text-center w-full min-h-screen bg-gray-100">
      <div className="shadow-xl bg-white w-full mx-4 border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3">
        <h1 className="text-2xl font-bold pb-6 pt-3 text-gray-700">
          Create Account
        </h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-full md:w-4/5"
          onSubmit={createUser}
        >
          {errorMsg && (
            <p className="text-red-600 text-sm mb-3 w-full text-left">
              {errorMsg}
            </p>
          )}

          <label
            htmlFor="Fullname"
            className="font-semibold mb-1 text-gray-600"
          >
            Fullname
          </label>
          <input
            id="fullname"
            className="border outline-none py-2 px-4 rounded-lg w-full mb-4 focus:ring-2 focus:ring-purple-300"
            type="text"
            name="fullname"
            autoComplete="name"
            value={inputValue.fullname}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            required
          />

          <label
            htmlFor="Username"
            className="font-semibold mb-1 text-gray-600"
          >
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

          <label htmlFor="Email" className="font-semibold mb-1 text-gray-600">
            Email
          </label>
          <input
            id="email"
            className="border outline-none py-2 px-4 rounded-lg w-full mb-4 focus:ring-2 focus:ring-purple-300"
            type="email"
            name="email"
            autoComplete="email"
            value={inputValue.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
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

          <label htmlFor="Password" className="font-semibold">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className="border outline-none py-2 px-4 rounded-lg w-full mb-4 focus:ring-2 focus:ring-purple-300"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            title="Must match the password above"
            minLength={8}
            value={inputValue.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Confirm your password"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 "
          >
            Sign up
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-purple-600 hover:text-purple-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export { SignUpPage };
