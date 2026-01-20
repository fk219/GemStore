
import React, { useEffect, useState } from 'react';

const HeritageHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F0F0F] text-[#FBFBF9]">
      {/* Deep Geological Textures */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-10 md:px-24">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="flex flex-col">
            <div className="overflow-hidden mb-8">
               <span className={`text-[10px] tracking-[1.2em] uppercase opacity-30 block transition-all duration-1000 ${mounted ? 'translate-x-0 opacity-30' : '-translate-x-20 opacity-0'}`}>
                Origins & Lineage
               </span>
            </div>
            <h1 className="text-[12vw] md:text-[10vw] font-light serif leading-[0.8] tracking-tighter uppercase">
              <div className="overflow-hidden">
                <span className={`inline-block transition-all duration-[1.8s] ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
                  Eternal
                </span>
              </div>
              <div className="overflow-hidden">
                <span className={`inline-block italic transition-all duration-[1.8s] ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: '0.4s' }}>
                  Echoes
                </span>
              </div>
            </h1>
          </div>

          <div className={`max-w-xs transition-all duration-[2s] delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-[11px] tracking-[0.4em] uppercase opacity-40 leading-relaxed mb-8">
              Three centuries of stewardship over the world's most silent treasures.
            </p>
            <div className="w-16 h-px bg-white/20" />
          </div>
        </div>
      </div>

      {/* Decorative Structural Border */}
      <div className={`absolute inset-12 border border-white/5 pointer-events-none transition-all duration-[3s] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
    </section>
  );
};

export default HeritageHero;
