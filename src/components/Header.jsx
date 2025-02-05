/* eslint-disable no-unused-vars */
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Constants
  const NETFLIX_LOGO_URL =
    "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  return (
    <div className="fixed top-0 left-0 w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* Netflix Logo */}
      <img
        className="w-24 md:w-36 cursor-pointer"
        src={NETFLIX_LOGO_URL}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
        aria-label="Netflix Logo"
      />

      {/* User Profile & Sign Out */}
      {user && (
        <div className="flex items-center gap-2 md:gap-4">
          <img
            className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-400"
            alt="User Icon"
            src={user?.photoURL || "https://picsum.photos/200/300"}
            aria-label="User Profile"
          />
          <button
            onClick={handleSignOut}
            className="px-3 py-1 md:px-4 md:py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white font-semibold text-sm md:text-base"
            aria-label="Sign Out"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;