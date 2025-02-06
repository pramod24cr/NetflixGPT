import { MOVIE_IMG_CDN } from "../utils/constants";
import PropTypes from "prop-types";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="Movie Card" src={MOVIE_IMG_CDN + posterPath} />
    </div>
  );
};

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
};

export default MovieCard;
