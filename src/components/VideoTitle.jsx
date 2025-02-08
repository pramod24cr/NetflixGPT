import PropTypes from "prop-types";
import { Play } from "lucide-react";
import { useSelector} from "react-redux";
import lang from "../utils/languageConstants";

const VideoTitle = ({ title, overview }) => {

  
const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute inset-0 text-white bg-gradient-to-r from-black">
      {/* Title */}
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>

      {/* Overview */}
      <p className="hidden md:block py-6 text-lg w-2/4">
        {overview || "No overview available."}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 my-4 md:m-0">
        <button
          className="flex items-center gap-2 bg-white text-black py-2 md:py-4 px-4 md:px-10 text-lg md:text-xl font-semibold rounded-lg hover:bg-white/75 transition"
          aria-label="Play Video"
        >
          <Play size={24} className="text-black" /> {lang[langKey].play}
        </button>

        <button
          className="hidden md:flex items-center bg-gray-500 text-white py-2 px-6 text-lg bg-opacity-50 rounded-lg hover:bg-gray-700 transition"
          aria-label="More Info"
        >
          {lang[langKey].moreInfo}
        </button>
      </div>
    </div>
  );
};

VideoTitle.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default VideoTitle;
