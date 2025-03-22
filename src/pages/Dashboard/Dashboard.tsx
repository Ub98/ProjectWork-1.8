import ChartTab from "../../components/common/ChartTab";
import MeteoLineChart from "../../components/dashboard/MeteoLineChart";
import ProductsList from "../../components/dashboard/ProductsList";
import ResourceCard from "../../components/dashboard/ResourceCard";
import DemographicCard from "../../components/dashboard/DemographicCard";
import MonthlyProductionChart from "../../components/dashboard/MonthlyProductionChart";

export default function Dashboard() {
  return (
    <>
      
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <ResourceCard />

          <MonthlyProductionChart />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <ProductsList />
          
        </div>
        <div className="col-span-12 xl:col-span-6">
          <DemographicCard />
        </div>

        <div className="col-span-12">
          <MeteoLineChart />
        </div>
      </div>
    </>
  );
}
