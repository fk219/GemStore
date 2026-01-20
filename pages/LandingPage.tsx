
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

// Assuming GSAP and ScrollTrigger are loaded via script tag and available on window
declare const gsap: any;
declare const ScrollTrigger: any;

const LandingPage: React.FC = () => {
  const langCtx = useContext(LanguageContext);
  const themeCtx = useContext(ThemeContext);
  const [scrollY, setScrollY] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Standard scroll listener for other effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-text, .reveal-image, .story-line');
    elements.forEach((el) => observer.observe(el));

    // GSAP Horizontal Scroll
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const pin = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${sectionRef.current!.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        }
      );

      return () => {
        pin.kill();
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!langCtx || !themeCtx) return null;
  const { t } = langCtx;

  const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";
  const secondaryBgClass = "bg-zinc-100 dark:bg-zinc-900";
  const borderColorClass = "border-zinc-200 dark:border-zinc-800";

  const collectionItems = [
    {
      id: 1,
      name: "The Midnight Sapphire",
      origin: "Kashmir",
      weight: "4.2 ct",
      color: "bg-[#3B4D7A]",
      textColor: "text-white",
      badgeBorder: "border-white/20",
      subText: "text-white/60"
    },
    {
      id: 2,
      name: "The Solar Diamond",
      origin: "Botswana",
      weight: "2.1 ct",
      color: "bg-[#FFF2AC]",
      textColor: "text-[#1A1A1A]",
      badgeBorder: "border-black/10",
      subText: "text-black/40"
    },
    {
      id: 3,
      name: "The Royal Ruby",
      origin: "Burma",
      weight: "3.5 ct",
      color: "bg-[#8D444A]",
      textColor: "text-white",
      badgeBorder: "border-white/20",
      subText: "text-white/60"
    },
    {
      id: 4,
      name: "The Forest Emerald",
      origin: "Colombia",
      weight: "5.1 ct",
      color: "bg-[#3D6353]",
      textColor: "text-white",
      badgeBorder: "border-white/20",
      subText: "text-white/60"
    }
  ];

  return (
    <main className="w-full">
      <Hero />

      {/* Chapter 1: The Soul of Rarity */}
      <section className="relative min-h-screen py-48 px-6 md:px-24 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div 
            className="absolute top-1/4 right-10 w-96 h-96 border border-zinc-200 dark:border-zinc-800 rounded-full opacity-10" 
            style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
          />
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="reveal-image">
            <div className="relative aspect-[3/4] rounded-[60px] md:rounded-[120px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1573408302185-9127b542333e?auto=format&fit=crop&q=80&w=1200" 
                alt="Gemstone Core" 
                className="w-full h-full object-cover grayscale transition-transform duration-[3s] group-hover:scale-105"
                style={{ transform: `translateY(${scrollY * -0.05}px)` }}
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
            <div className={`mt-12 flex items-center gap-6 opacity-30 ${textColorClass}`}>
               <div className="w-20 h-[1px] bg-current" />
               <span className="text-[10px] tracking-[0.4em] uppercase">I. The Core</span>
            </div>
          </div>

          <div className={`max-w-xl ${textColorClass}`}>
            <h2 className="text-4xl md:text-7xl font-light serif mb-12 leading-[1.1] reveal-text">
              {t.aboutBrand}
            </h2>
            <div className="w-24 h-[1px] bg-zinc-300 dark:bg-zinc-700 mb-12 story-line scale-x-0 origin-left transition-transform duration-1000 delay-500 [&.active]:scale-x-100" />
            <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic reveal-text transition-delay-300">
              {t.aboutSub}
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling Section: The Private Collection (GSAP Powered) */}
      <section ref={triggerRef} className="overflow-hidden">
        <div 
          ref={sectionRef} 
          className="flex h-screen items-center px-6 md:px-24 gap-24 flex-nowrap"
          style={{ width: 'max-content' }}
        >
          {/* Section Introduction Card */}
          <div className={`w-[85vw] md:w-[600px] flex-shrink-0 ${textColorClass}`}>
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 block mb-8">Selected Pieces</span>
            <h2 className="text-5xl md:text-8xl font-light serif mb-12">The Private Collection</h2>
            <p className="text-lg md:text-xl font-light opacity-60 leading-relaxed italic max-w-md">
              A rotating selection of our most exceptional acquisitions. Available exclusively for private viewing.
            </p>
            <div className="mt-20 w-32 h-[1px] bg-current opacity-20" />
          </div>

          {/* Collection Items */}
          {collectionItems.map((item, i) => (
            <div 
              key={item.id} 
              className={`flex-shrink-0 w-[80vw] md:w-[500px] aspect-square rounded-[40px] md:rounded-[60px] ${item.color} ${item.textColor} p-8 md:p-14 flex flex-col justify-between shadow-2xl transition-all duration-700 hover:scale-[1.03] group`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] tracking-[0.4em] uppercase border ${item.badgeBorder} rounded-full px-5 py-2 backdrop-blur-sm transition-all duration-500 group-hover:px-8`}>
                  {item.origin}
                </span>
                <span className="text-sm tracking-widest font-light opacity-80 italic transition-transform duration-500 group-hover:translate-x-2">{item.weight}</span>
              </div>
              
              <div className="relative group/card overflow-hidden">
                <div className="h-px w-full bg-current opacity-0 group-hover:opacity-10 mb-8 transition-opacity duration-700" />
                <h3 className="text-3xl md:text-5xl serif mb-4 leading-tight transition-transform duration-700 group-hover:-translate-y-2">{item.name}</h3>
                <p className={`text-[10px] tracking-[0.6em] uppercase transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:tracking-[0.8em] ${item.subText}`}>Inquire for price</p>
              </div>
            </div>
          ))}

          {/* Closing Card / Call to Action Transition */}
          <div className={`w-[60vw] md:w-[500px] flex-shrink-0 flex flex-col items-center justify-center text-center px-12 ${textColorClass}`}>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8">End of Current Archive</p>
            <h3 className="text-3xl md:text-4xl serif italic mb-12 opacity-80 leading-relaxed">Each piece is a single iteration of nature’s patience.</h3>
            <div className="w-16 h-[1px] bg-current opacity-20" />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Art of Refraction (The Lens) */}
      <section className="min-h-screen py-32 bg-[#141414] text-[#FBFBF9] rounded-[80px] md:rounded-[160px] mx-4 my-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.05" opacity="0.5" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] tracking-[0.8em] uppercase mb-16 opacity-30 reveal-text">The Journey of Light</span>
            
            <div className="relative mb-24 reveal-image">
               <div className="absolute -inset-10 bg-white/5 blur-[80px] rounded-full animate-pulse" />
               <h2 className="text-6xl md:text-[10rem] font-light serif leading-none reveal-text transition-delay-200">
                Refined
               </h2>
               <h2 className="text-6xl md:text-[10rem] font-light serif leading-none italic mt-4 reveal-text transition-delay-400">
                Patience
               </h2>
            </div>

            <p className="text-2xl md:text-4xl font-light opacity-80 max-w-4xl leading-relaxed serif italic reveal-text transition-delay-600">
              "{t.craftsmanshipSub}"
            </p>
            
            <div className="mt-24 grid md:grid-cols-3 gap-12 w-full max-w-5xl">
              {[
                { title: "Selection", desc: "One in a million." },
                { title: "Mastery", desc: "Centuries of lineage." },
                { title: "Vision", desc: "Designed for the eternal." }
              ].map((item, i) => (
                <div key={i} className="reveal-text" style={{ transitionDelay: `${0.8 + i * 0.2}s` }}>
                  <h3 className="text-xs tracking-[0.4em] uppercase opacity-40 mb-4">{item.title}</h3>
                  <p className="text-xl serif italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Curated Gallery - Abstract Bento Grid */}
      <section className="py-48 px-6 md:px-24">
        <div className={`flex flex-col md:flex-row justify-between items-baseline mb-32 border-b ${borderColorClass} pb-16 ${textColorClass}`}>
          <div className="reveal-text">
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 block mb-6">Contemporary Archive</span>
            <h2 className="text-5xl md:text-8xl font-light serif">{t.collectionsTitle}</h2>
          </div>
          <div className="max-w-xs mt-12 md:mt-0 reveal-text transition-delay-300">
             <p className="text-sm tracking-[0.1em] leading-relaxed opacity-60 italic">{t.collectionsSub}</p>
          </div>
        </div>

        {/* Abstract Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] md:auto-rows-[350px] gap-6 md:gap-8">
          
          {/* Main Large Piece - High Contrast Overlay */}
          <div className="md:col-span-8 md:row-span-2 reveal-image group">
            <div className={`relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden ${secondaryBgClass}`}>
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover transition-all duration-[3s] group-hover:scale-105" 
                alt="Sapphire Deep" 
              />
              {/* Refined gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-1000" />
              <div className="absolute bottom-12 left-12 text-white">
                 <p className="text-[10px] tracking-[0.5em] uppercase mb-4 opacity-90 font-medium">Archive 01</p>
                 <h3 className="text-4xl md:text-5xl serif italic drop-shadow-sm">The Azure Monolith</h3>
              </div>
            </div>
          </div>

          {/* Tall Craftsmanship Piece - Grayscale with High Contrast Text */}
          <div className="md:col-span-4 md:row-span-3 reveal-image transition-delay-200 group">
            <div className={`relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden ${secondaryBgClass}`}>
              <img 
                src="https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover grayscale transition-all duration-[3s] group-hover:scale-110" 
                alt="Prism Study" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className="absolute bottom-12 left-12 text-white">
                 <p className="text-[10px] tracking-[0.5em] uppercase mb-4 opacity-90 font-medium">Process</p>
                 <h3 className="text-3xl md:text-4xl serif italic drop-shadow-sm">Linear Mastery</h3>
              </div>
            </div>
          </div>

          {/* Philosophical Statement (Bento Text Block) - Maximum Readability */}
          <div className="md:col-span-4 md:row-span-1 reveal-text transition-delay-400">
            <div className={`h-full w-full rounded-[40px] md:rounded-[60px] p-10 md:p-14 border ${borderColorClass} bg-zinc-50 dark:bg-zinc-900 flex flex-col justify-center ${textColorClass} shadow-sm`}>
              <p className="text-xl md:text-2xl font-light italic leading-relaxed serif">
                "Not designed to impress — designed to endure for the generations yet to come."
              </p>
              <div className="mt-8 w-12 h-px bg-current opacity-30" />
            </div>
          </div>

          {/* Medium Landscape Piece - Balanced Contrast */}
          <div className="md:col-span-4 md:row-span-2 reveal-image transition-delay-300 group">
            <div className={`relative h-full w-full rounded-[40px] md:rounded-[80px] overflow-hidden ${secondaryBgClass}`}>
              <img 
                src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover transition-all duration-[3s] group-hover:rotate-1 group-hover:scale-105" 
                alt="Facet Focus" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-1000" />
              <div className="absolute top-10 left-10 text-white">
                 <p className="text-[10px] tracking-[0.5em] uppercase opacity-90 font-medium">Focus</p>
              </div>
              <div className="absolute bottom-10 left-10 text-white">
                 <h3 className="text-3xl md:text-4xl serif italic drop-shadow-sm">Inner Fire</h3>
              </div>
            </div>
          </div>

          {/* Small Abstract Detail - Visual Texture */}
          <div className="md:col-span-4 md:row-span-1 reveal-image transition-delay-500 group">
            <div className={`relative h-full w-full rounded-[40px] md:rounded-[60px] overflow-hidden bg-zinc-800 dark:bg-zinc-950`}>
              <img 
                src="https://images.unsplash.com/photo-1588444839799-eb00f79cd96a?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover opacity-50 transition-all duration-[4s] group-hover:scale-125 group-hover:rotate-6" 
                alt="Abstract Texture" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 border border-white/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                 <span className="sr-only">Abstract Texture Detail</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 4: The Epilogue */}
      <section className="py-48 flex flex-col items-center justify-center text-center px-6">
         <div className={`reveal-text ${textColorClass}`}>
            <div className="w-px h-32 bg-zinc-200 dark:bg-zinc-800 mb-16 mx-auto" />
            <p className="text-sm tracking-[0.6em] uppercase opacity-40 mb-12">A Legacy Unfolding</p>
            <h2 className="text-4xl md:text-7xl font-light serif max-w-4xl mx-auto leading-tight italic">
              "True beauty is a quiet dialogue between nature and the eye."
            </h2>
         </div>
      </section>

      <Footer />
    </main>
  );
};

export default LandingPage;
