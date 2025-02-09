import { useSelector, useDispatch } from "react-redux";
import { clearGptResults } from "../utils/gptSlice";
import { addSelectedMovie } from "../utils/moviesSlice";
import lang from "../utils/languageConstants";
import MovieDetails from "./MovieDetails";

const GptMovieSuggestions = () => {
  const dispatch = useDispatch();
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const langKey = useSelector((store) => store.config.lang);

  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div className="p-6 m-6 bg-black/90 text-white rounded-lg shadow-xl border border-gray-700">
      {movieResults.length === 0 ? (
        <p className="text-gray-300 text-lg text-center">
          {lang[langKey].noResults}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
          {movieResults.flat().map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-3 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:border-white border border-transparent w-full"
              onClick={() => dispatch(addSelectedMovie(movie))}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2 text-center text-gray-200 hover:text-white transition">
                {movie.title}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Clear Button */}
      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-full transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => dispatch(clearGptResults())}
        >
          {lang[langKey].clearResults}
        </button>
      </div>

      {/* Show Movie Details if a movie is selected */}
      {selectedMovie && <MovieDetails />}
    </div>
  );
};

export default GptMovieSuggestions;
