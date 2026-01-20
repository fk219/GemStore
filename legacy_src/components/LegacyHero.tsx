
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../App';

const LegacyHero: React.FC = () => {
  const langCtx = useContext(LanguageContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!langCtx) return null;
  const { t } = langCtx;

  const textColorClass = "text-[#1A1A1A] dark:text-[#FBFBF9]";

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#FBFBF9] dark:bg-[#0F0F0F] transition-colors duration-1000">
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-[140px] transition-all duration-[4000ms] ${mounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
        <div className={`absolute top-[20%] left-[15%] w-32 h-32 border border-black/5 dark:border-white/5 rotate-45 transition-all duration-[3000ms] delay-500 ${mounted ? 'translate-y-0 opacity-20' : 'translate-y-20 opacity-0'}`} />
        <div className={`absolute bottom-[25%] right-[10%] w-64 h-64 border border-black/5 dark:border-white/5 -rotate-12 transition-all duration-[3500ms] delay-700 ${mounted ? 'translate-y-0 opacity-10' : 'translate-y-40 opacity-0'}`} />
      </div>

      <div className={`relative z-10 text-center px-6 max-w-5xl ${textColorClass}`}>
        <div className="overflow-hidden mb-8">
           <p className={`text-[10px] tracking-[0.6em] uppercase opacity-40 transition-all duration-1000 ${mounted ? 'translate-y-0' : 'translate-y-full'}`}>
            The House of Rarity
          </p>
        </div>
        
        <h1 className="text-6xl md:text-[9rem] font-light serif leading-[0.85] tracking-tight mb-16 whitespace-pre-line">
          {t.heroTitle.split('\n').map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span className={`inline-block transition-all duration-[1.5s] ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionDelay: `${0.5 + i * 0.2}s` }}>
                {line}
              </span>
            </div>
          ))}
        </h1>
        
        <div className="overflow-hidden">
          <p className={`text-lg md:text-xl tracking-[0.3em] uppercase opacity-60 font-light transition-all duration-[1.5s] delay-[1.2s] ${mounted ? 'translate-y-0' : 'translate-y-full'}`}>
            {t.heroSub}
          </p>
        </div>
      </div>
      
      <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 transition-all duration-1000 delay-[1.5s] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-[1px] h-20 bg-black/10 dark:bg-white/10 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-full bg-[#1A1A1A] dark:bg-[#FBFBF9] animate-[scrollLine_2.5s_infinite_cubic-bezier(0.4,0,0.2,1)]`} />
        </div>
        <span className={`text-[9px] tracking-[0.8em] uppercase opacity-30 ${textColorClass}`}>Heritage</span>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default LegacyHero;
