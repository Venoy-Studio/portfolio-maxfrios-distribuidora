import React, { useState, useMemo } from 'react';
import { X, Users, Clock, Check, ArrowRight, Share2 } from 'lucide-react';
import { calculateEventNeeds } from '../utils/calculator';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { COMPANY_INFO } from '../data/company';

export default function EventCalculatorModal({ isOpen, onClose }) {
  const { addBulkItems } = useCart();

  const [adults, setAdults] = useState(30);
  const [duration, setDuration] = useState(5);
  const [environment, setEnvironment] = useState('externo');
  const [hasBeer, setHasBeer] = useState(true);
  const [hasSpirits, setHasSpirits] = useState(true);
  const [hasNonAlcoholic, setHasNonAlcoholic] = useState(true);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const calculation = useMemo(() => {
    return calculateEventNeeds({
      adults,
      duration,
      environment,
      hasBeer,
      hasSpirits,
      hasNonAlcoholic,
    });
  }, [adults, duration, environment, hasBeer, hasSpirits, hasNonAlcoholic]);

  if (!isOpen) return null;

  const handleAddCalculatedToCart = () => {
    const itemsToAdd = [];

    if (calculation.recommendations.geloEscama.sacos20kg > 0) {
      const p = PRODUCTS.find((x) => x.id === 'gelo-escama-20kg');
      if (p) itemsToAdd.push({ ...p, quantidade: calculation.recommendations.geloEscama.sacos20kg });
    }
    if (calculation.recommendations.geloEscama.sacos10kg > 0) {
      const p = PRODUCTS.find((x) => x.id === 'gelo-escama-10kg');
      if (p) itemsToAdd.push({ ...p, quantidade: calculation.recommendations.geloEscama.sacos10kg });
    }
    if (calculation.recommendations.geloCubo.pacotes10kg > 0) {
      const p = PRODUCTS.find((x) => x.id === 'gelo-cubo-10kg');
      if (p) itemsToAdd.push({ ...p, quantidade: calculation.recommendations.geloCubo.pacotes10kg });
    }
    if (calculation.recommendations.geloCubo.pacotes5kg > 0) {
      const p = PRODUCTS.find((x) => x.id === 'gelo-cubo-5kg');
      if (p) itemsToAdd.push({ ...p, quantidade: calculation.recommendations.geloCubo.pacotes5kg });
    }
    if (hasBeer && calculation.recommendations.cerveja) {
      const pBeer = PRODUCTS.find((x) => x.id === 'brahma-duplo-malte-350') || PRODUCTS[7];
      if (pBeer) itemsToAdd.push({ ...pBeer, quantidade: calculation.recommendations.cerveja.fardos12un });
    }
    if (calculation.recommendations.agua) {
      const pWater = PRODUCTS.find((x) => x.id === 'fardo-agua-500ml');
      if (pWater) itemsToAdd.push({ ...pWater, quantidade: calculation.recommendations.agua.fardos500ml });
    }
    if (hasNonAlcoholic && calculation.recommendations.refrigerantes) {
      const pSoda = PRODUCTS.find((x) => x.id === 'fardo-bare-2l');
      if (pSoda) itemsToAdd.push({ ...pSoda, quantidade: calculation.recommendations.refrigerantes.fardos2L });
    }

    addBulkItems(itemsToAdd);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden text-left border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              🎉 Calculadora de Gelo e Bebidas para Eventos
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Calcule a quantidade ideal para seu churrasco, festa ou flutuante no Tarumã.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders & Inputs */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between font-bold text-slate-700 mb-2">
                <span>Convidados (Adultos)</span>
                <span className="text-blue-700 font-mono text-sm">{adults} pessoas</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between font-bold text-slate-700 mb-2">
                <span>Duração do Evento</span>
                <span className="text-blue-700 font-mono text-sm">{duration} horas</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Environment */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Tipo de Local</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEnvironment('externo')}
                className={`p-3 rounded-xl border text-left font-semibold ${
                  environment === 'externo'
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                ☀️ Flutuante / Marina / Ao ar livre
                <div className="text-[10px] text-slate-500 font-normal">Mais gelo para coolers e calor</div>
              </button>
              <button
                type="button"
                onClick={() => setEnvironment('interno')}
                className={`p-3 rounded-xl border text-left font-semibold ${
                  environment === 'interno'
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                ❄️ Espaço Climatizado / Salão
                <div className="text-[10px] text-slate-500 font-normal">Consumo padrão de gelo</div>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="rounded-2xl gradient-ice p-5 text-white space-y-3 shadow-md">
            <div className="font-extrabold text-sm border-b border-white/20 pb-2 flex justify-between">
              <span>Resultado Recomendado</span>
              <span className="font-mono text-blue-100">Estimativa: ~R$ {calculation.estimatedCost.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/15 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold block">🧊 Gelo Escama (Coolers):</span>
                <span>{calculation.recommendations.geloEscama.totalKg} kg</span>
              </div>
              <div className="bg-white/15 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold block">🧊 Gelo Cubos (Copos):</span>
                <span>{calculation.recommendations.geloCubo.totalKg} kg</span>
              </div>
              <div className="bg-white/15 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold block">🍺 Cerveja:</span>
                <span>{calculation.recommendations.cerveja.fardos12un} Fardos (12 latas)</span>
              </div>
              <div className="bg-white/15 p-2.5 rounded-xl border border-white/10">
                <span className="font-bold block">💧 Água Mineral:</span>
                <span>{calculation.recommendations.agua.fardos500ml} Fardos (12 un)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Fechar
          </button>
          <button
            onClick={handleAddCalculatedToCart}
            className="rounded-full gradient-ice px-6 py-2.5 text-xs font-extrabold text-white shadow-md active:scale-95 flex items-center gap-1.5"
          >
            {addedSuccess ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            <span>{addedSuccess ? 'Adicionado ao Pedido!' : 'Adicionar Tudo ao Pedido'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
