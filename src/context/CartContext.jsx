import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/company';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maxfrios_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    nome: '',
    telefone: '',
    bairro: 'Santo Antônio',
    endereco: '',
    referencia: '',
    tipoEntrega: 'entrega', // 'entrega' ou 'retirada'
    formaPagamento: 'pix', // 'pix', 'cartao', 'dinheiro', 'faturado'
    trocoPara: '',
    observacoes: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('maxfrios_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + quantity } : item
        );
      }
      return [...prev, { ...product, quantidade: quantity }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantidade + delta;
            return newQty > 0 ? { ...item, quantidade: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addBulkItems = (items) => {
    setCart((prev) => {
      let updated = [...prev];
      items.forEach((newItem) => {
        const idx = updated.findIndex((item) => item.id === newItem.id);
        if (idx >= 0) {
          updated[idx] = {
            ...updated[idx],
            quantidade: updated[idx].quantidade + newItem.quantidade,
          };
        } else {
          updated.push(newItem);
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantidade, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.preco || 0) * item.quantidade, 0);

  // Estimativa de taxa de entrega baseada no bairro
  const taxaEntrega = deliveryInfo.tipoEntrega === 'retirada' ? 0 : (subtotal >= 250 ? 0 : 15);

  const totalFinal = subtotal + taxaEntrega;

  const generateWhatsAppMessage = () => {
    const lines = [
      `🧊 *NOVO PEDIDO — MAX FRIOS DISTRIBUIDORA*`,
      `Olá! Vim pelo site oficial e gostaria de confirmar meu pedido:`,
      ``,
      `📋 *ITENS DO PEDIDO:*`,
    ];

    cart.forEach((item, index) => {
      const itemSubtotal = (item.preco || 0) * item.quantidade;
      const precoText = item.preco > 0 ? `(R$ ${itemSubtotal.toFixed(2)})` : `(Sob consulta)`;
      lines.push(`${index + 1}. *${item.quantidade}x* ${item.nome} ${precoText}`);
      if (item.embalagem) {
        lines.push(`   └ Embalagem: ${item.embalagem}`);
      }
    });

    lines.push(``);
    lines.push(`💰 *Subtotal dos Itens:* R$ ${subtotal.toFixed(2)}`);
    if (deliveryInfo.tipoEntrega === 'retirada') {
      lines.push(`🏬 *Retirada na Fábrica:* Grátis (Av. Padre Agostinho Caballero Martin, 305)`);
    } else {
      lines.push(`🚚 *Taxa de Entrega estimada:* ${taxaEntrega === 0 ? 'GRÁTIS (Pedido acima de R$ 250)' : 'R$ 15,00'}`);
      lines.push(`💵 *VALOR TOTAL ESTIMADO:* R$ ${totalFinal.toFixed(2)}`);
    }

    lines.push(``);
    lines.push(`📍 *DADOS DE ENTREGA:*`);
    lines.push(`• *Nome / Razão:* ${deliveryInfo.nome || 'Não informado'}`);
    lines.push(`• *Telefone:* ${deliveryInfo.telefone || 'Mesmo do WhatsApp'}`);
    lines.push(`• *Bairro em Manaus:* ${deliveryInfo.bairro}`);
    if (deliveryInfo.tipoEntrega === 'entrega') {
      lines.push(`• *Endereço / Local:* ${deliveryInfo.endereco || 'A combinar pelo chat'}`);
      if (deliveryInfo.referencia) {
        lines.push(`• *Ponto de Referência:* ${deliveryInfo.referencia}`);
      }
    } else {
      lines.push(`• *Modalidade:* Retirada no Balcão da Fábrica`);
    }

    const pagamentos = {
      pix: 'Pix (Chave rápida no ato)',
      cartao: 'Cartão de Débito/Crédito (Levar maquininha)',
      dinheiro: deliveryInfo.trocoPara ? `Dinheiro (Troco para R$ ${deliveryInfo.trocoPara})` : 'Dinheiro (Sem troco)',
      faturado: 'Boleto Faturado PJ (Cliente Cadastrado)',
    };
    lines.push(`• *Forma de Pagamento:* ${pagamentos[deliveryInfo.formaPagamento] || deliveryInfo.formaPagamento}`);

    if (deliveryInfo.observacoes) {
      lines.push(`• *Observações:* ${deliveryInfo.observacoes}`);
    }

    lines.push(``);
    lines.push(`Por favor, confirmem a disponibilidade dos itens e o tempo estimado para despacho da rota. Obrigado!`);

    return encodeURIComponent(lines.join('\n'));
  };

  const sendToWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        addBulkItems,
        isCartOpen,
        setIsCartOpen,
        deliveryInfo,
        setDeliveryInfo,
        totalItemsCount,
        subtotal,
        taxaEntrega,
        totalFinal,
        generateWhatsAppMessage,
        sendToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
