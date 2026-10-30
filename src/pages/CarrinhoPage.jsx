import React from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CarrinhoPage({ onNavigate }) {
  const { cart, updateQuantity, removeFromCart, subtotal, totalItemsCount } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 pb-40 text-left">
      <main className="mx-auto max-w-3xl px-4 pb-5 pt-12 md:pt-16">
        
        {/* Navigation header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('pedido')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao cardápio</span>
          </button>
        </div>

        <h1 className="mb-6 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          🛒 Seu pedido
        </h1>

        {cart.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-10 text-center border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">
              Seu carrinho está vazio.
            </p>
            <button
              onClick={() => onNavigate('pedido')}
              className="mt-5 inline-block rounded-full gradient-ice px-6 py-3 text-sm font-extrabold text-white shadow-md active:scale-95"
            >
              Ver cardápio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Items list */}
            <ul className="space-y-3">
              {cart.map((item) => {
                const total = (item.preco || 0) * item.quantidade;

                return (
                  <li
                    key={item.id}
                    className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-200/90 sm:grid-cols-[5rem_minmax(0,1fr)_auto]"
                  >
                    {/* Real Product Image */}
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20 bg-slate-100 border border-slate-100"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=200&auto=format&fit=crop&q=80';
                      }}
                    />

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                        {item.nome}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {item.embalagem}
                      </p>
                      <p className="mt-1 text-base font-black text-blue-600 font-mono">
                        {item.preco === 0 ? 'Valor a consultar' : `R$ ${total.toFixed(2)}`}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-1 text-xs font-semibold text-red-600 hover:underline"
                      >
                        Remover
                      </button>
                    </div>

                    {/* Stepper */}
                    <div className="col-span-2 justify-self-end sm:col-span-1">
                      <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white text-slate-700 flex items-center justify-center font-bold text-xs shadow-xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-slate-900">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Add more link */}
            <button
              onClick={() => onNavigate('pedido')}
              className="mt-4 block w-full rounded-2xl border border-dashed border-blue-300 py-3.5 text-center text-sm font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-colors"
            >
              + Adicionar mais produtos
            </button>

            {/* Totals Summary */}
            <div className="mt-6 space-y-2.5 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal ({totalItemsCount} itens)</span>
                <span className="font-mono font-bold text-slate-900">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Taxa de entrega</span>
                <span className="font-semibold text-slate-900">A consultar</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-base font-bold text-slate-900">TOTAL PARCIAL</span>
                <span className="text-2xl font-black text-blue-600 font-mono">
                  R$ {subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4">
              <button
                onClick={() => onNavigate('checkout')}
                className="pointer-events-auto mx-auto block w-full max-w-3xl rounded-2xl gradient-ice py-4 text-center text-base font-extrabold text-white shadow-xl shadow-blue-500/30 transition-transform active:scale-[0.99]"
              >
                CONTINUAR PEDIDO →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
