import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setBackgroundTrailer, setMovieDetailsTrailer } from "../utils/moviesSlice";

const useMovieTrailer = (movieId, isBackground = false) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) =>
    isBackground ? store.movies.backgroundTrailer : store.movies.movieDetailsTrailer
  );

  useEffect(() => {
    if (!movieId) return;

    const getMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await response.json();

        const trailer = json.results.find((video) => video.type === "Trailer") || json.results[0];

        if (trailer) {
          if (isBackground) {
            dispatch(setBackgroundTrailer(trailer.key));
          } else {
            dispatch(setMovieDetailsTrailer(trailer.key));
          }
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    getMovieVideos();
  }, [movieId, isBackground, dispatch]);

  return trailerVideo;
};

export default useMovieTrailer;