import React from 'react';

export default function AudienceSection() {
  const audiences = [
    { emoji: '🍻', title: 'Bares e restaurantes' },
    { emoji: '🏨', title: 'Hotéis e pousadas' },
    { emoji: '🎉', title: 'Eventos e festas' },
    { emoji: '🏪', title: 'Mercados e comércios' },
    { emoji: '🏠', title: 'Clientes particulares' },
    { emoji: '🚚', title: 'Revendedores' },
  ];

  return (
    <section id="publicos" className="bg-slate-100/80 py-14 md:py-20 text-left border-y border-slate-200/60">
      <div className="mx-auto max-w-6xl px-4">
        <h2 data-reveal="true" className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
          Para quem atendemos
        </h2>
        <p data-reveal="true" className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
          Se você precisa de gelo e bebidas em quantidade, nós cuidamos da entrega.
        </p>

        <div data-reveal-group="true" className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {audiences.map((aud) => (
            <div
              key={aud.title}
              className="flex items-center gap-3.5 rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 font-bold text-slate-800 text-base card-hover"
            >
              <span className="text-3xl shrink-0">{aud.emoji}</span>
              <span>{aud.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
