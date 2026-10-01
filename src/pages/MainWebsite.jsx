import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import HeroSection from '../components/Home/HeroSection';
import StorySection from '../components/OurStory/StorySection';
import DetailsSection from '../components/Details/DetailsSection';
import TimelineSection from '../components/Timeline/TimelineSection';
import FloralDivider from '../components/UI/FloralDivider';
import LivingBackground from '../components/Background/LivingBackground';

export default function MainWebsite() {
  return (
    <div className="relative min-h-screen bg-dark-deeper text-cream selection:bg-gold selection:text-dark">
      
      {/* Living background running richly across all main website sections */}
      <LivingBackground intensity="high" />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <HeroSection />
        <StorySection />
        <DetailsSection />
        <TimelineSection />
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 py-16 px-4 bg-dark-deeper/80 border-t border-gold/20 text-center backdrop-blur-md">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full border border-gold/40 flex items-center justify-center text-gold font-cinzel text-lg font-bold shadow-lg">
            T&amp;J
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-cream tracking-widest">
            THARWAT &amp; JANA
          </h3>

          <p className="font-serif text-lg text-beige italic max-w-md mx-auto">
            "We can't wait to share the beginning of our forever with you."
          </p>

          <FloralDivider className="py-2" />

          <p className="font-sans text-xs tracking-[0.25em] text-gold/70 uppercase">
            Friday, November 13, 2026 • La Rose @ Tiba Rose Hotel
          </p>

          <div className="pt-6 text-[11px] font-sans text-beige/40">
            Designed with love for Tharwat &amp; Jana's Wedding
          </div>
        </div>
      </footer>
    </div>
  );
}
