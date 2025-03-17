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

interface Card{
    title: string
    value: string
    icon:any
    change: number
}

export default function ResourceCard() {
    const days = useUtilsStore((state)=> state.days)
    const [stats, setStats] = useState<Card[]>([]);
    
      const getRandomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    
      const generateStats = () => {
        const scaleFactor = days === 1 ? 0.5 : days === 7 ? 1 : 1.5; // Fattore di scala per i giorni
    
        return [
          {
            title: "Produzione",
            value: `${Math.floor(getRandomInt(5000, 20000) * scaleFactor)} kg`,
            icon: <BoxIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-10, 15),
          },
          {
            title: "Risorse",
            value: `${Math.floor(getRandomInt(100, 500) * scaleFactor)} unità`,
            icon: <ShootingStarIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-10, 10),
          },
          {
            title: "Reddito",
            value: `€${Math.floor(getRandomInt(15000, 50000) * scaleFactor)}`,
            icon: <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-10, 20),
          },
          {
            title: "Sostenibilità",
            value: `${Math.floor(getRandomInt(50, 100) * scaleFactor)}%`,
            icon: <PieChartIcon className="text-gray-800 size-6 dark:text-white/90" />,
            change: getRandomInt(-5, 10),
          },
        ];
      };
    
      useEffect(() => {
        setStats(generateStats());
      }, [days]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {stats.map((stat, index) => {
          const isPositive = stat.change >= 0;
          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
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
