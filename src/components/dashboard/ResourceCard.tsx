import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIcon,
  DollarLineIcon,
  PieChartIcon,
  ShootingStarIcon,
} from "../../icons";

import useUtilsStore from "../../stores/useUtilsStore";
import Badge from "../ui/badge/Badge";
import { calculateGeneralSustainabilityPercentage } from "../../services/sustainabilityService";

interface Card{
    title: string
    value: string
    icon:any
    change: number
}

export default function ResourceCard() {
    const productions = useUtilsStore((state)=> state.production)
    const resources = useUtilsStore((state)=> state.resources)
    const products = useUtilsStore((state)=> state.products)
    const [stats, setStats] = useState<Card[]>([]);
    
      const getRandomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      const productionQuantities = () => {
        return productions.reduce((sum, p) => sum + p.quantityProduced, 0);
      };

      const resourceQuantities = () => {
        return resources.reduce((sum, r) => sum + r.quantity, 0);
      };

      const incomeQuantities = () => {
        return productions.reduce((totalIncome, production) => {
          const product = products.find(p => p.product === production.product);
          if (product) {
            return totalIncome + production.quantityProduced * product.pricePerUnit;
          }
          return totalIncome;
        }, 0);
      };

    
      const generateStats = () => {
        return [
          {
            title: "Produzione",
            value: `${productionQuantities()} kg`,
            icon: <BoxIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-10, 15),
          },
          {
            title: "Risorse",
            value: `${resourceQuantities()} unità`,
            icon: <ShootingStarIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-10, 10),
          },
          {
            title: "Reddito",
            value: `€${incomeQuantities().toFixed(2)}`,
            icon: <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-10, 20),
          },
          {
            title: "Sostenibilità",
            value: `${calculateGeneralSustainabilityPercentage(productions)}%`,
            icon: <PieChartIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-5, 10),
          },
        ];
      };
    
      useEffect(() => {
        setStats(generateStats());
      }, []);

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {stats.map((stat, index) => {
          const isPositive = stat.change >= 0;
          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex-1"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                {stat.icon}
              </div>

              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {stat.value}
                  </h4>
                </div>
                <Badge color={isPositive ? "success" : "error"}>
                  {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {stat.change}%
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
