import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ isPlaying, onTogglePlay }) {
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const isAudioStartedRef = useRef(false);
  const intervalRef = useRef(null);

  // Romantic ambient piano synth chords synthesizer using Web Audio API
  useEffect(() => {
    if (isPlaying && !isAudioStartedRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        isAudioStartedRef.current = true;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Master gain control for soft volume and mute
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        // Soft fade-in over 3 seconds
        masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);

        // Romantic chord progression in D Major / B Minor (Acoustic feel)
        // Frequency notes: D4(293.66), F#4(369.99), A4(440), C#5(554.37), E5(659.25), B4(493.88)
        const chords = [
          [293.66, 369.99, 440.00, 554.37], // Dmaj7
          [246.94, 369.99, 440.00, 587.33], // Bm7
          [220.00, 329.63, 440.00, 554.37], // Aadd9
          [196.00, 293.66, 369.99, 440.00], // Gmaj7
        ];

        let chordIndex = 0;

        const playChordStep = () => {
          if (!ctx || ctx.state === 'closed') return;
          const currentNotes = chords[chordIndex];
          chordIndex = (chordIndex + 1) % chords.length;

          currentNotes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            // Warm soft sine + triangle blend
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            // Arpeggiated soft attack
            const delay = i * 0.18;
            const startTime = ctx.currentTime + delay;
            const duration = 4.5;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.04 - i * 0.005, startTime + 0.6);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(startTime);
            osc.stop(startTime + duration);
          });
        };

        playChordStep();
        intervalRef.current = setInterval(playChordStep, 4000);

      } catch (err) {
        console.warn("Audio Context init warning:", err);
      }
    }
  }, [isPlaying]);

  // Handle Mute toggle
  const toggleMute = () => {
    if (audioCtxRef.current) {
      if (muted) {
        audioCtxRef.current.resume();
      }
    }
    setMuted(!muted);
    if (onTogglePlay) onTogglePlay();
  };

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark-deeper/80 backdrop-blur-md border border-gold/30 text-beige hover:border-gold hover:text-gold transition-all duration-300 shadow-lg"
      >
        <span className="relative flex h-3 w-3">
          {!muted && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${muted ? 'bg-gray-500' : 'bg-gold'}`}></span>
        </span>

        {muted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-gold animate-pulse" />}
        <span className="text-xs font-cinzel tracking-widest hidden sm:inline-block">
          {muted ? "SOUND OFF" : "ROMANTIC THEME"}
        </span>
      </button>
    </div>
  );
}
