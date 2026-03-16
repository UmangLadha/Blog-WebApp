import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserDetails } from "../../common/types/types";
import { useState, useCallback } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<UserDetails>({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  // const [isFormValid, setIsFormValid] = useState<boolen>(true);

  // checking form input valid or not function
  const checkFormValidation = useCallback(() => {
    if (
      !inputValue.fullname ||
      !inputValue.username ||
      !inputValue.password ||
      !inputValue.confirmPassword ||
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
  const handleBlur = () => {
    checkFormValidation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //sending userdata to server
  const sendingDataToServer = async (userdata: UserDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        userdata
      );
      toast.success(response.data.message || "Signup successfull!");
      setInputValue({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error in sending userdata: ", error);
        toast.error(
          error.response?.data?.message || "User Registration failed"
        );
      }
    }
  };

  //form submiting function
  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid: boolean = checkFormValidation();
    if (!isFormValid) return;

    const userData = {
      username: inputValue.username,
      fullname: inputValue.fullname,
      email: inputValue.email,
      password: inputValue.password,
    };

    sendingDataToServer(userData); //calling the function to submit the data
  };

  return (
    <div className="flex py-8 items-center justify-center text-center w-full bg-gray-100">
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
            htmlFor="fullname"
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
            htmlFor="username"
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

          <label htmlFor="email" className="font-semibold mb-1 text-gray-600">
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

          <label htmlFor="password" className="font-semibold">
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

          <label htmlFor="confirmPassword" className="font-semibold">
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
            // disabled={isFormValid}
            className={`bg-purple-600 mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold disabled:bg-purple-300`}
          >
            Sign up
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-600">
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
