import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NETFLIX_LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* Netflix Logo */}
      <img
        className="w-24 md:w-36 cursor-pointer"
        src={NETFLIX_LOGO}
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
