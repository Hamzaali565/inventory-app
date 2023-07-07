import React, { useRef, useEffect } from "react";
import Loader from "../../assets/VideoLoader/loader.mp4";

const Splash = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const playVideo = () => {
      videoElement.play();
    };

    const handleVideoEnd = () => {
      videoElement.currentTime = 0; // Rewind the video to the beginning
      playVideo();
    };

    videoElement.addEventListener("ended", handleVideoEnd);
    playVideo();

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <video ref={videoRef} src={Loader} autoPlay muted loop playsInline />
    </div>
  );
};

export default Splash;
