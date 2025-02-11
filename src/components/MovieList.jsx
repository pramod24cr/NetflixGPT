import { useDispatch } from "react-redux";
import { addSelectedMovie } from "../utils/moviesSlice";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  if (!movies?.length) {
    return <p className="text-white px-6">No movies available.</p>;
  }

  // 🔹 Function to update arrow visibility after scrolling
  const updateArrows = () => {
    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 1 // 🔹 Fix edge case
      );
    });
  };

  // 🔹 Handle smooth scrolling & update arrows
  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 500;
    if (!container) return;

    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });

    // Wait until the scroll completes before checking arrow visibility
    setTimeout(updateArrows, 350);
  };

  // 🔹 Ensure arrow visibility updates on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollEvent = () => updateArrows();
    container.addEventListener("scroll", handleScrollEvent);
    updateArrows(); // Initial check on mount

    return () => {
      container.removeEventListener("scroll", handleScrollEvent);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div className="px-6 relative">
      {/* Section Title */}
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold">{title}</h1>

      {/* Scroll Buttons */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full z-10 hover:bg-opacity-75"
          aria-label="Scroll left"
        >
          &lt;
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full z-10 hover:bg-opacity-75"
          aria-label="Scroll right"
        >
          &gt;
        </button>
      )}

      {/* Horizontal Scrollable Movie List */}
      <div className="flex overflow-x-scroll no-scrollbar relative" ref={scrollContainerRef}>
        <div className="flex gap-4" aria-label={`Movie list: ${title}`}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => dispatch(addSelectedMovie(movie))}
              className="cursor-pointer"
            >
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default MovieList;