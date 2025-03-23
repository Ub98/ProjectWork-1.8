import ResourceList from "../../components/dashboard/ResourceList";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import useModalStore from "../../stores/useModalStore";
import ModalFormResource from "../../components/ModalForm/FormResource/ModalFormResource";

export default function Resource() {
  const { modalFormResource, setModalFormResource } = useModalStore();
  return (
    <>
      <PageBreadcrumb pageTitle="Risorse" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 mb-6">
        <Button
          size="sm"
          variant="primary"
          onClick={() => setModalFormResource(!modalFormResource)}
        >
          <span className="font-bold">+</span> Nuovo
        </Button>
      </div>
      <ResourceList />
      <ModalFormResource />
    </>
  );
}
