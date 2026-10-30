import React from 'react';
import { Building2, ShieldCheck, Clock, Receipt, Truck, FileCheck, PhoneCall, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function B2BSection() {
  return (
    <section id="empresas" className="py-16 sm:py-24 bg-[#07101D] border-y border-white/5 relative overflow-hidden text-left">
      {/* Background flare */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Contas Corporativas & Estabelecimentos</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Seu bar ou restaurante nunca mais vai ficar sem gelo no fim de semana.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Sabemos o custo de uma operação parada em Manaus. Fornecemos abastecimento contínuo de gelo em cubos e escamas com rotas matutinas e vespertinas, além de linha completa de cervejas e águas com faturamento direto para pessoa jurídica.
            </p>

            {/* Benefit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                  <Receipt className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Faturamento Quinzenal e Mensal</h4>
                <p className="text-xs text-slate-400">
                  Condições especiais de prazo no boleto bancário ou Pix PJ para estabelecimentos cadastrados.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Reposição Emergencial no Sábado</h4>
                <p className="text-xs text-slate-400">
                  Plantão especial de final de semana com despacho expresso caso seu giro supere o planejado.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Nota Fiscal Eletrônica & Laudos</h4>
                <p className="text-xs text-slate-400">
                  Conformidade total com Vigilância Sanitária e laudo de pureza microbiológica de cada lote.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                  <Truck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Entrega Programada por Rota</h4>
                <p className="text-xs text-slate-400">
                  Seu estoque recebe antes do horário de abertura, sem atrapalhar a circulação de clientes.
                </p>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Tenho uma empresa/restaurante em Manaus e gostaria de saber as condições de fornecimento B2B e faturamento da Max Frios.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Falar com o Setor Comercial B2B: {COMPANY_INFO.whatsappB2B}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Commercial Simulator Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-900 to-[#0A1629] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400">
                  Canal de Parceria Manaus
                </span>
                <span className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-full font-mono">
                  +120 Empresas Atendidas
                </span>
              </div>

              <h3 className="text-xl font-black text-white">
                Quem nós abastecemos diariamente:
              </h3>

              <ul className="mt-4 space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/50 border border-white/5">
                  <span className="text-lg">🍻</span>
                  <div>
                    <strong className="text-white block">Bares, Botecos & Petiscarias</strong>
                    <span>Vieiralves, Ponta Negra, Santo Antônio, Centro e Flores.</span>
                  </div>
                </li>

                <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/50 border border-white/5">
                  <span className="text-lg">⛵</span>
                  <div>
                    <strong className="text-white block">Marinas, Lanchas & Flutuantes do Tarumã</strong>
                    <span>Cargas em caixas industriais de 40kg para conservação na água.</span>
                  </div>
                </li>

                <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/50 border border-white/5">
                  <span className="text-lg">🏨</span>
                  <div>
                    <strong className="text-white block">Hotéis, Pousadas & Restaurantes Típicos</strong>
                    <span>Gelo puro para alta gastronomia e coquetelaria regional.</span>
                  </div>
                </li>

                <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/50 border border-white/5">
                  <span className="text-lg">🏪</span>
                  <div>
                    <strong className="text-white block">Mercadinhos, Mercearias & Postos de Gasolina</strong>
                    <span>Giro rápido com pacotes de gelo selados para revenda no balcão.</span>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-2">
                <div className="font-bold text-cyan-300">Deseja cadastrar seu CNPJ?</div>
                <p className="text-slate-400">
                  Envie sua ficha cadastral por WhatsApp ou para <span className="text-white font-mono">{COMPANY_INFO.emailComercial}</span> para análise e liberação de limite em até 4 horas.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
