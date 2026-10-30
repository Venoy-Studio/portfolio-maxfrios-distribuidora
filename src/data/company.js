export const COMPANY_INFO = {
  nome: 'Max Frios Distribuidora',
  slogan: 'Fábrica de Gelo e Distribuidora de Bebidas em Manaus',
  razaoSocial: 'Max Frios Comércio e Distribuição de Gelo Ltda.',
  cnpj: '18.492.301/0001-44', // Contato fictício
  anoFundacao: 2013,
  capacidadeGeloTonDia: 50,
  veiculosFrota: 8,
  
  // Contatos Fictícios
  telefoneWhatsapp: '(92) 98452-9010',
  whatsappRaw: '5592984529010',
  telefoneFixo: '(92) 3215-4080',
  whatsappB2B: '(92) 98452-9011',
  email: 'pedidos@maxfriosdistribuidora.com.br',
  emailComercial: 'comercial@maxfriosdistribuidora.com.br',
  instagram: '@maxfrios.distribuidora',
  
  // Localização Fictícia / Ajustada em Manaus
  endereco: {
    logradouro: 'Av. Padre Agostinho Caballero Martin, 305',
    bairro: 'Santo Antônio',
    cidade: 'Manaus',
    uf: 'AM',
    cep: '69035-090',
    referencia: 'Próximo à Câmara Municipal e Ponte de Ferro',
    googleMapsUrl: 'https://maps.google.com/?q=Santo+Antonio+Manaus+AM',
  },

  horarios: {
    semana: 'Segunda a Sábado: 07h00 às 19h00',
    domingo: 'Domingos e Feriados: 08h00 às 14h00',
    plantaoEventos: 'Suporte emergencial para grandes eventos e flutuantes agendados',
  },

  bairrosAtendidos: [
    { nome: 'Santo Antônio (Sede)', tempoMedio: '15-30 min', rota: 'Rota 1 - Zona Oeste', status: 'Ativo Agora' },
    { nome: 'Ponta Negra & Tarumã', tempoMedio: '30-45 min', rota: 'Rota 2 - Turismo & Marinas', status: 'Ativo Agora' },
    { nome: 'Vieiralves & N. Senhora das Graças', tempoMedio: '20-40 min', rota: 'Rota 3 - Gastronomia', status: 'Ativo Agora' },
    { nome: 'Adrianópolis & Aleixo', tempoMedio: '25-45 min', rota: 'Rota 3 - Centro-Sul', status: 'Ativo Agora' },
    { nome: 'Dom Pedro & Alvorada', tempoMedio: '20-35 min', rota: 'Rota 1 - Centro-Oeste', status: 'Ativo Agora' },
    { nome: 'Flores & Parque 10', tempoMedio: '30-50 min', rota: 'Rota 4 - Centro-Sul', status: 'Ativo Agora' },
    { nome: 'Cachoeirinha & Praça 14', tempoMedio: '25-40 min', rota: 'Rota 5 - Zona Sul', status: 'Ativo Agora' },
    { nome: 'Centro Histórico & Educandos', tempoMedio: '30-45 min', rota: 'Rota 5 - Portuária & Comercial', status: 'Ativo Agora' },
    { nome: 'Compensa & São Raimundo', tempoMedio: '15-30 min', rota: 'Rota 1 - Zona Oeste', status: 'Ativo Agora' },
    { nome: 'São José & Zumbi', tempoMedio: '40-60 min', rota: 'Rota 6 - Zona Leste', status: 'Ativo Agora' },
    { nome: 'Raiz & Japiim', tempoMedio: '30-50 min', rota: 'Rota 5 - Zona Sul', status: 'Ativo Agora' },
    { nome: 'Chapada & São Geraldo', tempoMedio: '20-35 min', rota: 'Rota 3 - Centro-Sul', status: 'Ativo Agora' },
  ],

  diferenciais: [
    {
      titulo: 'Fabricação Própria de 50 Ton/Dia',
      descricao: 'Não dependemos de terceiros. Gelo produzido sob rigoroso controle sanitário com água tratada e filtragem múltipla.',
      icone: 'Factory',
    },
    {
      titulo: '8 Veículos Próprios com Rotas Rápidas',
      descricao: 'Caminhões baú térmicos e veículos ágeis distribuindo em todos os cantos de Manaus de domingo a domingo.',
      icone: 'Truck',
    },
    {
      titulo: 'Bebidas Trincando e Fardos Fechados',
      descricao: 'Estoque climatizado com as principais cervejas, refrigerantes, águas e destilados a preço direto de atacado.',
      icone: 'Snowflake',
    },
    {
      titulo: 'Atendimento B2B & Linha de Crédito',
      descricao: 'Condições faturadas para bares, restaurantes, lanchonetes, padarias, flutuantes e organizadores de eventos.',
      icone: 'Building2',
    },
  ],

  depoimentos: [
    {
      nome: 'Carlos Mendonça',
      cargo: 'Proprietário de Restaurante no Vieiralves',
      texto: 'Abastecemos 80 caixas de gelo em escama e fardos de cerveja semanalmente com a Max Frios. Pontualidade britânica, nunca deixaram faltar na nossa operação mesmo em sextas de casa cheia.',
      avaliacao: 5,
    },
    {
      nome: 'Juliana Vasconcelos',
      cargo: 'Produtora de Eventos e Festas no Tarumã',
      texto: 'A calculadora de bebidas e gelo salvou nosso luau no flutuante! Fizemos o pedido programado e os caminhões entregaram o gelo trincando e intacto direto na marina antes do embarque.',
      avaliacao: 5,
    },
    {
      nome: 'Rogério Sampaio',
      cargo: 'Gerente de Bar & Petiscaria no Santo Antônio',
      texto: 'Por estarem no nosso bairro, a entrega de emergência aos sábados à noite é imbatível. Pediu pelo WhatsApp, em 20 minutos o gelo está descarregado.',
      avaliacao: 5,
    },
  ]
};
