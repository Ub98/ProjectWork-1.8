import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import Badge from "../ui/badge/Badge";
  import useUtilsStore from "../../stores/useUtilsStore";
  import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../icons";
  
  // Definizione dell'interfaccia per il prodotto
  interface Product {
    id: number;
    commodity: string;
    price: number;
    currency: string;
    change: number;
    date: string;
  }
  
  // Funzione per generare dati casuali (prezzo e variazione)
  function generateRandomData() {
    const price = parseFloat((Math.random() * (30 - 3) + 3).toFixed(2));
    const change = parseFloat((Math.random() * (2 - -2) + -2).toFixed(2));
    return { price, change };
  }
  
  
  const commodities = [
    "Grano",
    "Mais",
    "Fertilizzante Azotato",
    "Pesticida Organico",
    "Semi di Soia",
    "Orzo",
    "Riso",
    "Fertilizzante Fosfatico",
    "Pesticida Chimico",
    "Sementi di Lino",
    "Patate",
    "Sementi di Zucca",
  ];
  
  export default function ProductsList() {
    const days  = useUtilsStore((state)=> state.days);
    const [tableData, setTableData] = useState<Product[]>([]);
  
    useEffect(() => {
      const data = commodities.map((commodity, index) => {
        const { price, change } = generateRandomData();
        return {
          id: index + 1,
          commodity: commodity,
          price: price,
          currency: "€",
          change: change,
          date: new Date().toLocaleDateString("it-IT"),
        };
      });
      setTableData(data);
    }, [days]);
  
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Prodotti
            </h3>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Prodotto
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Prezzo
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Data
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Variazioni
                </TableCell>
              </TableRow>
            </TableHeader>
  
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {tableData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.commodity}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {`${product.currency} ${product.price}`}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.date}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={product.change < 0 ? "error" : "success"}
                    >
                      {product.change > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      {product.change}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  