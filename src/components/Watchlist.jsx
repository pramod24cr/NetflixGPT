import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addSelectedMovie, setWatchlist } from "../utils/moviesSlice";
import MovieDetails from "./MovieDetails";
import { NETFLIX_BACKGROUND } from "../utils/constants";
import lang from "../utils/languageConstants";

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.movies.watchlist);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const langKey = useSelector((store) => store.config.lang);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      dispatch(setWatchlist(JSON.parse(storedWatchlist)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-6">
      {/* Background Image */}
      <div className="fixed -z-10 w-full h-full">
        <img
          className="w-full h-full object-cover opacity-80"
          src={NETFLIX_BACKGROUND}
          alt="Netflix Background"
          aria-label="Netflix Background"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>

      {/* Watchlist Title */}
      <h1 className="text-4xl font-extrabold text-center mb-8">
        {lang[langKey].yourWatchlist}
      </h1>

      {/* Watchlist Movies */}
      {watchlist.length === 0 ? (
        <p className="text-gray-300 text-lg">{lang[langKey].emptyWatchlist}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => dispatch(addSelectedMovie(movie))}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2 text-center">
                {movie.title}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Show Movie Details if a movie is selected */}
      {selectedMovie && <MovieDetails />}
    </div>
  );
};

export default Watchlist;
