import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Phone, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/company';

export default function Navbar({ onNavigate, currentPage = 'home', onOpenCalculator }) {
  const { totalItemsCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    document.documentElement.classList.toggle('dark', nextMode);
  };

  const goToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProdutosClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (currentPage === 'home') {
      const el = document.getElementById('produtos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate('pedido');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-600/40 gradient-topbar text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center px-3 sm:px-4 h-14 justify-between gap-2">
        
        {/* Left: Menu Toggle + Logo + Brand Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center h-9 w-9 shrink-0 rounded-lg text-white hover:bg-white/15 active:bg-white/25 transition-colors focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            type="button"
            className="flex items-center gap-2 min-w-0 text-left focus:outline-none group"
          >
            <img
              src="/assets/max-frios-logo.png"
              alt="Logo Max Frios Distribuidora"
              className="h-9 w-9 shrink-0 rounded-full bg-white/20 p-0.5 object-cover shadow-xs"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="font-extrabold text-xs sm:text-sm md:text-base leading-tight tracking-tight text-white group-hover:text-blue-100 transition-colors truncate">
              Max Frios Distribuidora
            </span>
          </button>
        </div>

        {/* Center/Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold text-blue-100">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`hover:text-white transition-colors ${currentPage === 'home' ? 'text-white font-black' : ''}`}
          >
            Início
          </button>

          <button
            onClick={handleProdutosClick}
            className={`hover:text-white transition-colors ${currentPage === 'pedido' ? 'text-white font-black underline underline-offset-4' : ''}`}
          >
            Produtos
          </button>

          <button
            onClick={() => onNavigate('pedido')}
            className={`hover:text-white transition-colors ${currentPage === 'pedido' ? 'text-white font-black' : ''}`}
          >
            Fazer pedido
          </button>

          <button
            onClick={() => goToSection('empresas')}
            className="hover:text-white transition-colors"
          >
            Empresas
          </button>

          <button
            onClick={() => goToSection('eventos')}
            className="hover:text-white transition-colors"
          >
            Eventos
          </button>

          <button 
            type="button" 
            onClick={onOpenCalculator} 
            className="hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          >
            🎉 Calculadora
          </button>

          <button
            onClick={() => goToSection('atendimento')}
            className="hover:text-white transition-colors"
          >
            Regiões
          </button>

          <button
            onClick={() => goToSection('contato')}
            className="hover:text-white transition-colors"
          >
            Contato
          </button>
        </nav>

        {/* Right: Theme Toggle + Cart Button + WhatsApp Pill */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Moon / Theme Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="h-8 w-8 shrink-0 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white backdrop-blur transition-all active:scale-95"
            aria-label="Alternar modo escuro"
            title="Alternar modo escuro"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-white" />}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => onNavigate('carrinho')}
            className="relative flex items-center gap-1.5 bg-white text-blue-700 hover:bg-blue-50 px-2.5 sm:px-3 py-1.5 rounded-full font-bold text-xs shadow-xs transition-transform active:scale-95"
            aria-label="Ver carrinho"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-blue-700" />
            <span className="hidden sm:inline">
              {totalItemsCount === 0 ? 'Carrinho' : `${totalItemsCount} un.`}
            </span>
            {totalItemsCount > 0 && (
              <span className="bg-red-500 text-white font-extrabold text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* WhatsApp Phone Pill with fictitious contact */}
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá, vim pelo site e gostaria de fazer um pedido na Distribuidora Max Frios.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 text-[11px] sm:text-xs shrink-0 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold backdrop-blur transition-all active:scale-95 flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-white" />
            <span className="hidden sm:inline">{COMPANY_INFO.telefoneWhatsapp}</span>
            <span className="sm:hidden">Pedir</span>
          </a>
        </div>

      </div>

      {/* Slide-over Mobile & Tablet Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/15 bg-blue-900/95 backdrop-blur-md px-4 py-4 space-y-2 text-left shadow-xl animate-fadeIn">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
          >
            Início
          </button>
          
          <button
            onClick={handleProdutosClick}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-white bg-white/15"
          >
            🧊 Produtos & Cardápio
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('pedido');
            }}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
          >
            🛒 Fazer pedido
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 flex items-center justify-between"
          >
            <span>🎉 Calculadora para Eventos</span>
            <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">Novo</span>
          </button>

          <button
            onClick={() => goToSection('empresas')}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
          >
            Atendimento para Empresas
          </button>

          <button
            onClick={() => goToSection('eventos')}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
          >
            Eventos & Flutuantes
          </button>

          <button
            onClick={() => goToSection('atendimento')}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
          >
            Regiões Atendidas em Manaus
          </button>

          <button
            onClick={() => goToSection('contato')}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
          >
            Contato & Endereço
          </button>

          <div className="pt-2 border-t border-white/15">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá, vim pelo site e gostaria de falar com a Distribuidora Max Frios.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Chamar no WhatsApp ({COMPANY_INFO.telefoneWhatsapp})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
