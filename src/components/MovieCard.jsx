import { MOVIE_IMG_CDN } from "../utils/constants";
import PropTypes from "prop-types";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="Movie Card" src={MOVIE_IMG_CDN + posterPath} />
    </div>
  );
};

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
};

export default MovieCard;
