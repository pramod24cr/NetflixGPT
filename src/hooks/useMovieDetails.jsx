import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieDetails = (movieId) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovieDetails = async () => {
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (err) {
        setError(`Failed to fetch movie details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return { movieDetails, loading, error };
};

export default useMovieDetails;
