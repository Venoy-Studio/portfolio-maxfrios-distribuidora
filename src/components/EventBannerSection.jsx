import React from 'react';

export default function EventBannerSection({ onOpenCalculator }) {
  return (
    <section id="eventos" className="bg-slate-100/80 py-14 md:py-20 text-left border-y border-slate-200/60">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
        {/* Left Column */}
        <div data-reveal="true" className="order-2 md:order-1">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
            🎉 Vai fazer um evento?
          </h2>
          <p className="mt-4 text-sm text-slate-600 md:text-base leading-relaxed">
            Calcule sua necessidade de gelo e bebidas e faça seu pedido com antecedência. Entrega programada no local da festa, marina ou flutuante no Tarumã.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenCalculator}
              type="button"
              className="inline-flex items-center justify-center rounded-full gradient-ice px-8 py-4 text-base font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
            >
              🛒 CALCULAR E PEDIR PARA MEU EVENTO
            </button>
          </div>
        </div>

        {/* Right Column: Genuine Image */}
        <div data-reveal="true" className="order-1 md:order-2 aspect-[7/5] w-full overflow-hidden rounded-3xl shadow-sm border border-slate-200 card-hover">
          <img
            src="/assets/eventos.jpg"
            alt="Atendimento para eventos e festas em Manaus"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
