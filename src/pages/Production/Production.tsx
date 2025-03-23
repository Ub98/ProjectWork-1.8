import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ProductionList from "../../components/dashboard/ProductionList";
import ProductsList from "../../components/dashboard/ProductsList";
import Button from "../../components/ui/button/Button";
import ModalFormProduction from "../../components/ModalForm/FormProduction/ModalFormProduction";
import useModalStore from "../../stores/useModalStore";

export default function Production() {
  const { modalFormProduction, setModalFormProduction } = useModalStore();
  return (
    <>
      <PageBreadcrumb pageTitle="Produzione" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 mb-6">
        <Button
          size="sm"
          variant="primary"
          onClick={() => setModalFormProduction(!modalFormProduction)}
        >
          <span className="font-bold">+</span> Nuovo
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-7/12">
          <ProductionList />
        </div>
        <div className="w-full md:w-5/12">
          <ProductsList />
        </div>
      </div>

      <ModalFormProduction />
    </>
  );
}
