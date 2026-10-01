import React, { useState, useEffect } from 'react';
import { weddingData } from '../../config/weddingData';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(weddingData.event.isoDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-6">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          <div className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[95px] py-3 sm:py-4 px-3 rounded-lg bg-dark-deeper/70 border border-gold/30 backdrop-blur-md shadow-xl">
            <span className="font-cinzel text-2xl sm:text-4xl font-bold text-gold drop-shadow-sm">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.25em] text-beige uppercase mt-1">
              {item.label}
            </span>
          </div>

          {index < items.length - 1 && (
            <span className="font-serif text-2xl text-gold/50 ml-3 sm:ml-6 hidden xs:inline-block">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
