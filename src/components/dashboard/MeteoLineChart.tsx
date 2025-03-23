import { useEffect, useState } from "react";
import useUtilsStore from "../../stores/useUtilsStore";
import useOpenMeteoStore from "../../stores/useOpenMeteoStore";
import Chart from "react-apexcharts";
import { IMeteoDaily, IMeteoHourly } from "../../models/IMeteo";
import { ApexOptions } from "apexcharts";
import { format } from "date-fns";
import ChartTab from "../common/ChartTab";

export default function MeteoLineChart() {
  const { days, coordinates } = useUtilsStore();
  const [meteoDaily, setMeteoDaily] = useState<IMeteoDaily | null>(null);
  const [meteoHourly, setMeteoHourly] = useState<IMeteoHourly | null>(null);

  useEffect(() => {
    (async () => {
      if (days !== 1) {
        const data = await useOpenMeteoStore
          .getState()
          .getMeteoDaily(coordinates.lat, coordinates.lng, days);
        setMeteoDaily(data);
        setMeteoHourly(null);
      } else {
        const data = await useOpenMeteoStore
          .getState()
          .getMeteoHourly(coordinates.lat, coordinates.lng, days);
        setMeteoHourly(data);
        setMeteoDaily(null);
      }
    })();
  }, [days, coordinates]);

  // Format dates based on whether data is daily or hourly
  const formattedDates = meteoDaily?.daily?.time
    ? meteoDaily.daily.time.map((date) => format(new Date(date), "dd MMM yyyy"))
    : meteoHourly?.hourly?.time
    ? meteoHourly.hourly.time.map((date) => format(new Date(date), "HH"))
    : [];

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF", "#1c3bff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: formattedDates,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Temperatura MAX (°C)",
      data:
        meteoDaily?.daily?.temperature_2m_max ??
        meteoHourly?.hourly?.temperature_2m ??
        [],
    },
    {
      name: "Temperatura MIN (°C)",
      data: meteoDaily?.daily?.temperature_2m_min ?? [],
    },
    {
      name: "Possibili piogge",
      data:
        meteoDaily?.daily?.precipitation_probability_max ??
        meteoHourly?.hourly?.precipitation_probability ??
        [],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Meteo
          </h3>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
