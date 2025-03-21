import { IMonthlyProduction, IProduction } from "../models/IProduction";
import { products } from "./productService";
import { generateRandomResources } from "./resourceService";


const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = <T>(array: readonly T[]): T =>
  array[getRandomInt(0, array.length - 1)];

export const generateProductions = (count: number): IProduction[] => {
  if (count <= 0) return [];

  const productions: IProduction[] = [];
  const resources = generateRandomResources(20); // Creiamo un set di risorse disponibili

  for (let i = 0; i < count; i++) {
    const product = getRandomElement(products);
    const usedResources = getRandomElement(resources); // Seleziona una risorsa casuale

    // Simula una quantità casuale di risorse usate
    const quantityUsed = getRandomInt(5, 50);
    
    // Genera una data casuale negli ultimi 30 giorni
    const productionDate = new Date();
    productionDate.setDate(productionDate.getDate() - getRandomInt(0, 60));

    productions.push({
      id: i + 1,
      product: product.name,
      resourcesUsed: [{ 
        resource: usedResources.name, 
        quantity: quantityUsed, 
        unit: usedResources.unit 
      }],
      productionDate: productionDate.toISOString(),
      quantityProduced: getRandomInt(10, 500), // Quantità prodotta casuale
      unit: product.unit
    });
  }

  return productions;
};


export const generateMonthlyProductionData = (): IMonthlyProduction[] => {
    const monthlyProduction: { [key: number]: number } = {};
  
    // Generiamo dati di produzione casuali per un anno
    const productions: IProduction[] = generateProductions(500);
  
    // Raggruppiamo la produzione per mese
    productions.forEach(({ productionDate, quantityProduced }) => {
      const date = new Date(productionDate);
      const month = date.getMonth(); // Ottiene il numero del mese (0 = Gennaio, 11 = Dicembre)
  
      if (!monthlyProduction[month]) {
        monthlyProduction[month] = 0;
      }
      monthlyProduction[month] += quantityProduced;
    });
  
    // Convertiamo i dati in un array per il grafico
    const months = [
      "Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
      "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
    ];
  
    return months.map((month, index) => ({
      month,
      totalProduced: monthlyProduction[index] || 0,
    }));
  };
