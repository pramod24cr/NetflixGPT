import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  if (!trailerVideo) {
    return (
      <div className="w-screen aspect-video bg-black flex items-center justify-center">
        <p className="text-white text-lg">Loading trailer...</p>
      </div>
    );
  }

  return (
    <div className="w-screen aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&controls=0&loop=1&mute=1&playlist=${trailerVideo.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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