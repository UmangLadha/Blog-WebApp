import axios from "axios";
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

  // callback function to check validation
  const handleBlur = useCallback(
    (e) => {
      e.preventDefault();
      checkFormValidation();
    },
    [inputValue]
  );

  // checking form input valid or not function
  const checkFormValidation = () => {
    if (!inputValue.username || !inputValue.password || !inputValue.email) {
      setErrorMsg("Input fields cannot be blank!");
      return false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  //sending userdata to server
  const sendDataToServer = async () => {
	  try {
    const userData = {
      fullname: inputValue.fullname,
      username: inputValue.username,
      email: inputValue.email,
      password: inputValue.password,
    };
      const response = await axios.post(
        "http://localhost:5000/users",
        userData
      );
      console.log("this is the user",response);
	  alert(response.data.message);
	  navigate("/login");
    } catch (error) {
		if(error.response && error.response.data){ // checking that of there is error or not
			console.log("error in sending userdata: ", error);
			setErrorMsg(error.response.data.message);
		}
    }
  };

  //form submiting function
  const handleSignup = (e) => {
    e.preventDefault();
    let isFormValid = checkFormValidation();
    if (!isFormValid) return;

    sendDataToServer(); //calling the function to submit the data
    setInputValue({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex py-8 items-center justify-center text-center w-full">
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
            className="bg-purple-600 mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 "
          >
            Sign up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline text-purple-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export { SignUpPage };
