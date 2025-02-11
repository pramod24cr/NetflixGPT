import PropTypes from "prop-types";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerKey = useMovieTrailer(movieId, true);

  if (!trailerKey) {
    console.warn(`Trailer not found for movie ID: ${movieId}`);
    return (
      <div
        className="w-screen aspect-video bg-black flex items-center justify-center"
        aria-label="Loading trailer"
      >
        <p className="text-white text-lg">Loading trailer...</p>
      </div>
    );
  }

  return (
    <div className="w-screen aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&loop=1&mute=1&playlist=${trailerKey}&rel=0`}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        aria-label="Movie Trailer"
      ></iframe>
    </div>
  );
};

VideoBackground.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default VideoBackground;
