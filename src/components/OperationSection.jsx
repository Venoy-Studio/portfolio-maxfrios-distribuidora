import React from 'react';
import { COMPANY_INFO } from '../data/company';

export default function OperationSection() {
  const stats = [
    { label: 'Ano de fundação', value: `${COMPANY_INFO.anoFundacao}` },
    { label: 'Localização', value: `${COMPANY_INFO.endereco.logradouro} - ${COMPANY_INFO.endereco.bairro}, Manaus - AM, ${COMPANY_INFO.endereco.cep}` },
    { label: 'Área de atendimento', value: 'Bairro Santo Antônio e região próxima' },
    { label: 'Capacidade de produção', value: `${COMPANY_INFO.capacidadeGeloTonDia} toneladas por dia` },
    { label: 'Veículos na frota', value: '5 caminhões grandes e 3 médios' },
  ];

  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-14 md:py-20 text-left">
      <h2 data-reveal="true" className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
        Uma operação preparada para entregar.
      </h2>
      <p data-reveal="true" className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base leading-relaxed">
        Produção própria de gelo, estrutura operacional de armazenagem, frota de distribuição e atendimento regional para entregas recorrentes e grandes volumes.
      </p>

      <div data-reveal-group="true" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm card-hover"
          >
            <div className="text-xs uppercase font-extrabold tracking-wider text-blue-600">
              {s.label}
            </div>
            <div className="mt-2 text-base font-bold text-slate-900">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
