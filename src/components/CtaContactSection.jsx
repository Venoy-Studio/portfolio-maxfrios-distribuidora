import React from 'react';
import { COMPANY_INFO } from '../data/company';

export default function CtaContactSection({ onOpenCatalog }) {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 pb-16 text-center">
      <div data-reveal="true">
        <h2 className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
          🧊 Precisa de gelo ou bebidas?
        </h2>
        <p className="mt-2 text-sm text-slate-600 md:text-base">
          Faça seu pedido online em poucos minutos.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenCatalog('todos')}
            className="inline-flex items-center justify-center rounded-full gradient-ice px-8 py-4 text-base font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            🛒 PEDIR AGORA
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá, vim pelo site e gostaria de falar diretamente com a equipe da Max Frios.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-4 text-base font-extrabold text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            📲 WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
