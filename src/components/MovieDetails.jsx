import { useSelector, useDispatch } from "react-redux";
import useMovieDetails from "../hooks/useMovieDetails";
import { X } from "lucide-react";
import { addSelectedMovie } from "../utils/moviesSlice";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const { movieDetails, loading, error } = useMovieDetails(selectedMovie?.id);

  if (!selectedMovie) return null;
  if (loading) return <p className="text-white text-center">Loading movie details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const {
    poster_path,
    title,
    overview,
    genres,
    release_date,
    vote_average,
  } = movieDetails;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex justify-center items-center p-4 z-50">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-600"
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
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://picsum.photos/500/750"
            }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;