
import React from 'react';
import HeritageHero from '../components/HeritageHero';
import Footer from '../components/Footer';

const LegacyPage: React.FC = () => {
  return (
    <main className="w-full">
      <HeritageHero />
      <section className="py-64 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-[100px] overflow-hidden grayscale">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200" 
                  alt="Heritage Workshop" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-1000"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#0F0F0F] rounded-full flex items-center justify-center p-8 text-center border border-white/5">
                <span className="text-[9px] tracking-[0.6em] uppercase text-white/40">Since 1792</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-12">
              <h2 className="text-4xl md:text-6xl font-light serif leading-tight">A journey through geological time.</h2>
              <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic">
                Our archives hold records of stones that have passed through royal houses, whispered through revolutions, and settled into the quiet hands of collectors who understand that we are but temporary guardians of nature’s endurance.
              </p>
              <div className="w-24 h-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-30 mb-4">Integrity</h3>
                  <p className="text-sm">Verified lineage for every single facet.</p>
                </div>
                <div>
                  <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-30 mb-4">Discretion</h3>
                  <p className="text-sm">Confidential stewardship across generations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LegacyPage;
