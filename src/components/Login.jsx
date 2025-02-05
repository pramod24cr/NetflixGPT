import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../utils/errorMessages";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleButtonClick = async () => {
    // Validate input fields
    const validationMessage = checkValidData(email.current.value, password.current.value);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    // Check if passwords match during sign-up
    if (!isSignInForm && password.current.value !== confirmPassword.current.value) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!isSignInForm) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: "https://avatars.githubusercontent.com/u/63894299?v=4",
        });

        navigate("/browse");
      } else {
        // Sign In Logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        console.log("Signed in user:", userCredential.user); 
        navigate("/browse");
      }
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      setErrorMessage(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear error message when toggling forms
  };

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
        className="w-full md:w-3/12 absolute p-8 md:p-12 bg-black/80 text-white rounded-lg my-24 mx-auto right-0 left-0"
      >
        <h1 className="font-bold text-3xl py-4 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Input Fields */}
        <div className="flex flex-col space-y-4">
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              className="p-4 w-full bg-gray-700 rounded"
              required
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            className="p-4 w-full bg-gray-700 rounded"
            required
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            aria-label="Password"
            className="p-4 w-full bg-gray-700 rounded"
            required
          />
          {!isSignInForm && (
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              className="p-4 w-full bg-gray-700 rounded"
              required
            />
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}

        {/* Submit Button */}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg hover:bg-red-800 transition disabled:bg-red-900 disabled:cursor-not-allowed"
          onClick={handleButtonClick}
          disabled={isLoading}
          aria-label={isSignInForm ? "Sign In" : "Sign Up"}
        >
          {isLoading ? "Processing..." : isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle Between Sign In & Sign Up */}
        <p
          className="py-4 text-center cursor-pointer"
          onClick={toggleSignInForm}
          aria-label={isSignInForm ? "Switch to Sign Up" : "Switch to Sign In"}
        >
          {isSignInForm ? "New to Netflix? " : "Have an account? "}
          <span className="text-red-500 font-semibold hover:underline">
            {isSignInForm ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;