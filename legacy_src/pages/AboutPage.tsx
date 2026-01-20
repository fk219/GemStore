
import React from 'react';
import LegacyHero from '../components/LegacyHero';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <main className="w-full">
      <LegacyHero />
      <section className="py-48 px-6 md:px-24 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-light serif max-w-3xl mb-12">Built on three centuries of silence.</h2>
        <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic max-w-2xl">
          We do not speak of value in terms of numbers, but in terms of the light that remains when the room grows dark.
        </p>
      </section>
      <Footer />
    </main>
  );
};

export default AboutPage;
