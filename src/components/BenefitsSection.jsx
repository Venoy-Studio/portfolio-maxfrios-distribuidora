import React from 'react';

export default function BenefitsSection() {
  const benefits = [
    {
      emoji: '🧊',
      title: 'Produção própria',
      desc: 'Fabricamos o gelo que entregamos — 50 toneladas por dia, sem depender de terceiros.',
    },
    {
      emoji: '🚚',
      title: 'Frota de distribuição',
      desc: '8 veículos próprios rodando em Manaus todos os dias, com rotas organizadas por bairro.',
    },
    {
      emoji: '📦',
      title: 'Capacidade para grandes pedidos',
      desc: 'Estrutura para abastecer eventos, redes e estabelecimentos com alto giro.',
    },
    {
      emoji: '⚡',
      title: 'Agilidade na entrega',
      desc: 'Pedido recebido, separado e despachado no mesmo fluxo de rota.',
    },
    {
      emoji: '🤝',
      title: 'Atendimento para empresas',
      desc: 'Abastecimento recorrente, condições combinadas e contato direto com a equipe.',
    },
    {
      emoji: '📲',
      title: 'Pedido online fácil',
      desc: 'Monte o pedido em poucos toques e finalize direto pelo WhatsApp.',
    },
  ];

  return (
    <section id="beneficios" className="mx-auto max-w-6xl px-4 py-14 md:py-20 text-left">
      <h2 data-reveal="true" className="text-2xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
        Por que escolher a Max Frios Distribuidora
      </h2>

      <div data-reveal-group="true" className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <article
            key={b.title}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm card-hover"
          >
            <span className="text-3xl block mb-3">{b.emoji}</span>
            <h3 className="text-base font-bold text-slate-900">
              {b.title}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
              {b.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
