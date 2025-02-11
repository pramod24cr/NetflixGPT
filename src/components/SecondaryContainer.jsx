import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);

  // Defining movie categories with their respective titles
  const movieCategories = [
    { title: "Now Playing", movies: movies?.nowPlayingMovies },
    { title: "Trending", movies: movies?.trendingMovies },
    { title: "Top Rated", movies: movies?.topRatedMovies },
    { title: "Upcoming", movies: movies?.upcomingMovies },
    { title: "Popular", movies: movies?.popularMovies },
  ];

  return (
    <div className="bg-black">
      <div
        className="md:-mt-52 pl-4 md:pl-12 relative z-20"
        aria-label="Movie Categories Section"
      >
        {movieCategories.map(
          (category) =>
            category.movies?.length > 0 && (
              <MovieList
                key={category.title}
                title={category.title}
                movies={category.movies}
              />
            )
        )}
      </div>

      {/* Show Movie Details if a movie is selected */}
      {selectedMovie && <MovieDetails />}
    </div>
  );
};

export default SecondaryContainer;
