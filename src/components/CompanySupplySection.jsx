import React from 'react';
import { COMPANY_INFO } from '../data/company';

export default function CompanySupplySection() {
  return (
    <section id="empresas" className="mx-auto max-w-6xl px-4 py-14 md:py-20 text-left">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Genuine Image */}
        <div data-reveal="true" className="aspect-[7/5] w-full overflow-hidden rounded-3xl shadow-sm border border-slate-200 card-hover">
          <img
            src="/assets/estoque.jpg"
            alt="Estoque de bebidas e gelo em galpão de distribuição Max Frios"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text Details */}
        <div data-reveal="true">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight leading-tight">
            Precisa de gelo e bebidas em grande quantidade?
          </h2>
          <p className="mt-4 text-sm text-slate-600 md:text-base leading-relaxed">
            Atendemos bares, restaurantes, eventos, mercados, pousadas e empresas que precisam de abastecimento recorrente. Condições de faturamento e rotas diárias organizadas.
          </p>

          <div className="mt-6">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá, gostaria de solicitar atendimento para abastecimento da minha empresa com a Max Frios.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full gradient-ice px-8 py-4 text-base font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
            >
              📦 SOLICITAR ATENDIMENTO
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
