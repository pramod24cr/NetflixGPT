import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  // Define the list of movie categories to render
  const movieCategories = [
    { title: "Now Playing", movies: movies?.nowPlayingMovies },
    { title: "Trending", movies: movies?.trendingMovies },
    { title: "Top Rated", movies: movies?.topRatedMovies },
    { title: "Upcoming", movies: movies?.upcomingMovies },
    { title: "Popular", movies: movies?.popularMovies },
  ];

  return (
    <div className="bg-black">
      <div className="md:-mt-52 pl-4 md:pl-12 relative z-20">
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
    </div>
  );
};

export default SecondaryContainer;