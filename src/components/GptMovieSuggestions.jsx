import { useSelector, useDispatch } from "react-redux";
import MovieList from "./MovieList";
import { clearGptResults } from "../utils/gptSlice";

const GptMovieSuggestions = () => {
  const dispatch = useDispatch();
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  // If no search has been made, do not show any message
  const hasSearched = movieNames && movieNames.length > 0;

  return (
    <div className="p-6 m-6 bg-black/90 text-white rounded-lg shadow-lg border border-gray-800">
      {hasSearched ? (
        <div className="space-y-8">
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
          {/* Clear Button */}
          <button
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => dispatch(clearGptResults())}
          >
            Clear Results
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default GptMovieSuggestions;
