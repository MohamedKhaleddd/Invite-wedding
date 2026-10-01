import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LivingBackground from '../Background/LivingBackground';
import FloralDivider from '../UI/FloralDivider';
import { weddingData } from '../../config/weddingData';
import { Sparkles } from 'lucide-react';

export default function LandingPage({ onEnterInvitation }) {
  const containerRef = useRef(null);
  const groomRef = useRef(null);
  const brideRef = useRef(null);
  const ornamentRef = useRef(null);
  const titleGroupRef = useRef(null);
  const buttonRef = useRef(null);

  const [hasMet, setHasMet] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup: groom on left (-120px on mobile, -220px desktop), bride on right (+120px / +220px)
      const isMobile = window.innerWidth < 768;
      const startDistanceX = isMobile ? 80 : 180;

      gsap.set(groomRef.current, { x: -startDistanceX, opacity: 0, scale: 0.95 });
      gsap.set(brideRef.current, { x: startDistanceX, opacity: 0, scale: 0.95 });
      gsap.set(ornamentRef.current, { scale: 0, opacity: 0, rotate: -45 });
      gsap.set(titleGroupRef.current, { y: 30, opacity: 0 });
      gsap.set(buttonRef.current, { y: 20, opacity: 0, scale: 0.9 });

      // Master opening timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setHasMet(true);
        }
      });

      // 1. Fade in couple illustrations
      tl.to([groomRef.current, brideRef.current], {
        opacity: 1,
        duration: 1.4,
        stagger: 0.2
      })
      // 2. Convergence animation: Groom moves right, Bride moves left towards center
      .to(groomRef.current, {
        x: isMobile ? -15 : -35,
        scale: 1,
        duration: 2.5,
        ease: "power2.inOut"
      }, "+=0.3")
      .to(brideRef.current, {
        x: isMobile ? 15 : 35,
        scale: 1,
        duration: 2.5,
        ease: "power2.inOut"
      }, "<")
      // 3. Gold monogram ornament & glowing line reveal between them
      .to(ornamentRef.current, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=1.0")
      // 4. Reveal THARWAT & JANA names and date
      .to(titleGroupRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out"
      }, "-=0.4")
      // 5. Reveal ENTER INVITATION button
      .to(buttonRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "back.out(1.4)"
      }, "-=0.6");

      // Continuous subtle breathing movement for groom & bride
      gsap.to(groomRef.current, {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4
      });
      gsap.to(brideRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnterClick = () => {
    setIsLeaving(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onEnterInvitation();
      }
    });

    tl.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.2,
      boxShadow: "0 0 40px rgba(181, 154, 99, 0.9)"
    })
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "power2.inOut"
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex flex-col items-center justify-between py-10 px-4 overflow-hidden select-none transition-all duration-700 ${
        isLeaving ? 'pointer-events-none' : ''
      }`}
    >
      {/* Living animated background */}
      <LivingBackground intensity="high" />

      {/* Top Header Badge */}
      <div className="z-10 text-center pt-4">
        <span className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-dark-deeper/60 text-gold text-xs font-cinzel tracking-[0.3em] uppercase backdrop-blur-md shadow-md">
          Cinematic Wedding Experience
        </span>
      </div>

      {/* Main Center Stage: Illustrated Couple Convergence */}
      <div className="z-10 relative flex flex-col items-center justify-center w-full max-w-5xl my-auto py-4">
        
        {/* Illustrations Container */}
        <div className="relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[420px] max-w-3xl">
          
          {/* Groom Illustration (Left) */}
          <div
            ref={groomRef}
            className="absolute left-1/2 -ml-[230px] sm:-ml-[320px] w-[170px] sm:w-[260px] md:w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-gold/30 bg-dark/60 p-2 sm:p-3 transform transition-shadow duration-500 hover:shadow-gold/20"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src="/assets/images/groom.jpg"
                alt="Illustrated Groom Tharwat"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deeper/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-gold font-cinzel text-xs tracking-widest font-semibold">
                THARWAT
              </div>
            </div>
          </div>

          {/* Golden Center Meeting Monogram Ornament */}
          <div
            ref={ornamentRef}
            className="z-20 flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-dark-deeper/90 border-2 border-gold text-gold shadow-[0_0_40px_rgba(181,154,99,0.5)] backdrop-blur-xl"
          >
            <Sparkles className="w-5 h-5 text-gold animate-spin-slow mb-0.5 opacity-80" />
            <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-widest text-gold drop-shadow-md">
              T &amp; J
            </span>
            <span className="text-[9px] font-script text-beige tracking-wider">Forever</span>
          </div>

          {/* Bride Illustration (Right) */}
          <div
            ref={brideRef}
            className="absolute right-1/2 -mr-[230px] sm:-mr-[320px] w-[170px] sm:w-[260px] md:w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-gold/30 bg-dark/60 p-2 sm:p-3 transform transition-shadow duration-500 hover:shadow-gold/20"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src="/assets/images/bride.jpg"
                alt="Illustrated Bride Jana"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deeper/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 text-gold font-cinzel text-xs tracking-widest font-semibold">
                JANA
              </div>
            </div>
          </div>

        </div>

        {/* Title Group: Names & Date */}
        <div ref={titleGroupRef} className="text-center mt-6 sm:mt-10 px-4">
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-cream drop-shadow-lg">
            THARWAT <span className="font-script text-gold text-4xl sm:text-6xl font-normal mx-2">&amp;</span> JANA
          </h1>

          <FloralDivider className="my-2" />

          <p className="font-serif text-lg sm:text-2xl text-beige italic tracking-wider">
            {weddingData.event.dateDisplay}
          </p>
          <p className="text-xs sm:text-sm font-sans tracking-[0.25em] text-gold/90 uppercase mt-1">
            {weddingData.event.venue} — {weddingData.event.hotel}
          </p>
        </div>

        {/* Enter Invitation Action Button */}
        <div ref={buttonRef} className="mt-8 sm:mt-10">
          <button
            onClick={handleEnterClick}
            className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border-2 border-gold text-cream font-cinzel text-sm sm:text-base font-semibold tracking-[0.3em] uppercase overflow-hidden shadow-[0_0_30px_rgba(181,154,99,0.3)] hover:shadow-[0_0_50px_rgba(181,154,99,0.7)] transition-all duration-500 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>ENTER INVITATION</span>
              <Sparkles className="w-4 h-4 text-gold group-hover:rotate-45 transition-transform duration-500" />
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

      </div>

      {/* Footer Tagline */}
      <div className="z-10 text-center pb-2">
        <p className="font-script text-xl text-gold/80">
          "Together is our favorite place to be"
        </p>
      </div>
    </div>
  );
}
