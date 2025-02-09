import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await response.json();

      // Find the first official trailer, fallback to any video if unavailable
      const trailer = json.results.find((video) => video.type === "Trailer") || json.results[0];

      if (trailer) {
        dispatch(addTrailerVideo(trailer.key)); // Store only the video key
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovieVideos();
    }
  }, [movieId]); // Fetch trailer when movieId changes

  return trailerVideo;
};

export default useMovieTrailer;
