"use client";

import { memo, useEffect, useRef } from "react";

type HeroVideoProps = {
  poster: string;
  onCanPlay?: () => void;
};

function HeroVideoComponent({ poster, onCanPlay }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.setAttribute("webkit-playsinline", "true");
    }
  }, []);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onCanPlay={onCanPlay}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        aria-hidden
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export const HeroVideo = memo(HeroVideoComponent);
