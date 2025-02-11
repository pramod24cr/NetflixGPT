import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { X, Play, Bookmark, BookmarkCheck } from "lucide-react";
import { addSelectedMovie, addToWatchlist, removeFromWatchlist,} from "../utils/moviesSlice";
import lang from "../utils/languageConstants";
import PropTypes from "prop-types";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const watchlist = useSelector((store) => store.movies.watchlist);
  const langKey = useSelector((store) => store.config.lang);
  const { movieDetails, loading, error } = useMovieDetails(selectedMovie?.id);
  const trailerKey = useMovieTrailer(selectedMovie?.id, false);
  const [showTrailer, setShowTrailer] = useState(false);

  const isWatchlisted = useMemo(() => {
    return watchlist.some((movie) => movie.id === movieDetails?.id);
  }, [watchlist, movieDetails]);

  if (!selectedMovie) return null;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center p-4 z-50 overflow-y-auto">
      <div className="relative bg-gray-800 text-white rounded-lg shadow-xl p-6 w-full max-w-3xl md:max-w-4xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-red-600 transition focus:outline-none"
          onClick={() => dispatch(addSelectedMovie(null))}
          aria-label="Close Movie Details"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Show Skeleton Loader While Loading */}
        {loading ? (
          <div className="animate-pulse flex flex-col md:flex-row gap-6">
            <div className="w-1/2 md:w-1/3 h-64 bg-gray-600 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 w-3/4 bg-gray-600 rounded"></div>
              <div className="h-4 w-full bg-gray-600 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-600 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-600 rounded"></div>
              <div className="h-10 w-1/2 bg-gray-600 rounded"></div>
            </div>
          </div>
        ) : (
          /* Show Actual Movie Details After Loading */
          <MovieDetailsContent
            movieDetails={movieDetails}
            isWatchlisted={isWatchlisted}
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
            trailerKey={trailerKey}
            dispatch={dispatch}
            langKey={langKey}
          />
        )}
      </div>
    </div>
  );
};

const MovieDetailsContent = ({
  movieDetails,
  isWatchlisted,
  showTrailer,
  setShowTrailer,
  trailerKey,
  dispatch,
  langKey,
}) => {
  const {
    id,
    poster_path,
    title,
    overview,
    genres,
    release_date,
    vote_average,
  } = movieDetails;

  return (
    <div className="flex flex-col items-center md:flex-row gap-6">
      {!showTrailer && (
        <img
          className="w-1/2 md:w-1/3 rounded-lg shadow-lg object-cover mx-auto"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "/assets/placeholder.png"
          }
          alt={title || "Movie Poster"}
          aria-label="Movie Poster"
        />
      )}

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-4">
          {overview || "No overview available."}
        </p>

        <div className="text-sm md:text-base space-y-2">
          <p className="text-gray-400">
            🎬 Genre:{" "}
            <span className="text-white">
              {genres?.map((g) => g.name).join(", ") || "No genres available."}
            </span>
          </p>
          <p className="text-gray-400">
            📅 Release Date:{" "}
            <span className="text-white">{release_date || "Unknown"}</span>
          </p>
          <p className="text-gray-400">
            ⭐ Rating:{" "}
            <span className="text-yellow-400">
              {vote_average ? `${vote_average} / 10` : "Not rated"}
            </span>
          </p>
        </div>

        {/* Trailer Embed */}
        {showTrailer && trailerKey ? (
          <div className="relative w-full h-56 md:h-64 lg:h-72 mt-4">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            {/* Close Trailer Button */}
            <button
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition focus:ring-2 focus:ring-white"
              onClick={() => setShowTrailer(false)}
            >
              Close Trailer
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Play Button */}
            <button
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition focus:ring-2 focus:ring-white"
              onClick={() => setShowTrailer(true)}
              disabled={!trailerKey}
            >
              <Play size={20} />{" "}
              {trailerKey ? lang[langKey].playTrailer : "Trailer Not Available"}
            </button>

            {/* Watchlist Button */}
            <button
              className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition focus:ring-2 ${
                isWatchlisted
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-700 hover:bg-gray-800 text-gray-300"
              }`}
              onClick={() => {
                if (isWatchlisted) {
                  dispatch(removeFromWatchlist(id));
                } else {
                  dispatch(addToWatchlist(movieDetails));
                }
              }}
            >
              {isWatchlisted ? (
                <BookmarkCheck size={20} />
              ) : (
                <Bookmark size={20} />
              )}
              {isWatchlisted ? lang[langKey].added : lang[langKey].watchlist}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

MovieDetailsContent.propTypes = {
  movieDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  isWatchlisted: PropTypes.bool.isRequired,
  showTrailer: PropTypes.bool.isRequired,
  setShowTrailer: PropTypes.func.isRequired,
  trailerKey: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  langKey: PropTypes.string.isRequired,
};

export default MovieDetails;
