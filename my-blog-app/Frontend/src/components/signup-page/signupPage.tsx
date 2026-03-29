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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users`,
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
    } finally {
      setIsLoading(false);
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
    <div className="flex min-h-[85vh] items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 p-8 sm:p-10 text-left">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Join us to start sharing your stories.</p>
        </div>
        
        <form className="space-y-5" onSubmit={createUser}>
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullname"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              type="text"
              name="fullname"
              autoComplete="name"
              value={inputValue.fullname}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              required
            />
          </div>

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
              placeholder="johndoe123"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              type="email"
              name="email"
              autoComplete="email"
              value={inputValue.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
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
              autoComplete="new-password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              minLength={8}
              value={inputValue.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              title="Must match the password above"
              minLength={8}
              value={inputValue.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white rounded-xl py-3 px-4 mt-8 font-semibold hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : "Create Account"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export { SignUpPage };
