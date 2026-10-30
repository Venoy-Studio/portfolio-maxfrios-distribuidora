import React from 'react';
import { COMPANY_INFO } from '../data/company';

export default function LocationSection() {
  return (
    <section id="localizacao" className="mx-auto max-w-6xl px-4 pb-14 md:pb-20 text-left">
      <div data-reveal="true" className="grid items-center gap-8 md:grid-cols-2 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm card-hover">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
            📍 Onde estamos
          </h2>
          <p className="mt-4 text-sm text-slate-600 md:text-base leading-relaxed">
            {COMPANY_INFO.endereco.logradouro} - {COMPANY_INFO.endereco.bairro}, {COMPANY_INFO.endereco.cidade} - {COMPANY_INFO.endereco.uf}, {COMPANY_INFO.endereco.cep}
          </p>
          <div className="text-xs text-blue-600 font-medium mt-1">
            Referência: {COMPANY_INFO.endereco.referencia}
          </div>

          <div className="mt-6">
            <a
              href={COMPANY_INFO.endereco.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full gradient-ice px-6 py-3.5 text-sm font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.03] active:scale-95"
            >
              🗺️ ABRIR NO GOOGLE MAPS
            </a>
          </div>
        </div>

        {/* Visual Map / Info Box */}
        <div className="rounded-2xl bg-slate-100 p-6 border border-slate-200 text-xs space-y-3">
          <div className="font-extrabold text-slate-900 text-sm">
            Horário de Funcionamento na Fábrica
          </div>
          <div className="text-slate-600">
            • <strong>Segunda a Sábado:</strong> 07h00 às 19h00
          </div>
          <div className="text-slate-600">
            • <strong>Domingos e Feriados:</strong> 08h00 às 14h00
          </div>
          <div className="text-slate-500 pt-2 border-t border-slate-200">
            Carregamento no local disponível para veículos particulares, frotas, picapes e barcos.
          </div>
        </div>
      </div>
    </section>
  );
}
