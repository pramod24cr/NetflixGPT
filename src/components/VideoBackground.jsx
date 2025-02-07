import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className=" w-screen">
      <iframe
        className="w-screen aspect-video"
        // src={
        //   "https://www.youtube.com/embed/" +
        //   trailerVideo?.key +
        //   "?&autoplay=1&mute=1&amp;controls=0&loop=1"
        // }
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&controls=0&loop=1&mute=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

VideoBackground.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default VideoBackground;
