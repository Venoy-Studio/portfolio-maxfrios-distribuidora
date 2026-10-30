import React, { useState } from 'react';
import { MapPin, Truck, Clock, Navigation, CheckCircle, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function NeighborhoodsMap() {
  const [selectedBairro, setSelectedBairro] = useState(COMPANY_INFO.bairrosAtendidos[0]);

  return (
    <section id="rotas" className="py-16 sm:py-24 bg-[#050B14] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Frota de 8 Veículos em Operação Contínua</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Entregamos na sua região em Manaus
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Nossa fábrica está estrategicamente localizada no bairro Santo Antônio, permitindo acesso rápido às principais artérias da cidade e portos de embarque.
          </p>
        </div>

        {/* Grid: Neighborhood Cards + Logistics Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Neighborhood Badges Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANY_INFO.bairrosAtendidos.map((bairro) => {
                const isSelected = selectedBairro.nome === bairro.nome;

                return (
                  <button
                    key={bairro.nome}
                    onClick={() => setSelectedBairro(bairro)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50 scale-[1.01]'
                        : 'bg-slate-900/40 hover:bg-slate-900/80 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span>{bairro.nome}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                        {bairro.tempoMedio}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs mt-2.5 pt-2 border-t border-white/5 text-slate-400">
                      <span className="text-[11px] text-slate-400 font-medium">{bairro.rota}</span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {bairro.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-[#0B1524] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Base Operacional & Fábrica
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Distribuidora Max Frios Santo Antônio
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {COMPANY_INFO.endereco.logradouro} — {COMPANY_INFO.endereco.bairro}, {COMPANY_INFO.endereco.cidade}/{COMPANY_INFO.endereco.uf}
                </p>
                <div className="text-xs text-cyan-300 font-medium mt-1">
                  📍 {COMPANY_INFO.endereco.referencia}
                </div>
              </div>

              {/* Operating Schedules */}
              <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Horário de Saída das Rotas:</div>
                    <div className="text-slate-300">{COMPANY_INFO.horarios.semana}</div>
                    <div className="text-slate-400 text-[11px]">{COMPANY_INFO.horarios.domingo}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Atendimento a Embarcações & Marinas:</div>
                    <div className="text-slate-300">
                      Entregas agendadas direto na Marina do Davi, Tauá, Flutuantes e Pier Municipal.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(`Olá! Gostaria de saber o tempo de entrega para o bairro ${selectedBairro.nome}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 text-center text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Truck className="w-4 h-4" />
                  <span>Consultar Entrega para {selectedBairro.nome}</span>
                </a>

                <a
                  href={COMPANY_INFO.endereco.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white py-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ver Localização no Google Maps</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
