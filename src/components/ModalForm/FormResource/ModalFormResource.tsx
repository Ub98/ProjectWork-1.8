import React from "react";
import useModalStore from "../../../stores/useModalStore";
import useUtilsStore from "../../../stores/useUtilsStore";
import { Modal } from "../../ui/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { IResource } from "../../../models/IResource";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormResource from "./FormResource";
import Form from "../../form/Form";

const schema = Yup.object().shape({
  id: Yup.number().required("ID è obbligatorio"),
  name: Yup.string().required("Nome è obbligatorio"),
  category: Yup.string().required("Categoria è obbligatoria"),
  quantity: Yup.number().required("Quantità è obbligatoria"),
  unit: Yup.string().required("Unità di misura è obbligatoria"),
  status: Yup.string().required("Stato è obbligatorio"),
  lastUpdate: Yup.string().required(
    "Data di ultimo aggiornamento è obbligatoria"
  ),
});

const ModalFormResource: React.FC = () => {
  const { modalFormResource, setModalFormResource } = useModalStore();
  const { resources, setResources } = useUtilsStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IResource>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      status: "",
      lastUpdate: new Date().toLocaleDateString(),
    },
  });

  const onSubmit = (data: IResource) => {
    const updatedResource = [...resources, data];
    setResources(updatedResource);

    setModalFormResource(!modalFormResource);
  };

  return (
    <Modal
      isOpen={modalFormResource}
      onClose={() => setModalFormResource(!modalFormResource)}
      className="p-5"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormResource control={control} errors={errors} watch={watch} />

        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            onClick={() => setModalFormResource(!modalFormResource)}
            type="button"
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
          >
            Invia
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFormResource;
