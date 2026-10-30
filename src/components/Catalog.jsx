import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, Sparkles, Filter, AlertCircle, ShoppingBag, Snowflake } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Catalog() {
  const { cart, addToCart, updateQuantity, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);

  // Filter products based on category, search, and popularity
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.categoria === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.embalagem.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPopular = !onlyPopular || item.popular;

      return matchesCategory && matchesSearch && matchesPopular;
    });
  }, [selectedCategory, searchQuery, onlyPopular]);

  // Helper to find quantity in cart
  const getItemQuantity = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.quantidade : 0;
  };

  return (
    <section id="produtos" className="py-16 sm:py-24 bg-[#050B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
              <Snowflake className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              Tabela Direta de Fábrica & Distribuidora
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Catálogo de Gelos & Bebidas
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Monte seu pedido online com preços transparentes. Cervejas distribuídas em fardos e caixas fechadas para máxima conservação.
            </p>
          </div>

          {/* Quick Notice Badge */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 max-w-sm text-xs text-slate-300 flex items-start gap-3 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Regra de Distribuição em Manaus:</span>
              Latas vendidas em fardos (12 ou 15 un.) e Long Necks em caixas (24 un.). Venda alcoólica para maiores de 18 anos.
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por cerveja, gelo 10kg, long neck, refrigerante..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-white/10 focus:border-cyan-400 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-800 text-slate-400 hover:text-white px-2 py-1 rounded"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Popular toggle pill */}
            <button
              onClick={() => setOnlyPopular(!onlyPopular)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                onlyPopular
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 border-white/10 hover:border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Mais Vendidos ({PRODUCTS.filter((p) => p.popular).length})</span>
            </button>
          </div>

          {/* Category Chips Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'todos' 
                ? PRODUCTS.length 
                : PRODUCTS.filter((p) => p.categoria === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 text-slate-300 border-white/5 hover:border-white/20 hover:bg-slate-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>Mostrando <strong>{filteredProducts.length}</strong> itens disponíveis para entrega imediata</span>
          {searchQuery && (
            <span>Filtro ativo: "{searchQuery}"</span>
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const qtyInCart = getItemQuantity(product.id);
            const isIce = product.categoria === 'gelos';

            return (
              <div
                key={product.id}
                className={`flex flex-col justify-between rounded-2xl p-4 transition-all duration-300 border backdrop-blur-sm ${
                  qtyInCart > 0
                    ? 'bg-slate-900/90 border-cyan-400/60 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                    : 'bg-slate-900/40 hover:bg-slate-900/80 border-white/5 hover:border-cyan-500/30'
                }`}
              >
                <div>
                  {/* Visual Image / Category Banner */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-950 border border-white/5 group">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    {/* Tag badge */}
                    {product.tag && (
                      <span className={`absolute top-2.5 left-2.5 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md shadow-md ${
                        isIce 
                          ? 'bg-cyan-400 text-slate-950' 
                          : 'bg-slate-900/90 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {product.tag}
                      </span>
                    )}

                    {/* Temperature or ABV tag */}
                    {(product.temperatura || product.graduacao) && (
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 border border-white/10">
                        {product.temperatura || `Teor ${product.graduacao}`}
                      </span>
                    )}

                    {/* Quantity overlay if in cart */}
                    {qtyInCart > 0 && (
                      <div className="absolute bottom-2 right-2 bg-cyan-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{qtyInCart} no pedido</span>
                      </div>
                    )}
                  </div>

                  {/* Packaging specification */}
                  <div className="text-[11px] font-semibold text-cyan-400/90 uppercase tracking-wider">
                    {product.embalagem}
                  </div>

                  {/* Product Title */}
                  <h3 className="font-extrabold text-base text-white mt-1 leading-snug">
                    {product.nome}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.descricao}
                  </p>
                </div>

                {/* Price and Cart Controller */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <div>
                    {product.sobConsulta ? (
                      <div className="text-xs font-bold text-amber-400">
                        Sob consulta
                      </div>
                    ) : (
                      <div>
                        <div className="text-[10px] text-slate-500 font-medium uppercase">Preço distribuidora</div>
                        <div className="text-xl font-black text-white tracking-tight">
                          R$ {product.preco.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  {qtyInCart === 0 ? (
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-105 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  ) : (
                    <div className="flex items-center bg-slate-950 border border-cyan-500/40 rounded-xl p-1 gap-1 shadow-inner">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-black text-xs text-cyan-300">
                        {qtyInCart}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-colors font-bold"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-white/5">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white">Nenhum produto encontrado</h4>
            <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              Não encontramos nenhum item correspondente a "{searchQuery}". Tente outro termo ou limpe o filtro.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setOnlyPopular(false);
              }}
              className="mt-4 text-xs font-bold text-cyan-400 hover:underline"
            >
              Resetar todos os filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
