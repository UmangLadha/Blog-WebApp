import { useAppDispatch } from "../../redux/app/hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/auth/authSlice";
import axios from "axios";
import Input from "../../common/formHandler/inputHandle";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserDetails } from "../../common/types/types";

const LoginPage = () => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<UserDetails>(); // giving typescript

  const userText = watch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function authenticatingUser(user: UserDetails) {
    try {
      const response = await axios.post("http://localhost:5000/login", user);
      // console.log("User has been authenticated succesfully", res.data.user); //printing response in console
      localStorage.setItem("authenticated", response.data.authenticated);
      dispatch(login(response.data.user)); //
      reset();
      toast.success("Login successfully!");
      navigate("/");
    } catch (error) {
      console.log("login error", error);
      toast.error("username or password incorrect. Try again!");
    }
  }

  const handleLogin = (data: UserDetails) => {
    authenticatingUser(data);
  };

  //   console.log("Data store in this dataype", typeof Boolean(localStorage.getItem("authenticated")));

  return (
    <div className="flex py-8 items-center justify-center text-center w-full">
      <div className="shadow-xl bg-white w-full mx-4 border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/3">
        <h1 className="text-2xl font-bold pb-6 pt-3 text-gray-700">Login</h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-3/5"
          onSubmit={handleSubmit(handleLogin)}
        >
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

          <button
            type="submit"
            disabled={!userText.username || !userText.password}
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
