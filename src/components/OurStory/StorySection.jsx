import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldBorder from '../UI/GoldBorder';
import FloralDivider from '../UI/FloralDivider';
import { weddingData } from '../../config/weddingData';
import { BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const storyBlocks = sectionRef.current.querySelectorAll('.story-block');

      storyBlocks.forEach((block) => {
        const img = block.querySelector('.story-img');
        const text = block.querySelector('.story-text');

        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%'
            }
          }
        );

        gsap.fromTo(
          text.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative py-24 px-4 bg-transparent overflow-hidden">
      
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-olive/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-cinzel text-xs tracking-[0.3em] uppercase mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Our Journey</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-cream tracking-wider">
            OUR LOVE STORY
          </h2>
          <FloralDivider />
          <p className="font-serif text-lg text-beige italic">
            "{weddingData.couple.quote}"
          </p>
        </div>

        {/* Story Chapters List */}
        <div className="space-y-20 sm:space-y-28">
          {weddingData.story.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={chapter.id}
                className={`story-block flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-10 lg:gap-16`}
              >
                {/* Photo Feature with Gold Frame */}
                <div className="story-img w-full lg:w-1/2">
                  <GoldBorder className="overflow-hidden group bg-dark/60 backdrop-blur-md">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: chapter.imagePosition || 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-deeper/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-4 py-1 rounded-full bg-dark-deeper/80 border border-gold/40 text-gold font-cinzel text-xs">
                        {chapter.date}
                      </div>
                    </div>
                  </GoldBorder>
                </div>

                {/* Content Block */}
                <div className="story-text w-full lg:w-1/2 space-y-4 text-center lg:text-left px-2">
                  <span className="text-xs font-cinzel tracking-[0.3em] text-gold uppercase">
                    Chapter 0{index + 1}
                  </span>
                  
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-semibold text-cream">
                    {chapter.title}
                  </h3>
                  
                  <p className="font-script text-2xl text-gold/90">
                    {chapter.subtitle}
                  </p>
                  
                  <p className="font-sans text-sm sm:text-base text-beige/90 leading-relaxed font-light">
                    {chapter.description}
                  </p>

                  <blockquote className="p-4 rounded-lg bg-dark-deeper/70 border-l-2 border-gold font-serif italic text-beige text-base sm:text-lg my-4 backdrop-blur-md">
                    "{chapter.quote}"
                  </blockquote>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
