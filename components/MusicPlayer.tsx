"use client";
import { useEffect, useRef, useState } from "react";

// Royalty-free bossa nova — Bensound "Bossa" (free with attribution)
// Replace with your own track if preferred: place file at /public/music/bossa-nova.mp3
const AUDIO_SRC = "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3";

export function MusicPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)); // autoplay blocked — button reveals instead
  }, []);

  const toggle = () => {
    const audio = ref.current;
    if (!audio) return;
    if (!playing) {
      audio.play().then(() => { setPlaying(true); setMuted(false); });
      return;
    }
    audio.muted = !muted;
    setMuted(!muted);
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={ref} src={AUDIO_SRC} preload="auto" />
      <button
        onClick={toggle}
        aria-label={!playing ? "Play music" : muted ? "Unmute music" : "Mute music"}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-teal border border-gold/60 text-ivory shadow-lg flex items-center justify-center hover:bg-teal-dark transition-all duration-200 hover:scale-110"
      >
        {!playing ? <PlayIcon /> : muted ? <MuteIcon /> : <SpeakerIcon />}
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

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  );
}
