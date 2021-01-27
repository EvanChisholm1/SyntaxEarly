import { useEffect, useState } from 'react';

export const useAudio = audioRef => {
  const [isPlaying, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const toggle = () => {
    if (!audioRef.current) return;
    setPlaying(!isPlaying);
  };

  const increaseSpeed = () => {
    if (!audioRef.current) return;
    setSpeed(speed + 0.25);
  };

  const decreaseSpeed = () => {
    if (!audioRef.current) return;
    setSpeed(speed - 0.25);
  };

  const play = () => {
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  return {
    play,
    pause,
    increaseSpeed,
    decreaseSpeed,
    isPlaying,
    toggle,
    setPlaying,
    speed,
    setSpeed,
  };
};
