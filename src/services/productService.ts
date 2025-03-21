export const products = [
    { name: "Grano", unit: "kg" },
    { name: "Mais", unit: "kg" },
    { name: "Riso", unit: "kg" },
    { name: "Orzo", unit: "kg" },
    { name: "Patate", unit: "kg" },
    { name: "Fertilizzante Azotato", unit: "sacco" },
    { name: "Pesticida Organico", unit: "litro" },
  ];
  
  // Funzione per generare un numero casuale tra min e max
  const getRandomFloat = (min: number, max: number): number =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2));



  
  // Funzione per generare dati di produzione
  export const generateProductData = () => {
    return products.map((product, index) => {
      const price = getRandomFloat(3, 30); // Prezzo casuale tra 3€ e 30€
      const change = parseFloat((Math.random() * (2 - -2) + -2).toFixed(2));
      const percentageChange = parseFloat(((change / price) * 100).toFixed(2));
      return {
        id: index + 1,
        product: product.name,
        unit: product.unit,
        pricePerUnit: price,
        change: change,
        percentageChange: percentageChange
      };
    });
  };
  