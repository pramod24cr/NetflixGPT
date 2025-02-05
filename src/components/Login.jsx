import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  return (
    <div className="relative min-h-screen">
      <Header />
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_medium.jpg"
          alt="Netflix Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black/80 text-white rounded-lg my-24 mx-auto right-0 left-0"
      >
        <h1 className="font-bold text-3xl py-4 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Input Fields */}
        <div className="flex flex-col">
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              className="p-4 my-2 w-full bg-gray-700 rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            className="p-4 my-2 w-full bg-gray-700 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            className="p-4 my-2 w-full bg-gray-700 rounded"
            required
          />
          {!isSignInForm && (
            <input
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              className="p-4 my-2 w-full bg-gray-700 rounded"
              required
            />
          )}
        </div>

        {/* Submit Button */}
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg hover:bg-red-800 transition">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle Between Sign In & Sign Up */}
        <p
          className="py-4 text-center cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Have an account? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
