import { NETFLIX_BACKGROUND } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      {/* Background Image */}
      <div className="fixed -z-10 w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={NETFLIX_BACKGROUND}
          alt="Netflix Background"
          aria-label="Netflix Background"
        />
      </div>

      {/* GPT Search Components */}
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GPTSearch;