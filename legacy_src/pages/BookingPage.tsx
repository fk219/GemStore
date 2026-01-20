
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import Footer from '../components/Footer';
import ConsultHero from '../components/ConsultHero';

const BookingPage: React.FC = () => {
  const langCtx = useContext(LanguageContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Private Viewing',
    message: ''
  });

  if (!langCtx) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <main className="w-full bg-[#FBFBF9] dark:bg-[#0F0F0F]">
      <ConsultHero />
      
      <section className="pb-40 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-start">
          <div className="w-full md:w-1/2 sticky top-40">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 block mb-8">Consultation</span>
            <h2 className="text-4xl md:text-7xl font-light serif mb-12 leading-tight">
              Begin your journey.
            </h2>
            <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic mb-12 max-w-md">
              All meetings are handled with complete discretion and personal attention.
            </p>
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden grayscale opacity-80 mb-12 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" alt="Private Lounge" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full md:w-1/2 pt-12 md:pt-0">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900/30 p-8 md:p-16 rounded-[60px] border border-zinc-100 dark:border-zinc-800 shadow-xl backdrop-blur-sm">
                <div className="space-y-12">
                  <div className="group border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-all focus-within:border-black dark:focus-within:border-white">
                    <label className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Name / Identity</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your full name"
                      className="w-full bg-transparent outline-none text-xl md:text-2xl font-light serif italic placeholder:opacity-20"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="group border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-all focus-within:border-black dark:focus-within:border-white">
                    <label className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Electronic Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-transparent outline-none text-xl md:text-2xl font-light serif italic placeholder:opacity-20"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="group border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-all focus-within:border-black dark:focus-within:border-white">
                    <label className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Intention</label>
                    <select 
                      className="w-full bg-transparent outline-none text-xl md:text-2xl font-light serif italic appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    >
                      <option className="bg-[#FBFBF9] dark:bg-[#0F0F0F]">Private Viewing</option>
                      <option className="bg-[#FBFBF9] dark:bg-[#0F0F0F]">Bespoke Commission</option>
                      <option className="bg-[#FBFBF9] dark:bg-[#0F0F0F]">Gemological Inquiry</option>
                    </select>
                  </div>
                  <div className="group border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-all focus-within:border-black dark:focus-within:border-white">
                    <label className="block text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">Personal Message</label>
                    <textarea 
                      placeholder="Share your vision or specific requirements..."
                      rows={4}
                      className="w-full bg-transparent outline-none text-xl md:text-2xl font-light serif italic resize-none placeholder:opacity-20"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-7 rounded-full bg-[#1A1A1A] dark:bg-[#FBFBF9] text-[#FBFBF9] dark:text-[#1A1A1A] text-[10px] tracking-[0.5em] uppercase hover:scale-[1.02] transition-all duration-500 shadow-lg"
                  >
                    Confirm Request
                  </button>
                  <p className="text-[9px] text-center tracking-[0.2em] uppercase opacity-30 italic">All meetings are handled with complete discretion.</p>
                </div>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-24 bg-white dark:bg-zinc-900/50 rounded-[60px] border border-zinc-100 dark:border-zinc-800 shadow-xl px-12 backdrop-blur-sm">
                <div className="w-24 h-24 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-12">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b5a16d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-light serif mb-8 italic">Your intention has been received.</h2>
                <p className="text-lg opacity-60 leading-relaxed max-w-sm mb-12">
                  A representative will reach out to you through secure channels within 24 hours.
                </p>
                <button 
                  onClick={() => setStep(1)}
                  className="px-12 py-5 rounded-full border border-black dark:border-white text-[9px] tracking-[0.5em] uppercase hover:opacity-50 transition-all"
                >
                  Return
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BookingPage;
