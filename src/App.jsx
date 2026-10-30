import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroTruckAnimation from './components/HeroTruckAnimation';
import Hero from './components/Hero';
import AudienceSection from './components/AudienceSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import CompanySupplySection from './components/CompanySupplySection';
import EventBannerSection from './components/EventBannerSection';
import OperationSection from './components/OperationSection';
import DeliveryRegionsSection from './components/DeliveryRegionsSection';
import LocationSection from './components/LocationSection';
import CtaContactSection from './components/CtaContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import EventCalculatorModal from './components/EventCalculatorModal';

// Dedicated cloned pages
import PedidoPage from './pages/PedidoPage';
import CarrinhoPage from './pages/CarrinhoPage';
import CheckoutPage from './pages/CheckoutPage';
import RevisaoPage from './pages/RevisaoPage';

import { CartProvider } from './context/CartContext';
import { useScrollReveal } from './hooks/useScrollReveal';

function getInitialPage() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path === 'pedido') return 'pedido';
  if (path === 'carrinho') return 'carrinho';
  if (path === 'checkout') return 'checkout';
  if (path === 'revisao') return 'revisao';
  return 'home';
}

function MainSite() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Sync scroll reveal on page changes
  useScrollReveal([currentPage]);

  // Handle URL history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header with working navigation */}
      <Navbar
        onNavigate={navigateTo}
        currentPage={currentPage}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* The Original Scrollytelling Truck Video Animation playing smoothly */}
            <HeroTruckAnimation />

            {/* Section 3: Seja bem-vindo & Categorias (id="produtos") */}
            <Hero onOpenCatalog={() => navigateTo('pedido')} />

            {/* Section 4: Para quem atendemos */}
            <AudienceSection />

            {/* Section 5: Por que escolher a Max Frios */}
            <BenefitsSection />

            {/* Section 6: Como funciona */}
            <HowItWorksSection onOpenCatalog={() => navigateTo('pedido')} />

            {/* Section 7: Atendimento para empresas */}
            <CompanySupplySection />

            {/* Section 8: Eventos */}
            <EventBannerSection onOpenCalculator={() => setIsCalculatorOpen(true)} />

            {/* Section 9: Uma operação preparada para entregar */}
            <OperationSection />

            {/* Section 10: Entregamos na sua região */}
            <DeliveryRegionsSection />

            {/* Section 11: Onde estamos */}
            <LocationSection />

            {/* Section 12: Precisa de gelo ou bebidas? */}
            <CtaContactSection onOpenCatalog={() => navigateTo('pedido')} />
          </>
        )}

        {currentPage === 'pedido' && (
          <PedidoPage onNavigate={navigateTo} />
        )}

        {currentPage === 'carrinho' && (
          <CarrinhoPage onNavigate={navigateTo} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'revisao' && (
          <RevisaoPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenCatalog={() => navigateTo('pedido')} />

      {/* Slide-over cart drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Interactive Event Calculator */}
      <EventCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainSite />
    </CartProvider>
  );
}
