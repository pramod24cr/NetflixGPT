import { useSelector, useDispatch } from "react-redux";
import useMovieDetails from "../hooks/useMovieDetails";
import { X, Play, Bookmark, BookmarkCheck } from "lucide-react";
import { addSelectedMovie, addToWatchlist, removeFromWatchlist } from "../utils/moviesSlice";
import lang from "../utils/languageConstants";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const watchlist = useSelector((store) => store.movies.watchlist);
  const { movieDetails, loading, error } = useMovieDetails(selectedMovie?.id);
  const langKey = useSelector((store) => store.config.lang);

  if (!selectedMovie) return null;
  if (loading) return <p className="text-white text-center">Loading movie details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const { id, poster_path, title, overview, genres, release_date, vote_average } = movieDetails;
  const isWatchlisted = watchlist.some((movie) => movie.id === id);

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center p-4 z-50">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-red-600 transition focus:outline-none"
          onClick={() => dispatch(addSelectedMovie(null))}
          aria-label="Close Movie Details"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Movie Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Movie Poster */}
          <img
            className="w-full md:w-1/3 rounded-lg shadow-lg"
            src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://picsum.photos/500/750"}
            alt={title || "Movie Poster"}
            aria-label="Movie Poster"
          />

          {/* Movie Details */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300 text-sm md:text-base mb-4">
              {overview || "No overview available."}
            </p>

            <div className="text-sm md:text-base space-y-2">
              <p className="text-gray-400">
                🎬{" "}
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

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              {/* Play Button */}
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition focus:ring-2 focus:ring-red-400"
                onClick={() => window.open(`https://www.youtube.com/results?search_query=${title}+trailer`, "_blank")}
              >
                <Play size={20} /> {lang[langKey].play}
              </button>

              {/* Watchlist Button */}
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition focus:ring-2 
                  ${isWatchlisted ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-700 hover:bg-gray-800 text-gray-300"}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
