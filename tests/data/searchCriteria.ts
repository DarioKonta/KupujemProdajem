export const searchCriteria = {
  kategorija: 'Odeća | Ženska',
  grupa: 'Bluze',
  cenaOd: 100,
  stanje: ['Novo', 'Nekorišćeno (polovno)'], // postaje readonly string[]
} as const; // Pretvara sve u readonly
