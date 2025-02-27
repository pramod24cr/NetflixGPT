import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR, NETFLIX_BACKGROUND } from "../utils/constants";
import { getAuthErrorMessage } from "../utils/errorMessages";
import lang from "../utils/languageConstants";
import NetflixSound from "/assets/netflix-ta-dum.mp3";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const formRefs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const playNetflixSound = () => {
    const audio = new Audio(NetflixSound);
    audio.play();
  };

  const handleButtonClick = async () => {
    const email = formRefs.email.current.value.trim();
    const password = formRefs.password.current.value.trim();
    const confirmPassword = formRefs.confirmPassword?.current?.value?.trim();
    const name = formRefs.name?.current?.value?.trim();

    // Validate input fields
    const validationMessage = checkValidData(email, password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    // Check if passwords match during sign-up
    if (!isSignInForm && password !== confirmPassword) {
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
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
          photoURL: USER_AVATAR,
        });

        const { uid, displayName, photoURL } = auth.currentUser;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email, password);
      }
      playNetflixSound();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={NETFLIX_BACKGROUND}
          alt="Netflix Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-4/12 absolute p-8 md:p-12 bg-black/80 text-white rounded-lg my-24 mx-auto right-0 left-0  max-h-[80vh] overflow-y-auto"
      >
        <h1 className="font-bold text-3xl py-4 text-center">
          {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}
        </h1>

        {/* Input Fields */}
        <div className="flex flex-col space-y-4">
          {!isSignInForm && (
            <input
              ref={formRefs.name}
              type="text"
              placeholder={lang[langKey].fullName}
              aria-label="Full Name"
              className="p-4 w-full bg-gray-700 rounded"
              required
            />
          )}
          <input
            ref={formRefs.email}
            type="email"
            placeholder={lang[langKey].email}
            aria-label="Email Address"
            className="p-4 w-full bg-gray-700 rounded"
            required
          />
          <input
            ref={formRefs.password}
            type="password"
            placeholder={lang[langKey].password}
            aria-label="Password"
            className="p-4 w-full bg-gray-700 rounded"
            required
          />
          {!isSignInForm && (
            <input
              ref={formRefs.confirmPassword}
              type="password"
              placeholder={lang[langKey].confirmPassword}
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
          {isLoading
            ? lang[langKey].processing
            : isSignInForm
            ? lang[langKey].signIn
            : lang[langKey].signUp}
        </button>

        {/* Toggle Between Sign In & Sign Up */}
        <p
          className="py-4 text-center cursor-pointer"
          onClick={toggleSignInForm}
          aria-label={isSignInForm ? "Switch to Sign Up" : "Switch to Sign In"}
        >
          {isSignInForm
            ? lang[langKey].newToNetflix
            : lang[langKey].haveAnAccount}
          <span className="text-red-500 font-semibold hover:underline">
            {isSignInForm ? lang[langKey].signUp : lang[langKey].signIn}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
