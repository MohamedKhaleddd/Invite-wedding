import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../UI/FloralDivider';
import { weddingData } from '../../config/weddingData';
import { translations } from '../../config/translations';
import { Sparkles, Crown, Heart, Utensils, Music, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection({ language }) {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const copy = translations[language];

  const iconMap = {
    Sparkles: Sparkles,
    Crown: Crown,
    Heart: Heart,
    Utensils: Utensils,
    Music: Music
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.timeline-item');

      // Animate vertical golden line growth on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      items.forEach((item) => {
        const node = item.querySelector('.timeline-node');
        const card = item.querySelector('.timeline-card');

        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );

        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section dir={language === 'ar' ? 'rtl' : 'ltr'} id="timeline" ref={sectionRef} className={`relative py-24 px-4 bg-transparent overflow-hidden ${language === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-olive/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-cinzel text-xs tracking-[0.3em] uppercase mb-2">
            <Clock className="w-4 h-4" />
            <span>{copy.scheduleLabel}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-cream tracking-wider">
            {copy.timelineTitle}
          </h2>
          <FloralDivider />
          <p className="font-serif text-lg text-beige italic">
            {copy.timelineIntro}
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className={`relative ${language === 'ar' ? 'pr-6 sm:pr-0' : 'pl-6 sm:pl-0'}`}>
          
          {/* Vertical Golden Progress Line */}
          <div
            ref={lineRef}
            className={`absolute ${language === 'ar' ? 'right-6 translate-x-1/2' : 'left-6 -translate-x-1/2'} sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/20 via-gold to-gold/20 sm:-translate-x-1/2 origin-top`}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {weddingData.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = iconMap[item.icon] || Sparkles;

              return (
                <div
                  key={item.time}
                  className={`timeline-item relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Center Node Badge */}
                  <div className={`timeline-node absolute ${language === 'ar' ? 'right-0 translate-x-1/2 sm:left-1/2 sm:right-auto' : 'left-6 -translate-x-1/2 sm:left-1/2'} sm:-translate-x-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-dark-deeper border-2 border-gold text-gold shadow-[0_0_20px_rgba(181,154,99,0.5)]`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:w-[calc(50%-40px)] ${language === 'ar' ? (isEven ? 'sm:text-left sm:pl-8' : 'sm:pr-8') : (isEven ? 'sm:text-right sm:pr-8' : 'sm:pl-8')} ${language === 'ar' ? 'pr-16 sm:pr-0' : 'pl-16 sm:pl-0'}`}>
                    <div className="timeline-card p-6 rounded-xl bg-dark/60 border border-gold/30 backdrop-blur-md shadow-xl hover:border-gold/60 transition-all duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold font-cinzel text-xs font-bold tracking-widest mb-2">
                        {item.time}
                      </span>
                      <h3 className="font-cinzel text-xl font-bold text-cream mb-2">
                        {copy.timeline[index].title}
                      </h3>
                      <p className="font-sans text-sm text-beige/80 leading-relaxed font-light">
                        {copy.timeline[index].description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
