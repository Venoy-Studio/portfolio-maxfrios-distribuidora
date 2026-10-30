import React from 'react';

export default function Hero({ onOpenCatalog }) {
  const categories = [
    {
      emoji: '🧊',
      title: 'Gelo',
      desc: 'Cubos, triturado e barra, em pacotes e grandes volumes.',
      tag: 'gelos',
    },
    {
      emoji: '🥤',
      title: 'Bebidas',
      desc: 'Refrigerantes, sucos, energéticos e isotônicos gelados.',
      tag: 'nao-alcoolicos',
    },
    {
      emoji: '🍺',
      title: 'Bebidas alcoólicas',
      desc: 'Cervejas e destilados. Venda proibida para menores de 18 anos.',
      tag: 'cervejas-350',
    },
    {
      emoji: '💧',
      title: 'Água',
      desc: 'Garrafas, fardos e galões de 20 litros.',
      tag: 'nao-alcoolicos',
    },
    {
      emoji: '🎉',
      title: 'Produtos para eventos',
      desc: 'Volume programado de gelo e bebidas com entrega agendada.',
      tag: 'eventos',
    },
    {
      emoji: '📦',
      title: 'Outros produtos',
      desc: 'Itens complementares para abastecer seu estabelecimento.',
      tag: 'todos',
    },
  ];

  return (
    <section id="produtos" className="mx-auto max-w-6xl px-4 pb-14 pt-8 md:pb-20 md:pt-12 text-left">
      <h1 data-reveal="true" className="mb-8 md:mb-12 text-balance text-3xl font-extrabold text-slate-900 md:text-5xl tracking-tight">
        Seja bem-vindo à Distribuidora Max Frios
      </h1>

      <div data-reveal-group="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <article
            key={cat.title}
            onClick={() => onOpenCatalog(cat.tag)}
            className="cursor-pointer rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80 card-hover hover:border-blue-400 group"
          >
            <span className="text-4xl block mb-3 transition-transform group-hover:scale-110 duration-200">{cat.emoji}</span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {cat.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              {cat.desc}
            </p>
          </article>
        ))}
      </div>

      <div data-reveal="true" className="mt-8 text-center sm:text-left">
        <button
          onClick={() => onOpenCatalog('todos')}
          className="inline-flex items-center justify-center rounded-full gradient-ice px-8 py-4 text-base font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
        >
          🛒 Ver produtos e fazer pedido
        </button>
      </div>
    </section>
  );
}
