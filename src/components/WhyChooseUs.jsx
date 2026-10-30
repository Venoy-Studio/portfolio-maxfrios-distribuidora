import React from 'react';
import { Factory, Truck, Snowflake, Sparkles, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-[#07101D] border-t border-white/5 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Estrutura Logística de Alto Padrão</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Por que a Max Frios é referência em Manaus
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Desde 2013 combinamos parque fabril industrial de gelo, frota organizada por zonas geográficas e atendimento focado na satisfação imediata do cliente.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {COMPANY_INFO.diferenciais.map((item, idx) => (
            <div
              key={item.titulo}
              className="bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                {idx === 0 && <Factory className="w-6 h-6" />}
                {idx === 1 && <Truck className="w-6 h-6" />}
                {idx === 2 && <Snowflake className="w-6 h-6" />}
                {idx === 3 && <Sparkles className="w-6 h-6" />}
              </div>

              <h3 className="font-extrabold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">
                {item.titulo}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow: Como Funciona */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0A1629] to-slate-900 border border-white/10 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Passo a Passo
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Como funciona o seu pedido
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                passo: '01',
                titulo: 'Escolha os Produtos',
                desc: 'Navegue pelo catálogo de gelos, fardos de cerveja e bebidas ou use a calculadora de eventos.',
              },
              {
                passo: '02',
                titulo: 'Informe Quantidade e Local',
                desc: 'Selecione seu bairro em Manaus ou escolha retirar na fábrica no Santo Antônio.',
              },
              {
                passo: '03',
                titulo: 'Confirme no WhatsApp',
                desc: 'Receba a confirmação imediata da rota com tempo estimado de chegada e forma de pagamento.',
              },
              {
                passo: '04',
                titulo: 'Receba Trincando',
                desc: 'Nosso caminhão baú descarrega os itens gelados diretamente no seu freezer ou cooler.',
              },
            ].map((step, index) => (
              <div key={step.passo} className="relative space-y-2">
                <div className="text-3xl font-black text-cyan-500/30 font-mono">
                  {step.passo}
                </div>
                <h4 className="font-extrabold text-white text-sm">
                  {step.titulo}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Prova Social
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              Quem confia no nosso fornecimento
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.depoimentos.map((dep) => (
              <div
                key={dep.nome}
                className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/20 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(dep.avaliacao)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{dep.texto}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <div className="font-bold text-white text-xs">{dep.nome}</div>
                  <div className="text-[11px] text-cyan-400/90">{dep.cargo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
