import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      {/* Netflix Logo */}
      <img
        className="w-32 md:w-44 cursor-pointer transition-transform hover:scale-105"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
        aria-label="Netflix Logo"
      />

      {/* User Profile & Sign Out */}
      {user && (
        <div className="flex items-center gap-4 md:gap-6">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={handleLanguageChange}
              aria-label="Select Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-white"
            onClick={handleGptSearchClick}
            aria-label={showGptSearch ? "Go to Homepage" : "Enable GPT Search"}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-400 hover:border-gray-300 transition"
              alt="User Icon"
              src={user?.photoURL || "https://picsum.photos/200/300"}
              aria-label="User Profile"
            />
            <button
              onClick={handleSignOut}
              className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Sign Out"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;