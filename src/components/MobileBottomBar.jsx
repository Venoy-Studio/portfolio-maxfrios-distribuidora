import React from 'react';
import { ShoppingBag, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/company';

export default function MobileBottomBar({ onOpenCalculator }) {
  const { totalItemsCount, subtotal, setIsCartOpen } = useCart();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091322]/95 backdrop-blur-xl border-t border-cyan-500/20 p-3 shadow-2xl">
      <div className="flex items-center gap-2">
        
        {/* Event Calculator Quick Button */}
        <button
          onClick={onOpenCalculator}
          type="button"
          aria-label="Abrir calculadora"
          className="flex flex-col items-center justify-center bg-slate-900 border border-cyan-500/30 text-cyan-300 w-16 h-12 rounded-xl text-[10px] font-bold shrink-0"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Calcular</span>
        </button>

        {/* WhatsApp Fast Call */}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá! Vim pelo site da Max Frios e gostaria de pedir informações.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
          className="flex flex-col items-center justify-center bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 w-16 h-12 rounded-xl text-[10px] font-bold shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        {/* Open Cart Button with subtotal and item count */}
        <button
          onClick={() => setIsCartOpen(true)}
          type="button"
          className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 h-12 rounded-xl font-black text-xs flex items-center justify-between px-4 shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>Ver Pedido</span>
            {totalItemsCount > 0 && (
              <span className="bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="font-mono text-sm">
            {subtotal > 0 ? `R$ ${subtotal.toFixed(2)}` : 'R$ 0,00'}
          </span>
        </button>

      </div>
    </div>
  );
}
