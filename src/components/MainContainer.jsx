import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const Loader = () => (
  <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
    {/* Spinner */}
    <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>

    {/* Skeleton effect for text */}
    <div className="w-3/4 h-6 bg-gray-700 animate-pulse rounded-md"></div>
    <div className="w-1/2 h-4 bg-gray-700 animate-pulse rounded-md"></div>
  </div>
);

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.trendingMovies);

  if (!movies?.length) {
    return <Loader />;
  }

  const mainMovie = movies[0] || {};
  const title = mainMovie.original_title || mainMovie.title || "Untitled";
  const overview = mainMovie.overview || "No description available.";
  const movieId = mainMovie.id;

  return (
    <div className="pt-[30%] md:pt-0 bg-black">
      <VideoTitle title={title} overview={overview} movie={mainMovie} />
      {movieId ? <VideoBackground movieId={movieId} /> : null}
    </div>
  );
};

export default MainContainer;
