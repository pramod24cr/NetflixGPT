import { MOVIE_IMG_CDN } from "../utils/constants";
import PropTypes from "prop-types";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 md:w-48 pr-4 transition-transform duration-300 hover:scale-105">
      <img
        alt={posterPath ? "Movie Poster" : "Placeholder Image"}
        src={MOVIE_IMG_CDN + posterPath}
        className="w-full h-auto rounded-lg shadow-lg"
        onError={(e) => {
          e.target.src = "/assets/placeholder.png";
        }}
      />
    </div>
  );
};

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
};

export default MovieCard;
