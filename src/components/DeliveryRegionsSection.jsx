import React from 'react';

export default function DeliveryRegionsSection() {
  const regions = [
    '📍 Santo Antônio',
    '📍 Cachoeirinha',
    '📍 Raiz',
    '📍 Compensa',
    '📍 São José Operário',
    '📍 Educandos',
    '📍 Praça 14 de Janeiro',
    '📍 Centro',
    '📍 Zumbi dos Palmares',
    '📍 Gilberto Mestrinho',
    '📍 Ponta Negra & Tarumã',
    '📍 Vieiralves & Adrianópolis',
  ];

  return (
    <section id="atendimento" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20 text-left">
      <div data-reveal="true" className="rounded-3xl gradient-ice p-8 text-white md:p-12 shadow-xl shadow-blue-500/15 card-hover">
        <h2 className="text-2xl font-extrabold md:text-4xl tracking-tight text-white">
          🚚 Entregamos na sua região
        </h2>
        <p className="mt-2 text-sm text-blue-100 md:text-base">
          Bairro Santo Antônio e região próxima — Manaus/AM
        </p>

        <ul className="mt-8 flex flex-wrap gap-2.5">
          {regions.map((reg) => (
            <li
              key={reg}
              className="rounded-full bg-white/15 px-4 py-2 text-xs sm:text-sm font-bold backdrop-blur border border-white/20 text-white transition-transform hover:scale-105"
            >
              {reg}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
