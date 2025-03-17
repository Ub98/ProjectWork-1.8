import ChartTab from "../../components/common/ChartTab";
import MeteoLineChart from "../../components/dashboard/MeteoLineChart";
import ProductsList from "../../components/dashboard/ProductsList";
import ResourceCard from "../../components/dashboard/ResourceCard";
import DemographicCard from "../../components/dashboard/DemographicCard";
import MonthlySalesChart from "../../components/dashboard/MonthlySalesChart";

export default function Dashboard() {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 mb-6">
        <ChartTab />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <ResourceCard />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ProductsList />
        </div>

        <div className="col-span-12">
          <MeteoLineChart />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <DemographicCard />
        </div>
      </div>
    </>
  );
}
