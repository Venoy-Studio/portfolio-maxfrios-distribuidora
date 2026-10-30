import React from 'react';

export default function HowItWorksSection({ onOpenCatalog }) {
  const steps = [
    { num: '1️⃣', text: 'Escolha os produtos' },
    { num: '2️⃣', text: 'Informe quantidade e endereço' },
    { num: '3️⃣', text: 'Confirme o pedido' },
    { num: '4️⃣', text: 'Receba sua entrega' },
  ];

  return (
    <section id="como-funciona" className="gradient-ice py-14 text-white md:py-20 text-left">
      <div className="mx-auto max-w-6xl px-4">
        <h2 data-reveal="true" className="text-2xl font-extrabold md:text-4xl tracking-tight text-white">
          Como funciona
        </h2>

        <ol data-reveal-group="true" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.num}
              className="rounded-2xl bg-white/15 p-5 text-base font-bold backdrop-blur border border-white/20 text-white card-hover"
            >
              <div className="text-2xl mb-2">{s.num}</div>
              <div>{s.text}</div>
            </li>
          ))}
        </ol>

        <div data-reveal="true" className="mt-8">
          <button
            onClick={() => onOpenCatalog('todos')}
            className="inline-flex items-center justify-center rounded-full bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-base font-extrabold shadow-lg transition-transform hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            🛒 FAZER MEU PEDIDO
          </button>
        </div>
      </div>
    </section>
  );
}
