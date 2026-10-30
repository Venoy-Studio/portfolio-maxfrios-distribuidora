import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function CatalogSection({ initialCategory = 'todos' }) {
  const { cart, addToCart, updateQuantity, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Update selected category if prop changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      let matchesCategory = true;
      if (selectedCategory !== 'todos') {
        if (selectedCategory === 'cervejas') {
          matchesCategory = item.categoria.startsWith('cervejas') || item.categoria === 'long-neck' || item.categoria === 'garrafas';
        } else {
          matchesCategory = item.categoria === selectedCategory;
        }
      }

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.embalagem.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getItemQuantity = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.quantidade : 0;
  };

  const simpleTabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'gelos', label: '🧊 Gelos' },
    { id: 'cervejas', label: '🍺 Cervejas' },
    { id: 'destilados', label: '🥃 Whiskys' },
    { id: 'nao-alcoolicos', label: '💧 Água & Não-Alcoólicos' },
  ];

  return (
    <section id="pedido" className="py-14 md:py-20 bg-slate-50 text-left border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs uppercase font-extrabold tracking-wider text-blue-600 mb-1">
            Max Frios Distribuidora — Delivery de gelo e bebidas
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            🧊 Gelo e bebidas na sua porta
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Escolha seus produtos, monte seu pedido e envie pelo WhatsApp. Cervejas são vendidas por fardo, caixa ou engradado — não por unidade.
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-blue-600 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {simpleTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
            const qty = getItemQuantity(p.id);

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between card-hover"
              >
                <div>
                  {/* Photo */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                    <img
                      src={p.imagem}
                      alt={p.nome}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Packaging */}
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    {p.embalagem}
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-sm mt-1 leading-snug">
                    {p.nome}
                  </h3>
                </div>

                {/* Price & Action */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    {p.sobConsulta ? (
                      <span className="text-xs font-bold text-amber-600">Sob consulta</span>
                    ) : (
                      <div className="text-base font-black text-slate-900 font-mono">
                        R$ {p.preco.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95"
                    >
                      Adicionar
                    </button>
                  ) : (
                    <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 gap-1">
                      <button
                        onClick={() => updateQuantity(p.id, -1)}
                        className="w-6 h-6 rounded-full bg-white text-slate-700 flex items-center justify-center font-bold text-xs shadow-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-black text-slate-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(p.id, 1)}
                        className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
