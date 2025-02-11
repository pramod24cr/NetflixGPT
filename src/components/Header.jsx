import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { changeLanguage } from "../utils/configSlice";
import { Bookmark, Menu, X } from "lucide-react";
import lang from "../utils/languageConstants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const watchlist = useSelector((store) => store.movies.watchlist);
  const [menuOpen, setMenuOpen] = useState(false);
  const langKey = useSelector((store) => store.config.lang);

  // Handles user logout
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  // Tracks authentication state and updates Redux
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-4 md:px-8 py-3 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* Netflix Logo - Click to go to home */}
      <img
        className="w-32 md:w-44 cursor-pointer transition-transform hover:scale-105"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
        aria-label="Netflix Logo"
      />

      {user && (
        <>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Menu for Desktop & Mobile */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-4 items-center absolute md:relative top-14 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 z-20`}
          >
            {/* Language Selector */}
            <select
              className="p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
              onChange={(e) => dispatch(changeLanguage(e.target.value))}
              value={langKey}
              aria-label="Select Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>

            {/* GPT Search Button */}
            <button
              className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={() => navigate("/gpt-search")}
              aria-label="Go to GPT Search"
            >
              {lang[langKey].askGPT}
            </button>

            {/* Watchlist Button */}
            <button
              onClick={() => navigate("/watchlist")}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <Bookmark size={20} />
              <span>
                {lang[langKey].watchlist} ({watchlist.length})
              </span>
            </button>

            {/* Profile & Sign Out */}
            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-400 hover:border-gray-300 transition"
                alt="User Icon"
                src={user?.photoURL || "https://picsum.photos/200/300"}
                aria-label="User Profile"
              />
              <button
                onClick={handleSignOut}
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                aria-label="Sign Out"
              >
                {lang[langKey].signout}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
