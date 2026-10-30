import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/company';

function getFormattedDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('pt-BR');
}

export default function CheckoutPage({ onNavigate }) {
  const { cart, deliveryInfo, setDeliveryInfo } = useCart();
  const [customDate, setCustomDate] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-slate-500 font-medium text-sm">Seu carrinho está vazio.</p>
        <button
          onClick={() => onNavigate('pedido')}
          className="mt-4 rounded-full gradient-ice px-6 py-2.5 text-xs font-bold text-white shadow-sm"
        >
          Voltar ao cardápio
        </button>
      </div>
    );
  }

  const timeSlots = [
    'Manhã (08h às 12h)',
    'Tarde (13h às 17h)',
    'Fim de tarde (17h às 19h)',
    'Imediato / Próxima Rota',
  ];

  const paymentOptions = [
    { id: 'pix', label: 'Pix', emoji: '📱' },
    { id: 'cartao', label: 'Cartão de Débito/Crédito na Entrega', emoji: '💳' },
    { id: 'dinheiro', label: 'Dinheiro', emoji: '💵' },
    { id: 'faturado', label: 'Faturado PJ (Empresa Cadastrada)', emoji: '📄' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-36 text-left">
      <main className="mx-auto max-w-3xl space-y-8 px-4 pb-5 pt-12 md:pt-16">
        
        {/* Back Link */}
        <div>
          <button
            onClick={() => onNavigate('carrinho')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao carrinho</span>
          </button>
        </div>

        {/* Section 1: Endereço de Entrega */}
        <section className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            📦 Onde vamos entregar?
          </h1>

          <div className="space-y-3 text-xs">
            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Nome</span>
              <input
                value={deliveryInfo.nome}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, nome: e.target.value })}
                placeholder="Como podemos chamar você ou seu comércio?"
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">WhatsApp para confirmação</span>
              <input
                value={deliveryInfo.telefone}
                inputMode="tel"
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, telefone: e.target.value })}
                placeholder="Qual seu número de WhatsApp com DDD? (Ex: 92 98451-0000)"
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block font-bold text-slate-700">CEP</span>
                <input
                  value={deliveryInfo.cep || ''}
                  inputMode="numeric"
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, cep: e.target.value })}
                  placeholder="69000-000"
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-bold text-slate-700">Número</span>
                <input
                  value={deliveryInfo.numero || ''}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, numero: e.target.value })}
                  placeholder="123 ou S/N"
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Rua / Avenida</span>
              <input
                value={deliveryInfo.endereco}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, endereco: e.target.value })}
                placeholder="Nome da rua ou marina/flutuante"
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Complemento</span>
              <input
                value={deliveryInfo.complemento || ''}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, complemento: e.target.value })}
                placeholder="Apto, bloco, pier, marina..."
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Bairro em Manaus</span>
              <select
                value={deliveryInfo.bairro}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, bairro: e.target.value })}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COMPANY_INFO.bairrosAtendidos.map((b) => (
                  <option key={b.nome} value={b.nome}>
                    {b.nome} ({b.tempoMedio})
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-[1fr_90px] gap-3">
              <label className="block">
                <span className="mb-1 block font-bold text-slate-700">Cidade</span>
                <input
                  value="Manaus"
                  readOnly
                  className="w-full rounded-2xl bg-slate-100 border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-bold text-slate-700">Estado</span>
                <input
                  value="AM"
                  readOnly
                  className="w-full rounded-2xl bg-slate-100 border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none text-center font-bold"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-bold text-slate-700">Ponto de referência</span>
              <input
                value={deliveryInfo.referencia}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, referencia: e.target.value })}
                placeholder="Perto da praça, portão preto, posto..."
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </section>

        {/* Section 2: Data de Entrega */}
        <section className="space-y-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            📅 Quando você quer receber?
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDeliveryInfo({ ...deliveryInfo, dataEntrega: `Hoje (${getFormattedDate(0)})` })}
              className={`rounded-full px-5 py-2.5 font-bold transition-all ${
                deliveryInfo.dataEntrega === `Hoje (${getFormattedDate(0)})` || !deliveryInfo.dataEntrega
                  ? 'gradient-ice text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Hoje ({getFormattedDate(0)})
            </button>

            <button
              type="button"
              onClick={() => setDeliveryInfo({ ...deliveryInfo, dataEntrega: `Amanhã (${getFormattedDate(1)})` })}
              className={`rounded-full px-5 py-2.5 font-bold transition-all ${
                deliveryInfo.dataEntrega === `Amanhã (${getFormattedDate(1)})`
                  ? 'gradient-ice text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Amanhã ({getFormattedDate(1)})
            </button>

            <input
              type="date"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                const [y, m, d] = e.target.value.split('-');
                if (y) {
                  setDeliveryInfo({ ...deliveryInfo, dataEntrega: `${d}/${m}/${y}` });
                }
              }}
              className="rounded-full bg-slate-100 border border-slate-200 px-4 py-2 font-bold text-slate-700 outline-none text-xs"
            />
          </div>
        </section>

        {/* Section 3: Horário */}
        <section className="space-y-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            ⏰ Qual o melhor horário?
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {timeSlots.map((slot) => {
              const active = (deliveryInfo.horario || timeSlots[0]) === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setDeliveryInfo({ ...deliveryInfo, horario: slot })}
                  className={`rounded-full px-4 py-2.5 font-bold transition-all ${
                    active
                      ? 'gradient-ice text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 4: Forma de Pagamento */}
        <section className="space-y-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            💳 Como você prefere pagar?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {paymentOptions.map((opt) => {
              const selected = (deliveryInfo.formaPagamento || 'pix') === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDeliveryInfo({ ...deliveryInfo, formaPagamento: opt.id })}
                  className={`rounded-2xl p-4 text-left font-bold border transition-all ${
                    selected
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl mr-2">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 5: Observações */}
        <section className="space-y-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">
            📝 Algum detalhe para a entrega?
          </h2>
          <textarea
            rows={3}
            value={deliveryInfo.observacoes}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, observacoes: e.target.value })}
            placeholder="Ex.: tocar a campainha, deixar na portaria, ligar quando chegar na marina..."
            className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
          />
        </section>

        {/* Bottom Floating Bar */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4">
          <button
            onClick={() => onNavigate('revisao')}
            type="button"
            className="pointer-events-auto mx-auto block w-full max-w-3xl rounded-2xl gradient-ice py-4 text-center text-base font-extrabold text-white shadow-xl shadow-blue-500/30 transition-transform active:scale-[0.99]"
          >
            CONFERIR PEDIDO →
          </button>
        </div>

      </main>
    </div>
  );
}
