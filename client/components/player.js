import { useRef } from 'react';
import { useAudio } from '../lib/useAudio';

export const Player = ({ number, title, date, url }) => {
  const audio = useRef(null);
  const {
    play,
    pause,
    increaseSpeed,
    decreaseSpeed,
    isPlaying,
    toggle,
    speed,
  } = useAudio(audio);

  return (
    <div>
      <audio
        onPlay={play}
        onPause={pause}
        title={title}
        ref={audio}
        src={url}
      ></audio>
      <h2>
        {number} - {title}
      </h2>
      <button onClick={() => toggle()}>{isPlaying ? 'pause' : 'play'}</button>
      <button onClick={() => increaseSpeed()}>Increase Speed</button>
      <small>{speed}</small>
      <button onClick={() => decreaseSpeed()}>Decrease Speed</button>
    </div>
  );
};
