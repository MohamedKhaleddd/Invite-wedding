import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../UI/FloralDivider';
import Countdown from '../UI/Countdown';
import { weddingData } from '../../config/weddingData';
import { translations } from '../../config/translations';
import { Calendar, Clock, MapPin, ChevronDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ language }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgImgRef = useRef(null);
  const copy = translations[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for Hero elements
      gsap.from(contentRef.current.children, {
        y: 35,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Subtle parallax effect on scroll
      gsap.to(bgImgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section dir={language === 'ar' ? 'rtl' : 'ltr'} ref={heroRef} id="home" className={`relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden ${language === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* Background Image with Cinematic Luxury Grading */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src="/assets/images/couple.jpg"
          alt="Tharwat and Jana"
          className="w-full h-full object-cover object-[center_20%] scale-110 transform"
        />

        {/* Translucent Color Grading Overlays that let LivingBackground glow through */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deeper/90 via-dark/60 to-dark-deeper/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(89,99,72,0.2)_0%,rgba(20,23,18,0.75)_100%)]" />
        <div className="absolute inset-0 vignette-overlay opacity-80" />
        <div className="absolute inset-0 grain-overlay opacity-30 mix-blend-overlay" />
      </div>

      {/* Hero Content Box */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto text-center px-4">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-dark-deeper/80 border border-gold/40 text-gold text-xs font-cinzel tracking-[0.3em] uppercase backdrop-blur-md mb-6 shadow-2xl animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{copy.heroTagline}</span>
        </div>

        {/* Main Names */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest text-cream drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          THARWAT <span className="font-script text-gold text-5xl sm:text-7xl md:text-8xl font-normal mx-2 inline-block">&amp;</span> JANA
        </h1>

        <FloralDivider />

        {/* Date & Time Key Details */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 my-4 text-beige font-serif text-lg sm:text-2xl">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" />
            <span>{copy.date}</span>
          </div>
          <div className="hidden sm:block text-gold/40">•</div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            <span>{copy.time}</span>
          </div>
        </div>

        {/* Venue Badge */}
        <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-sans tracking-[0.2em] text-gold uppercase mt-2">
          <MapPin className="w-4 h-4 text-gold" />
          <span>{weddingData.event.venue} — {weddingData.event.hotel}</span>
        </div>

        {/* Live Countdown Timer */}
        <div className="mt-8">
          <p className="text-xs font-cinzel tracking-[0.3em] text-gold/80 uppercase mb-2">{copy.countdownTitle}</p>
          <Countdown language={language} />
        </div>

        {/* Direct Navigation Quick Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#details"
            className="px-8 py-3.5 rounded-full bg-gold text-dark font-cinzel text-xs font-bold tracking-[0.25em] uppercase hover:bg-gold-light transition-all duration-300 shadow-xl"
          >
            {copy.eventDetails}
          </a>
          <a
            href={weddingData.event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-dark-deeper/80 border border-gold/50 text-beige font-cinzel text-xs font-semibold tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-md"
          >
            {copy.getDirections}
          </a>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#story"
        aria-label={copy.scroll}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gold/70 hover:text-gold transition-colors animate-bounce"
      >
        <span className="text-[10px] font-cinzel tracking-widest uppercase mb-1">{copy.scroll}</span>
        <ChevronDown className="w-5 h-5" />
      </a>

    </section>
  );
}
