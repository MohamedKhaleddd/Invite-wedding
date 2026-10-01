import React, { useState } from 'react';
import LandingPage from './components/Landing/LandingPage';
import MainWebsite from './pages/MainWebsite';
import AudioPlayer from './components/MusicPlayer/AudioPlayer';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'main'
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleEnterInvitation = () => {
    setIsAudioPlaying(true);
    setView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-deeper text-cream font-sans antialiased">
      
      {/* Global Background Audio Player */}
      <AudioPlayer isPlaying={isAudioPlaying} onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)} />

      {/* Experience Router */}
      {view === 'landing' ? (
        <LandingPage onEnterInvitation={handleEnterInvitation} />
      ) : (
        <MainWebsite />
      )}
    </div>
  );
}
