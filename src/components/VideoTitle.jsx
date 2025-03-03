import PropTypes from "prop-types";
import { Play } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addSelectedMovie } from "../utils/moviesSlice";
import MovieDetails from "./MovieDetails";
import useMovieTrailer from "../hooks/useMovieTrailer";
import lang from "../utils/languageConstants";

const VideoTitle = ({ title, overview, movie }) => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);

  // Get the trailer key for the movie (used for background video)
  const trailerKey = useMovieTrailer(movie?.id, true);

  // Handle Play Button Click
  const handlePlayClick = () => {
    if (trailerKey) {
      // Open the trailer in fullscreen mode in a new tab
      window.open(
        `https://www.youtube.com/watch?v=${trailerKey}&autoplay=1&fs=1`,
        "_blank"
      );
    } else {

      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          title + " trailer"
        )}`,
        "_blank"
      );
    }
  };

  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute inset-0 text-white bg-gradient-to-r from-black">
      {/* Title */}
      <h1 className="text-2xl md:text-6xl pt-[50%] md:pt-0 font-bold">{title}</h1>

      {/* Overview */}
      <p className="hidden md:block py-6 text-lg w-2/4">
        {overview || "No overview available."}
      </p>

      {/* Play Button */}
      <div className="flex gap-4 my-4 md:m-0">
        <button
          className="flex items-center gap-2 bg-white text-black py-2 md:py-4 px-4 md:px-10 text-lg md:text-xl font-semibold rounded-lg hover:bg-white/75 transition"
          aria-label="Play Video"
          onClick={handlePlayClick}
        >
          <Play size={24} className="text-black" /> {lang[langKey].play}
        </button>

        {/* More Info Button */}
        <button
          className="hidden md:flex items-center bg-gray-600 text-white py-2 px-6 text-lg bg-opacity-50 rounded-lg hover:bg-gray-500 transition"
          aria-label="More Info"
          onClick={() => dispatch(addSelectedMovie(movie))}
        >
          {lang[langKey].moreInfo}
        </button>
      </div>

      {/* Show MovieDetails when a movie is selected */}
      {selectedMovie && <MovieDetails />}
    </div>
  );
};

VideoTitle.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
};

export default VideoTitle;