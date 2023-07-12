import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../assets/VideoLoader/loader.json";

const Splash = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animationRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return <div ref={containerRef} className="h-96 mt-14" />;
};

export default Splash;
