import React from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/company';

export default function RevisaoPage({ onNavigate }) {
  const { cart, subtotal, totalItemsCount, deliveryInfo, sendToWhatsApp } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-slate-500 font-medium text-sm">Seu carrinho está vazio.</p>
        <button
          onClick={() => onNavigate('pedido')}
          className="mt-4 rounded-full gradient-ice px-6 py-2.5 text-xs font-bold text-white shadow-sm"
        >
          Voltar ao cardápio
        </button>
      </div>
    );
  }

  const pagamentos = {
    pix: '📱 Pix',
    cartao: '💳 Cartão de Crédito / Débito na Entrega',
    dinheiro: '💵 Dinheiro',
    faturado: '📄 Faturado PJ (Empresa Cadastrada)',
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-36 text-left">
      <main className="mx-auto max-w-3xl space-y-6 px-4 pb-5 pt-12 md:pt-16">
        
        {/* Navigation */}
        <div>
          <button
            onClick={() => onNavigate('checkout')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos dados de entrega</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          📋 Revisão do seu pedido
        </h1>

        {/* Card 1: Itens */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Produtos Selecionados ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'})
            </h2>
            <button
              onClick={() => onNavigate('pedido')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Editar produtos
            </button>
          </div>

          <ul className="space-y-3">
            {cart.map((item) => {
              const total = (item.preco || 0) * item.quantidade;
              return (
                <li key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-sm truncate">
                        {item.quantidade}x {item.nome}
                      </div>
                      <div className="text-slate-500">{item.embalagem}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-900 shrink-0">
                    {item.preco === 0 ? 'A consultar' : `R$ ${total.toFixed(2)}`}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-base font-extrabold text-slate-900">
            <span>Subtotal Estimado:</span>
            <span className="font-mono text-xl text-blue-600">R$ {subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Card 2: Endereço & Agendamento */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-900">
              Dados de Entrega & Pagamento
            </h2>
            <button
              onClick={() => onNavigate('checkout')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Alterar dados
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-slate-500 font-bold block mb-1">Destinatário:</span>
              <p className="font-bold text-slate-900">{deliveryInfo.nome || 'Não informado'}</p>
              <p className="text-slate-600">{deliveryInfo.telefone || 'Telefone do WhatsApp'}</p>
            </div>

            <div>
              <span className="text-slate-500 font-bold block mb-1">Local em Manaus:</span>
              <p className="font-bold text-slate-900">{deliveryInfo.endereco || 'Endereço a combinar'}</p>
              <p className="text-slate-600">Bairro: {deliveryInfo.bairro} — Manaus/AM</p>
              {deliveryInfo.referencia && (
                <p className="text-blue-600">Ref: {deliveryInfo.referencia}</p>
              )}
            </div>

            <div>
              <span className="text-slate-500 font-bold block mb-1">Data & Horário:</span>
              <p className="font-bold text-slate-900">{deliveryInfo.dataEntrega || 'Hoje'}</p>
              <p className="text-slate-600">{deliveryInfo.horario || 'Imediato / Próxima Rota'}</p>
            </div>

            <div>
              <span className="text-slate-500 font-bold block mb-1">Pagamento:</span>
              <p className="font-bold text-slate-900">
                {pagamentos[deliveryInfo.formaPagamento] || deliveryInfo.formaPagamento}
              </p>
            </div>
          </div>

          {deliveryInfo.observacoes && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-bold block">Observações:</span>
              <p className="text-slate-700 italic">{deliveryInfo.observacoes}</p>
            </div>
          )}
        </div>

        {/* WhatsApp Explanation Box */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Como funciona a confirmação:</span>
            Ao clicar abaixo, abriremos o WhatsApp oficial da Distribuidora com a mensagem do seu pedido já pronta e formatada para despacho pela nossa frota.
          </div>
        </div>

        {/* Bottom Floating Bar */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4">
          <button
            onClick={sendToWhatsApp}
            type="button"
            className="pointer-events-auto mx-auto flex w-full max-w-3xl items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-4 text-center text-base font-extrabold text-white shadow-xl shadow-emerald-600/30 transition-transform active:scale-[0.99]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>FINALIZAR E ENVIAR NO WHATSAPP</span>
          </button>
        </div>

      </main>
    </div>
  );
}
