import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openai";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await response.json();
  
      // Find exact match and return only the first one
      const exactMatch = json.results.find(
        (item) => item.title.toLowerCase() === movie.toLowerCase()
      );
  
      return exactMatch ? [exactMatch] : [];
    } catch (error) {
      console.error("TMDB API Error:", error);
      setError("Failed to fetch movie data. Please try again.");
      return [];
    }
  };
  
  
  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      setError("Please enter a search query.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Make an API call to GPT API and get Movie Results
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${query}. Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;
      const gptResults = await client.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (!gptResults.choices?.[0]?.message?.content) {
        throw new Error("No results found from GPT API.");
      }

      const gptMovies = gptResults.choices[0].message.content.split(",");

      // For each movie, search TMDB API
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie.trim()));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("GPT Search Error:", error);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[30%] md:pt-[7%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
          placeholder={lang[langKey].gptSearchPlaceholder}
          aria-label="Search for movies"
          disabled={isLoading}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition disabled:bg-red-900 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
          disabled={isLoading}
          aria-label="Search"
        >
          {isLoading ? lang[langKey].searching : lang[langKey].search}
        </button>
      </form>
      {error && (
        <p className="text-white text-lg text-center mt-3 p-4">{error}</p>
      )}
    </div>
  );
};

export default GptSearchBar;