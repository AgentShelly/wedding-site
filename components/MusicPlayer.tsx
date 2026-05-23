"use client";
import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "https://res.cloudinary.com/ddu33nzrb/video/upload/v1779529024/bossa-nova_tyqjpp.mp3";

export function MusicPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggle = async () => {
    const audio = ref.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.load();
        await audio.play();
        setPlaying(true);
      }
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  return (
    <>
      <audio ref={ref} preload="none" crossOrigin="anonymous">
        <source src={AUDIO_SRC} type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-teal border border-gold/60 text-ivory shadow-lg flex items-center justify-center hover:bg-teal-dark transition-all duration-200 hover:scale-110"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
