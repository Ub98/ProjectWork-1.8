import React from "react";
import { Modal } from "../../ui/modal";
import useModalStore from "../../../stores/useModalStore";
import FormProduction from "./FormProduction";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IProduction } from "../../../models/IProduction";
import useUtilsStore from "../../../stores/useUtilsStore";
import Form from "../../form/Form";

const schema = yup.object().shape({
  id: yup.number().required(),
  product: yup.string().required("Seleziona un prodotto"),
  productionDate: yup.string().required("Inserisci la data di produzione"),
  quantityProduced: yup
    .number()
    .required("Inserisci la quantità prodotta")
    .positive("Deve essere un numero positivo"),
  unit: yup.string().required("Seleziona l'unità di misura"),
  resourcesUsed: yup
    .array()
    .of(
      yup.object().shape({
        resource: yup.string().required("Inserisci il nome della risorsa"),
        quantity: yup
          .number()
          .required("Inserisci la quantità")
          .positive("Deve essere un numero positivo"),
        unit: yup.string().required("Seleziona l'unità"),
      })
    )
    .required(),
});

const ModalFormProduction: React.FC = () => {
  const { modalFormProduction, setModalFormProduction } = useModalStore();
  const { production, setProduction } = useUtilsStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IProduction>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      product: "",
      productionDate: "",
      quantityProduced: 0,
      unit: "",
      resourcesUsed: [{ resource: "", quantity: 0, unit: "" }],
    },
  });

  const onSubmit = (data: IProduction) => {

    const updatedProduction = [...production, data];
    setProduction(updatedProduction);

    setModalFormProduction(!modalFormProduction)
  };

  return (
    <Modal
      isOpen={modalFormProduction}
      onClose={() => setModalFormProduction(!modalFormProduction)}
      className="p-5" 
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormProduction control={control} errors={errors}  watch={watch}/>
      

      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <button
          onClick={() => setModalFormProduction(!modalFormProduction)}
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

export default ModalFormProduction;
