import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { weddingData } from '../../config/weddingData';
import { translations } from '../../config/translations';

export default function Navbar({ activeSection, language, onToggleLanguage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copy = translations[language];
  const navLinks = copy.nav.map((label, index) => ({
    label,
    href: ['#home', '#story', '#details', '#timeline'][index]
  }));

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-deeper/90 backdrop-blur-md border-b border-gold/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-dark-deeper/70 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Monogram Brand Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full border border-gold/60 flex items-center justify-center bg-dark/60 text-gold font-cinzel text-sm font-semibold group-hover:border-gold transition-colors">
            T&amp;J
          </div>
          <span dir="ltr" className="font-cinzel text-sm tracking-[0.2em] text-cream font-semibold group-hover:text-gold transition-colors hidden sm:inline-block">
            THARWAT &amp; JANA
          </span>
        </a>

        <button
          onClick={onToggleLanguage}
          aria-label={copy.languageLabel}
          className="rounded-full border border-gold/40 px-3 py-2 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
        >
          {copy.languageName}
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-xs font-cinzel tracking-[0.25em] text-beige uppercase hover:text-gold transition-colors py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-beige hover:text-gold p-2 rounded-lg border border-gold/20 bg-dark/50"
          aria-label={copy.menuLabel}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark-deeper/95 backdrop-blur-2xl border-b border-gold/30 px-6 py-8 flex flex-col items-center gap-6 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-cinzel text-sm tracking-[0.3em] text-cream uppercase hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="w-16 h-[1px] bg-gold/40 my-2" />
          <p className="font-serif text-xs italic text-gold/80">
            {copy.mobileDate}
          </p>
        </div>
      )}
    </header>
  );
}
