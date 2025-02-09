import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { X, Play, Bookmark, BookmarkCheck } from "lucide-react";
import {
  addSelectedMovie,
  addToWatchlist,
  removeFromWatchlist,
} from "../utils/moviesSlice";
import lang from "../utils/languageConstants";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const watchlist = useSelector((store) => store.movies.watchlist);
  const { movieDetails, loading, error } = useMovieDetails(selectedMovie?.id);
  const langKey = useSelector((store) => store.config.lang);
  const trailerKey = useMovieTrailer(selectedMovie?.id);
  const [showTrailer, setShowTrailer] = useState(false);

  if (!selectedMovie) return null;
  if (loading)
    return <p className="text-white text-center">Loading movie details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const { id, poster_path, title, overview, genres, release_date, vote_average } = movieDetails;
  const isWatchlisted = watchlist.some((movie) => movie.id === id);

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center p-4 z-50 overflow-y-auto">
   
      <div className="relative bg-gray-800 text-white rounded-lg shadow-xl p-6 w-full max-w-3xl md:max-w-4xl">
  {/* Close Button (Always Visible) */}
  <button
    className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-red-600 transition focus:outline-none"
    onClick={() => dispatch(addSelectedMovie(null))}
    aria-label="Close Movie Details"
  >
    <X size={24} className="text-white" />
  </button>

  {/* Poster and Movie Details */}
  <div className="flex flex-col items-center md:flex-row gap-6">
    {/* Poster (Hidden when trailer is playing) */}
    {!showTrailer && (
      <img
        className="w-1/2 md:w-1/3 rounded-lg shadow-lg object-cover mx-auto"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://picsum.photos/500/750"
        }
        alt={title || "Movie Poster"}
        aria-label="Movie Poster"
      />
    )}

          {/* Movie Details */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300 text-sm md:text-base mb-4">
              {overview || "No overview available."}
            </p>

            <div className="text-sm md:text-base space-y-2">
              <p className="text-gray-400">
                🎬 <span className="text-white">{genres?.map((g) => g.name).join(", ") || "No genres available."}</span>
              </p>
              <p className="text-gray-400">
                📅 Release Date: <span className="text-white">{release_date || "Unknown"}</span>
              </p>
              <p className="text-gray-400">
                ⭐ Rating: <span className="text-yellow-400">{vote_average ? `${vote_average} / 10` : "Not rated"}</span>
              </p>
            </div>

            {/* Trailer Embed (Only show when Play is clicked) */}
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
                  <Play size={20} /> {trailerKey ? lang[langKey].playTrailer : "Trailer Not Available"}
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
                  {isWatchlisted ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  {isWatchlisted ? lang[langKey].added : lang[langKey].watchlist}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
