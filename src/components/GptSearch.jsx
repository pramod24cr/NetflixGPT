import { NETFLIX_BACKGROUND } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      {/* Background Image with Opacity */}
      <div className="fixed -z-10 w-full h-full">
        <img
          className="w-full h-full object-cover opacity-80"
          src={NETFLIX_BACKGROUND}
          alt="Netflix Background"
          aria-label="Netflix Background"
        />
        {/* Dark Overlay for Better Visibility */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
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
