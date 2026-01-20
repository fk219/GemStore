
import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href="https://wa.me/yournumber" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[100] group"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping group-hover:animate-none" />
        <div className="relative bg-white dark:bg-zinc-800 p-4 rounded-full shadow-2xl border border-zinc-200 dark:border-zinc-700 transition-transform group-hover:scale-110">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.408 2.445 1.103 3.407l-.466 2.087 2.139-.444c.917.513 1.975.807 3.091.807 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.161c-.131.365-.656.666-1.058.748-.282.058-.646.088-1.034-.088-.242-.111-.54-.251-.912-.412-1.583-.687-2.592-2.302-2.671-2.407-.079-.104-.646-.861-.646-1.643 0-.782.408-1.166.554-1.321.146-.155.32-.194.426-.194h.346c.109 0 .253-.041.396.297l.554 1.342c.041.111.082.242.012.383-.07.141-.111.231-.22.36-.111.13-.231.282-.331.378-.111.111-.231.231-.1.45.13.211.583.963 1.252 1.56.861.767 1.583.998 1.804 1.11.22.111.35.093.48-.058s.554-.646.702-.861c.147-.211.296-.184.496-.111l1.583.748c.2.093.332.141.385.231.053.088.053.513-.078.878z" />
          </svg>
        </div>
        <div className="absolute right-full mr-4 bg-white dark:bg-zinc-800 text-xs tracking-widest uppercase py-2 px-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-100 dark:border-zinc-700">
          Speak Privately
        </div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
