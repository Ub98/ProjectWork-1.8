import { IResource } from './../models/IResource';

const statuses: readonly string[] = ["Disponibile", "Scorte Basse", "Esaurito"];

const categories: readonly { name: string; units: string[]; resources: string[] }[] = [
  { 
    name: "Fertilizzanti", 
    units: ["kg", "sacchi"], 
    resources: ["Fertilizzante Azotato", "Fertilizzante Fosfatico", "Fertilizzante Potassico", "Compost Organico"] 
  },
  { 
    name: "Semi", 
    units: ["kg", "sacchi"], 
    resources: ["Semi di Mais", "Semi di Grano", "Semi di Riso", "Semi di Pomodoro"] 
  },
  { 
    name: "Irrigazione", 
    units: ["litri", "unità"], 
    resources: ["Kit di Irrigazione a Goccia", "Sistema di Irrigazione a Spruzzo", "Pompa per Irrigazione", "Tubo per Irrigazione"] 
  },
  { 
    name: "Pesticidi", 
    units: ["litri", "kg"], 
    resources: ["Erbicida", "Insetticida", "Fungicida", "Rodenticida"] 
  }
];

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = <T>(array: readonly T[]): T =>
  array[getRandomInt(0, array.length - 1)];

const getStatusBasedOnQuantity = (quantity: number): string => {
  if (quantity === 0) return "Esaurito";  // Se la quantità è 0, stato "Esaurito"
  if (quantity >= 50) return "Disponibile";  // Se la quantità è 50 o maggiore, stato "Disponibile"
  return "Scorte Basse";  // Altrimenti, stato "Scorte Basse"
};

const generateResource = (id: number, lastUpdate: string): IResource => {
  const category = getRandomElement(categories);
  const name = getRandomElement(category.resources);
  const unit = getRandomElement(category.units);
  const quantity = getRandomInt(0, 100);
  const status = getStatusBasedOnQuantity(quantity);

  return {
    id,
    name,
    category: category.name,
    quantity,
    unit,
    status,
    lastUpdate
  };
};

export const generateRandomResources = (count: number): IResource[] => {
  const lastUpdate = new Date().toISOString();
  return Array.from({ length: count }, (_, i) => generateResource(i + 1, lastUpdate));
};
