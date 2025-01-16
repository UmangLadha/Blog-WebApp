import React, { useCallback, useState } from "react";
import { Link } from "react-router";

const LoginPage = () => {
	const [inputValue, setInputValue] = useState({
		username: '',
		password: ''
	});
	const [errorMsg, setErrorMsg] = useState('');

	const handleBlur = useCallback((e)=>{
		e.preventDefault();
		if (!inputValue.username || !inputValue.password) {
			setErrorMsg('Username or Password fields cannot be blank!');
		  } else {
			setErrorMsg('');
		  }
	},[inputValue]);

	const handleSubmit = (e)=>{
		e.preventDefault();
		console.log('form submitted');
	}

  return (
    <div className="flex h-screen items-center justify-center text-center w-full">
      <div className="shadow-xl w-full mx-auto border rounded-lg p-8 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/4 ">
        <h1 className="text-xl font-bold pb-6 pt-3">LOGIN</h1>
        <form
          className="flex flex-col justify-between mx-auto items-start w-3/5"	
		  onSubmit={handleSubmit}
        >
			{errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <label htmlFor="UserName" className="font-semibold ">
            Username
          </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="text"
			value={inputValue.username}
			onChange={(e)=>setInputValue({...inputValue, username:e.target.value})}
			onBlur={handleBlur}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="Password" className="font-semibold">
			Password
		  </label>
          <input
            className="border outline-none py-2 px-4 rounded-lg w-full"
            type="password"
			name="confirm password"
			minLength={8}
			maxLength={14}
			autoComplete="current-password"
			value={inputValue.password}
			onChange={(e)=>setInputValue({...inputValue, password:e.target.value})}
			onBlur={handleBlur}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 mt-5 text-white py-2 px-4 mb-3 w-full rounded-xl font-semibold hover:bg-purple-700 "
          >
            Login
          </button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/signup" className="underline text-purple-600">Sign up</Link>
        </p>
        <span className="my-3">OR</span>
        <div>google login options</div>
      </div>
    </div>
  );
};

export { LoginPage };
