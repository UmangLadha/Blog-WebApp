import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Input from "../../common/formHandler/inputHandle";
import toast from "react-hot-toast";
import { UserDetails } from "../../common/types/types";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UserDetails>();

  const formData = watch();
  const matchPassword = watch("password");
  const navigate = useNavigate();

  //sending userdata to server
  const sendingDataToServer = async (data: UserDetails) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:5000/users", data);
      console.log("here is the response from backend:", response);
      toast.success("Signup successfull!");
      reset();
      navigate("/login");
    } catch (error) {
      console.log("error in sending userdata: ", error);
      toast.error("User Registration failed");
    }
  };

  //form submiting function
  const createUser = (data: UserDetails) => {
    sendingDataToServer(data); //calling the function to submit the data
  };

  return (
    <div className="flex py-8 items-center justify-center text-center w-full bg-gray-100">
      <div className="shadow-xl bg-white w-full mx-4 border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3">
        <h1 className="text-2xl font-bold pb-6 pt-3 text-gray-700">
          Create Account
        </h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-full md:w-4/5"
          onSubmit={handleSubmit(createUser)}
        >
          <Input<UserDetails>
            label="Full name"
            inputType="text"
            name="fullname"
            register={register}
            minLength={5}
            error={errors.fullname}
            errorMsg="Fullname is required"
            inputPlaceholder="Enter your Fullname"
            required={true}
          />
          <Input<UserDetails>
            label="Username"
            inputType="text"
            name="username"
            register={register} 
            minLength={5}
            error={errors.username}
            errorMsg="Username is required"
            inputPlaceholder="Enter your username"
            required={true}
          />
          <Input<UserDetails>
            label="Email"
            inputType="text"
            name="email"
            register={register}
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            }}
            error={errors.email}
            errorMsg="Email is required"
            inputPlaceholder="Enter your Email"
            required={true}
          />
          <Input<UserDetails>
            label="Password"
            inputType="password"
            name="password"
            register={register}
            pattern={{
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
              message:
                "Password must contain uppercase, lowercase, digit and 8+ characters",
            }}
            error={errors.password}
            errorMsg="Password must include a capital, number, and be at least 8 chars"
            minLength={8}
            inputPlaceholder="Enter your password"
            required={true}
          />
          <Input<UserDetails>
            label="Confirm Password"
            inputType="password"
            name="confirmPassword"
            register={register}
            matchWith={matchPassword}
            error={errors.password}
            errorMsg="Password does not match!"
            minLength={8}
            inputPlaceholder="Enter your password"
            required={true}
          />
          <button
            type="submit"
            disabled={
              !formData.fullname ||
              !formData.username ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
            className="bg-purple-600 mt-4 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-300 "
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
