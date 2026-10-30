import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function PedidoPage({ onNavigate }) {
  const { cart, addToCart, updateQuantity, totalItemsCount, subtotal, deliveryInfo, setDeliveryInfo } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const getItemQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantidade : 0;
  };

  // Group products by section
  const sections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'todos' || p.categoria === selectedCategory;
      const matchQuery =
        query === '' ||
        p.nome.toLowerCase().includes(query) ||
        p.embalagem.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    const groups = [
      { id: 'gelos', title: 'Gelos' },
      { id: 'cervejas-350', title: 'Cervejas 350 ml (Fardo com 12)' },
      { id: 'cervejas-269', title: 'Cervejas 269 ml (Fardo com 15)' },
      { id: 'long-neck', title: 'Long Neck (Caixa com 24)' },
      { id: 'cervejas-600', title: 'Cervejas 600 ml' },
      { id: 'cervejas-1l', title: 'Cervejas 1 Litro (Litrão)' },
      { id: 'destilados', title: 'Whiskys & Destilados' },
      { id: 'outros', title: 'Outros Produtos' },
    ];

    return groups
      .map((g) => ({
        ...g,
        products: filtered.filter((p) => p.categoria === g.id),
      }))
      .filter((g) => g.products.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32 text-left">
      {/* Top Banner */}
      <section className="gradient-ice px-4 pb-8 pt-12 md:pt-16 text-white shadow-sm">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-white tracking-tight">
            🧊 Gelo e bebidas na sua porta
          </h1>
          <p className="mt-2 text-sm text-blue-100 leading-relaxed">
            Escolha seus produtos, monte seu pedido e envie pelo WhatsApp. Cervejas são vendidas por fardo, caixa ou engradado — não por unidade.
          </p>

          {/* Search Input */}
          <div className="relative mt-5">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔎 O que você está procurando?"
              className="w-full rounded-2xl bg-white px-4 py-3.5 text-base text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </section>

      {/* Sticky Categories Bar */}
      <nav className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="no-scrollbar mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Catalog List */}
      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="space-y-10">
          {sections.map((sec) => (
            <section key={sec.id} aria-labelledby={`section-${sec.id}`}>
              <div className="mb-4 border-b border-slate-200 pb-2">
                <h2 id={`section-${sec.id}`} className="text-xl font-extrabold text-slate-900">
                  {sec.title}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                {sec.products.map((item) => {
                  const qty = getItemQuantity(item.id);
                  const isGranel = item.nome.toLowerCase().includes('granel');

                  return (
                    <article
                      key={item.id}
                      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-300"
                    >
                      {/* Real Product Image */}
                      <div className="aspect-square w-full overflow-hidden bg-slate-50 relative">
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=400&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-3.5">
                        <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                          {item.nome}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 leading-snug">
                          {item.embalagem}
                        </p>

                        <div className="mt-auto pt-3">
                          {item.preco === 0 ? (
                            <p className="text-xs font-bold text-amber-600">
                              {isGranel ? 'Valor a consultar' : 'Preço sob consulta'}
                            </p>
                          ) : (
                            <p className="text-base font-black text-blue-600 font-mono">
                              R$ {item.preco.toFixed(2)}
                            </p>
                          )}

                          <div className="mt-3">
                            {qty === 0 ? (
                              <button
                                type="button"
                                onClick={() => addToCart(item, 1)}
                                className="w-full rounded-full gradient-ice py-2 text-xs font-extrabold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
                              >
                                Adicionar
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-slate-100 rounded-full p-1 border border-slate-200">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-7 h-7 rounded-full bg-white text-slate-700 font-bold flex items-center justify-center shadow-xs"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-black text-slate-900">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {sections.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            Nenhum produto encontrado para "{searchQuery}".
          </p>
        )}

        {/* Special Request Box */}
        <section className="mt-12 rounded-3xl bg-slate-100/90 border border-slate-200 p-6">
          <h2 className="text-base font-bold text-slate-900">
            Não encontrou o que procura?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Escreva abaixo e enviamos junto com seu pedido.
          </p>
          <textarea
            value={deliveryInfo.observacoes}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, observacoes: e.target.value })}
            rows={3}
            placeholder='Ex.: "Quero 2 caixas de energético ou carvão vegetal."'
            className="mt-3 w-full rounded-2xl bg-white p-3.5 text-sm text-slate-900 border border-slate-300 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
          />
        </section>
      </main>

      {/* Floating Bottom Bar: VER CARRINHO */}
      {totalItemsCount > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4">
          <button
            onClick={() => onNavigate('carrinho')}
            type="button"
            className="pointer-events-auto mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl gradient-ice px-6 py-4 text-white shadow-xl shadow-blue-500/30 transition-transform active:scale-[0.99]"
          >
            <span className="text-sm font-semibold">
              🛒 {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} — <strong className="font-mono text-base">R$ {subtotal.toFixed(2)}</strong>
            </span>
            <span className="text-sm font-extrabold flex items-center gap-1">
              <span>VER CARRINHO</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
