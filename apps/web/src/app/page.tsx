import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-brand-bg">
      <div className="max-w-2xl p-8 bg-brand-surface border-[3px] border-brand-dark rounded-none shadow-brutal neo-hover-translate">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold uppercase tracking-wider bg-brand-secondary border-[3px] border-brand-dark -rotate-2">
          Work In Progress
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-brand-dark mb-4 leading-none">
          The Software Guys
        </h1>
        <p className="text-lg md:text-xl font-medium text-brand-darkAlt mb-8 max-w-lg mx-auto">
          We build high-performance, pixel-perfect SaaS applications and modular monolithic backend architectures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 font-bold uppercase border-[3px] border-brand-dark bg-brand-primary text-white shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all">
            Explore Portfolio
          </button>
          <button className="px-6 py-3 font-bold uppercase border-[3px] border-brand-dark bg-transparent text-brand-dark hover:bg-white/50 transition-all">
            Get In Touch
          </button>
        </div>
      </div>
    </main>
  );
}
