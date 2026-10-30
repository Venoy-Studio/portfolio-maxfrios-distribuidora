// Calculadora especializada de bebidas e gelo calibrada para o clima térmico de Manaus (AM)
export function calculateEventNeeds({
  adults = 30,
  duration = 5,
  hasBeer = true,
  hasSpirits = true,
  hasNonAlcoholic = true,
  hasBarbecue = true,
  environment = 'externo', // 'externo' (flutuante, piscina, sítio) ou 'interno' (climatizado)
}) {
  const people = Math.max(5, parseInt(adults, 10) || 30);
  const hours = Math.max(2, parseInt(duration, 10) || 5);
  
  // Fator Manaus: sob calor de 34°C+ ao ar livre, o consumo de líquidos e a taxa de derretimento do gelo sobem em 30%
  const thermalFactor = environment === 'externo' ? 1.3 : 1.0;

  // 1. GELO EM ESCAMA (Para caixas térmicas, coolers e resfriamento das latas/garrafas)
  // Base: 1 saco de 20kg atende bem cerca de 25-30 pessoas em 5h de festa externa
  const rawEscamaKg = Math.ceil((people * 0.75 * (hours / 5) * thermalFactor));
  // Melhor combinação de pacotes (priorizando sacos de 20kg e 10kg)
  const escama20kgSacks = Math.floor(rawEscamaKg / 20) || 1;
  const escamaRemaining = rawEscamaKg % 20;
  const escama10kgSacks = escamaRemaining > 8 ? 1 : (escama20kgSacks === 0 ? 1 : 0);

  // 2. GELO EM CUBOS (Para servir nos copos, drinks, whisky e baldes de mesa)
  // Base: 0.5kg a 0.7kg por pessoa se houver destilados
  const rawCuboKg = hasSpirits 
    ? Math.ceil(people * 0.65 * (hours / 5)) 
    : Math.ceil(people * 0.35 * (hours / 5));
  const cubo10kgPacks = Math.floor(rawCuboKg / 10);
  const cubo5kgPacks = Math.ceil((rawCuboKg % 10) / 5) || (cubo10kgPacks === 0 ? 1 : 0);

  // 3. CERVEJA (Fardos c/ 12 latas)
  // Base: ~4 a 6 latas por adulto apreciador de cerveja para 5h
  let beerCans = 0;
  let beerFardos = 0;
  if (hasBeer) {
    // Estimando que ~80% dos convidados bebem cerveja
    const beerDrinkers = Math.ceil(people * 0.85);
    const cansPerPerson = Math.ceil(4.5 * (hours / 5));
    beerCans = beerDrinkers * cansPerPerson;
    beerFardos = Math.ceil(beerCans / 12);
  }

  // 4. DESTILADOS (Garrafas 1L)
  // Base: 1 garrafa de whisky/vodka/gin para cada 10 a 12 adultos consumidores
  let spiritBottles = 0;
  if (hasSpirits) {
    spiritBottles = Math.max(1, Math.ceil(people * 0.4 / 7));
  }

  // 5. ÁGUA MINERAL (Fardo c/ 12 garrafas ou Galões 20L)
  // Em Manaus a hidratação é mandatória
  const rawWaterLiters = Math.ceil(people * 0.8 * (hours / 5) * thermalFactor);
  const waterFardos500ml = Math.ceil(rawWaterLiters / 6); // 1 fardo c/ 12 de 500ml = 6 litros
  const waterGaloes20L = people >= 40 ? Math.ceil(rawWaterLiters / 20) : 0;

  // 6. REFRIGERANTES / ENERGÉTICOS (Fardos)
  let sodaLiters = 0;
  let sodaFardos2L = 0;
  if (hasNonAlcoholic) {
    sodaLiters = Math.ceil(people * 0.5 * (hours / 5));
    sodaFardos2L = Math.max(1, Math.ceil(sodaLiters / 12)); // Fardo c/ 6 PETs de 2L = 12 litros
  }

  // Estimativa orçamentária média
  const estimatedCost = (escama20kgSacks * 20) + 
                        (escama10kgSacks * 13) + 
                        (cubo10kgPacks * 17) + 
                        (cubo5kgPacks * 12) + 
                        (beerFardos * 50) + 
                        (spiritBottles * 120) + 
                        (waterFardos500ml * 22) + 
                        (sodaFardos2L * 46);

  return {
    people,
    hours,
    environment,
    recommendations: {
      geloEscama: {
        totalKg: (escama20kgSacks * 20) + (escama10kgSacks * 10),
        sacos20kg: escama20kgSacks,
        sacos10kg: escama10kgSacks,
        finalidade: 'Garante latas e garrafas trincando na caixa térmica até o fim da festa',
      },
      geloCubo: {
        totalKg: (cubo10kgPacks * 10) + (cubo5kgPacks * 5),
        pacotes10kg: cubo10kgPacks,
        pacotes5kg: cubo5kgPacks,
        finalidade: 'Cubos puros e maciços para copos, doses de whisky e drinks tropicais',
      },
      cerveja: hasBeer ? {
        totalLatas: beerCans,
        fardos12un: beerFardos,
        finalidade: `Média de ${(beerCans / people).toFixed(1)} latas por pessoa para ${hours}h`,
      } : null,
      destilados: hasSpirits ? {
        garrafas1L: spiritBottles,
        finalidade: 'Whiskys 12 anos, Gin ou Vodka para os apreciadores',
      } : null,
      agua: {
        litros: rawWaterLiters,
        fardos500ml: waterFardos500ml,
        galoes20L: waterGaloes20L,
        finalidade: 'Hidratação indispensável para o calor amazonense',
      },
      refrigerantes: hasNonAlcoholic ? {
        fardos2L: sodaFardos2L,
        finalidade: 'Guaraná Baré e Coca-Cola para convidados e crianças',
      } : null,
    },
    estimatedCost,
  };
}
