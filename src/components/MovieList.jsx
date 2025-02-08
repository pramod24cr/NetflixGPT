import { useDispatch } from "react-redux";
import { addSelectedMovie } from "../utils/moviesSlice";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";

const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();

  if (!movies || !Array.isArray(movies)) {
    return null;
  }

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white font-semibold">
        {title}
      </h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
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
