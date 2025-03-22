import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ProductionList from "../../components/dashboard/ProductionList";
import ProductsList from "../../components/dashboard/ProductsList";
import FormProduction from "../../components/ModalForm/FormProduction";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

export default function Production() {
  const { isOpen, openModal, closeModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <>
      <PageBreadcrumb pageTitle="Produzione" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 mb-6">
        <Button size="sm" variant="primary" onClick={openModal}>
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

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10 max-h-screen overflow-y-auto custom-scrollbar"
      >
        <FormProduction/>
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Close
          </button>
          <button
            onClick={() => document.getElementById("submitFormProduction")?.click()}
            type="button"
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            Invia
          </button>
        </div>
      </Modal>
    </>
  );
}
