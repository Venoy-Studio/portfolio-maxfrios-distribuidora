import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Store, CreditCard, Banknote, QrCode, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/company';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    taxaEntrega,
    totalFinal,
    totalItemsCount,
    deliveryInfo,
    setDeliveryInfo,
    sendToWhatsApp,
  } = useCart();

  const [step, setStep] = useState('cart'); // 'cart' ou 'checkout'

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {step === 'cart' ? 'Seu Pedido' : 'Dados de Entrega'}
                </h3>
                <span className="text-xs text-slate-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} no total
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {step === 'cart' ? (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-2">
                    <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="font-bold text-slate-800 text-sm">Seu carrinho está vazio</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Selecione produtos no catálogo para montar seu pedido.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {cart.map((item) => {
                      const itemTotal = (item.preco || 0) * item.quantidade;

                      return (
                        <div
                          key={item.id}
                          className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 truncate">
                              {item.nome}
                            </h4>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {item.embalagem}
                            </div>
                            <div className="text-xs font-bold text-blue-700 font-mono mt-0.5">
                              {item.preco > 0 ? `R$ ${itemTotal.toFixed(2)}` : 'A combinar'}
                            </div>
                          </div>

                          {/* Stepper + Delete */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-full text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-slate-900">
                                {item.quantidade}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={clearCart}
                        className="text-[11px] text-slate-400 hover:text-red-600 font-medium"
                      >
                        Limpar carrinho
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Step 2: Checkout details */
              <div className="space-y-3.5 text-xs">
                <button
                  onClick={() => setStep('cart')}
                  className="text-blue-600 font-bold hover:underline mb-1"
                >
                  ← Voltar para itens
                </button>

                {/* Delivery Mode */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryInfo({ ...deliveryInfo, tipoEntrega: 'entrega' })}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                      deliveryInfo.tipoEntrega === 'entrega'
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Entrega na Rota</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryInfo({ ...deliveryInfo, tipoEntrega: 'retirada' })}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all ${
                      deliveryInfo.tipoEntrega === 'retirada'
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Retirar na Loja</span>
                  </button>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nome do cliente ou estabelecimento</label>
                  <input
                    type="text"
                    placeholder="Seu nome ou empresa"
                    value={deliveryInfo.nome}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, nome: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Bairro Selector */}
                {deliveryInfo.tipoEntrega === 'entrega' && (
                  <>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Bairro em Manaus</label>
                      <select
                        value={deliveryInfo.bairro}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, bairro: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                      >
                        {COMPANY_INFO.bairrosAtendidos.map((b) => (
                          <option key={b.nome} value={b.nome}>
                            {b.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Endereço de entrega</label>
                      <input
                        type="text"
                        placeholder="Rua, número, condomínio ou flutuante"
                        value={deliveryInfo.endereco}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, endereco: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </>
                )}

                {/* Payment */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Forma de pagamento</label>
                  <select
                    value={deliveryInfo.formaPagamento}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, formaPagamento: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="pix">Pix</option>
                    <option value="cartao">Cartão de Crédito / Débito na entrega</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="faturado">Faturado PJ (Empresas cadastradas)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-sm font-extrabold text-slate-900">
                <span>Subtotal</span>
                <span className="font-mono text-base text-blue-700">R$ {subtotal.toFixed(2)}</span>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full rounded-full gradient-ice py-3 text-sm font-extrabold text-white shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>Avançar para Entrega</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={sendToWhatsApp}
                  className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-extrabold text-white shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>Enviar Pedido pelo WhatsApp</span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
