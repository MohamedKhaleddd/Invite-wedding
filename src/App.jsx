import React, { useEffect, useState } from 'react';
import LandingPage from './components/Landing/LandingPage';
import MainWebsite from './pages/MainWebsite';
import AudioPlayer from './components/MusicPlayer/AudioPlayer';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'main'
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('wedding-language') || 'en');

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem('wedding-language', language);
  }, [language]);

  const handleEnterInvitation = () => {
    setIsAudioPlaying(true);
    setView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-dark-deeper text-cream font-sans antialiased ${language === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* Global Background Audio Player */}
      <AudioPlayer isPlaying={isAudioPlaying} onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)} language={language} />

      {/* Experience Router */}
      {view === 'landing' ? (
        <LandingPage onEnterInvitation={handleEnterInvitation} language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ar' : 'en')} />
      ) : (
        <MainWebsite language={language} onToggleLanguage={() => setLanguage(language === 'en' ? 'ar' : 'en')} />
      )}
    </div>
  );
}
