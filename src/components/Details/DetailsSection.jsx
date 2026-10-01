import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldBorder from '../UI/GoldBorder';
import FloralDivider from '../UI/FloralDivider';
import { weddingData } from '../../config/weddingData';
import { translations } from '../../config/translations';
import { Calendar, MapPin, Navigation, Compass, ExternalLink, Shirt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DetailsSection({ language }) {
  const sectionRef = useRef(null);
  const copy = translations[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.detail-card');
      const banner = sectionRef.current.querySelector('.detail-banner');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        banner,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: banner,
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section dir={language === 'ar' ? 'rtl' : 'ltr'} id="details" ref={sectionRef} className={`relative py-24 px-4 bg-transparent overflow-hidden ${language === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* Decorative leaf background element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,rgba(181,154,99,0.3),transparent_60%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-cinzel text-xs tracking-[0.3em] uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>{copy.celebration}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-cream tracking-wider">
            {copy.weddingDetails}
          </h2>
          <FloralDivider />
          <p className="font-serif text-lg text-beige italic">
            {copy.detailsIntro}
          </p>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          
          {/* Card 1: Date & Time */}
          <div className="detail-card">
            <GoldBorder className="text-center flex flex-col items-center justify-center p-8 sm:p-10 hover:border-gold/60 transition-colors bg-dark/60 backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mb-4">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-gold uppercase tracking-wider mb-2">
                {copy.when}
              </h3>
              <p className="font-serif text-2xl text-cream font-semibold">
                {copy.shortDate}
              </p>
              <p className="text-sm text-beige/80 mt-2 font-light">
                {copy.doorsOpen}
              </p>
            </GoldBorder>
          </div>

          {/* Card 2: Venue Location */}
          <div className="detail-card">
            <GoldBorder className="text-center flex flex-col items-center justify-center p-8 sm:p-10 border-gold/50 bg-dark-deeper/70 hover:border-gold transition-colors backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-gold uppercase tracking-wider mb-2">
                {copy.where}
              </h3>
              <p className="font-serif text-2xl text-cream font-semibold">
                {weddingData.event.venue}
              </p>
              <p className="text-base font-sans text-beige/90 mt-1 font-medium">
                {weddingData.event.hotel}
              </p>
              <p className="text-xs text-beige/60 mt-1">
                {copy.address}
              </p>
            </GoldBorder>
          </div>

          {/* Card 3: Dress Code */}
          <div className="detail-card">
            <GoldBorder className="text-center flex flex-col items-center justify-center p-8 sm:p-10 border-gold/50 bg-dark-deeper/70 hover:border-gold transition-colors backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mb-4">
                <Shirt className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-gold uppercase tracking-wider mb-2">
                {copy.dressCode}
              </h3>
              <p className="font-serif text-2xl text-cream font-semibold">
                {language === 'ar' ? 'أخضر زيتوني، بيج وبني' : weddingData.event.dressCode}
              </p>
              <div className="flex items-center gap-3 mt-4" aria-label={copy.dressCodeColors}>
                <span className="w-7 h-7 rounded-full border border-cream/40 bg-[#596348]" />
                <span className="w-7 h-7 rounded-full border border-cream/40 bg-[#E8DDCA]" />
                <span className="w-7 h-7 rounded-full border border-cream/40 bg-[#795548]" />
              </div>
            </GoldBorder>
          </div>

        </div>

        {/* Google Maps Callout Box */}
        <div className="detail-banner relative rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-olive-deep/80 via-dark-deeper/90 to-olive-darker/80 border border-gold/40 text-center shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-cream">
              {copy.findVenue}
            </h3>
            <p className="font-sans text-sm text-beige/90 leading-relaxed">
              {copy.directionsDescription}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href={weddingData.event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-dark font-cinzel text-sm font-bold tracking-[0.25em] uppercase hover:shadow-[0_0_40px_rgba(181,154,99,0.6)] transition-all duration-300 transform active:scale-95"
              >
                <Navigation className="w-5 h-5 fill-dark" />
                <span>{copy.getDirections}</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
