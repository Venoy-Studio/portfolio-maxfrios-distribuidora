# Max Frios Distribuidora — Redesign & Plataforma de Pedidos (Manaus/AM)

Versão clonada e substancialmente aprimorada do website da [Max Frios Distribuidora](https://maxfriosdistribuidora.com.br/), desenvolvida com direção de arte personalizada, repertório autoral anti-IA, alta conversão (CRO) e contatos fictícios para demonstração.

---

## 🧊 Sobre a Operação
A **Max Frios Distribuidora** é uma fábrica própria de gelo e distribuidora de bebidas com sede no bairro Santo Antônio, em **Manaus/AM**.
* **Capacidade de Produção:** 50 toneladas/dia de gelo em cubos e escamas.
* **Logística:** Frota própria de 8 veículos organizados por rotas cobrindo da Zona Sul e Centro-Sul até marinas e flutuantes do Tarumã.
* **Segmentos:** Bares, restaurantes, buffets, condomínios, eventos particulares, hotéis e abastecimento industrial.

---

## 🚀 Principais Melhorias em Relação ao Site Original

| Aspecto | Site Original | Versão Redesenhada & Aprimorada |
| :--- | :--- | :--- |
| **Identidade Visual & Estética** | Template básico e genérico com tipografia comum | Direção de arte glacial autoral (*Deep Arctic Navy*, detalhes em ciano e vidro polar), atmosfera autêntica do calor de Manaus. |
| **Experiência de Compra (CRO)** | Redirecionamento para página `/pedido` simples | Catálogo interativo integrado, busca em tempo real com debounce, filtros de categoria com contadores e steppers diretos nos cards. |
| **Calculadora de Bebidas e Gelo** | Apenas um botão estático prometendo cálculo | **Calculadora interativa completa e calibrada para Manaus**, ajustando consumo para calor amazônico (+30% sob sol), dividindo gelo cubo (copos) e gelo escama (coolers), com botão de inserção em 1 clique no carrinho. |
| **Carrinho & Checkout (WhatsApp)** | Fluxo rígido sem barra de frete | **Slide-over Cart Drawer** moderno, barra progressiva de frete grátis por valor, seletor de rotas/bairros de Manaus, opções de entrega ou retirada na fábrica, e gerador de mensagem estruturada para WhatsApp. |
| **Segmento B2B / Restaurantes** | Pouco detalhado | Seção dedicada ao B2B com faturamento quinzenal/mensal PJ, reposição emergencial aos sábados e laudos sanitários. |
| **Logística & Bairros de Manaus** | Lista estática de bairros | Painel interativo com status em tempo real, tempos médios de entrega e suporte logístico para embarcações e piers do Tarumã. |
| **Mobile First & Conversão** | Sem barra de acesso rápido | Barra inferior sticky no mobile com botão de cálculo, acesso rápido ao WhatsApp e drawer do pedido com touch targets de 48px+. |

---

## 📞 Contatos Fictícios de Demonstração
Conforme solicitado, todos os contatos públicos foram anonimizados para dados fictícios estruturados no padrão de Manaus:
* **WhatsApp de Pedidos:** `(92) 98452-9010`
* **Central Telefônica Fixa:** `(92) 3215-4080`
* **Canal Corporativo B2B:** `(92) 98452-9011`
* **E-mails:** `pedidos@maxfriosdistribuidora.com.br` | `comercial@maxfriosdistribuidora.com.br`
* **Endereço:** Av. Padre Agostinho Caballero Martin, 305 - Santo Antônio, Manaus - AM, 69035-090
* **CNPJ Fictício:** `18.492.301/0001-44`
* **Instagram Fictício:** `@maxfrios.distribuidora`

---

## 🛠️ Tecnologias Utilizadas
* **React 19**
* **Vite 8**
* **Tailwind CSS v4** (com `@tailwindcss/vite`)
* **Lucide React** (iconografia moderna)
* **Arquitetura modular de dados:** Catálogo completo com 67 produtos reais extraídos do site original (Gelos 5kg a 40kg, Fardos 350ml e 269ml, Long Necks em caixa c/ 24, Litrões, Destilados e Água/Refrigerantes regionais como Baré Guaraná).

---

## 💻 Como Rodar o Projeto

1. Acesse o diretório do projeto:
```bash
cd "C:\Users\paulovenoy\.gemini\antigravity\scratch\maxfrios-distribuidora"
```

2. Instale as dependências (já instaladas):
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

4. Ou visualize o build de produção:
```bash
npm run build
npm run preview
```
Servidor ativo em: `http://127.0.0.1:4173/`
