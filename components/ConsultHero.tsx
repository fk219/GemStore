
import React, { useEffect, useState } from 'react';

const ConsultHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#FBFBF9] dark:bg-[#0A0A0B] transition-colors duration-1000">
      <div className="absolute inset-0 pointer-events-none">
        {/* Abstract Light Beams */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent transition-all duration-[3s] ${mounted ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />
        <div className={`absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent transition-all duration-[3s] delay-500 ${mounted ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
        
        {/* Floating Ethereal Spheres */}
        <div className={`absolute top-1/3 right-1/4 w-64 h-64 border border-zinc-100 dark:border-zinc-900 rounded-full blur-2xl transition-all duration-[4s] delay-700 ${mounted ? 'opacity-40 scale-100' : 'opacity-0 scale-50'}`} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="overflow-hidden mb-6">
          <p className={`text-[9px] tracking-[1em] uppercase opacity-30 transition-all duration-1000 ${mounted ? 'translate-y-0' : 'translate-y-full'}`}>
            Secure & Discrete
          </p>
        </div>
        
        <h1 className="text-6xl md:text-[8rem] font-light serif leading-[0.9] tracking-tight mb-12">
          <div className="overflow-hidden">
            <span className={`inline-block transition-all duration-[1.5s] ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: '0.4s' }}>
              A Private
            </span>
          </div>
          <div className="overflow-hidden">
            <span className={`inline-block italic transition-all duration-[1.5s] ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
              Conversation
            </span>
          </div>
        </h1>

        <div className="flex justify-center">
          <div className={`w-24 h-px bg-zinc-200 dark:bg-zinc-800 transition-all duration-[2s] delay-1000 ${mounted ? 'w-32 opacity-100' : 'w-0 opacity-0'}`} />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-current animate-[scrollLine_3s_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default ConsultHero;
