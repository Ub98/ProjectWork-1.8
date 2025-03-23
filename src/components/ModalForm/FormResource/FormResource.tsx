import React from "react";
import { IResource } from "../../../models/IResource";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import Label from "../../form/Label";
import Select from "../../form/Select";
import Input from "../../form/input/InputField";
import { categories } from "../../../services/resourceService";

interface IForm {
  control: Control<IResource>;
  errors: FieldErrors<IResource>;
  watch: UseFormWatch<IResource>;
}

const statues = [
  {
    label: "Esaurito",
    value: "Esaurito",
  },
  {
    label: "Disponibile",
    value: "Disponibile",
  },
  {
    label: "Scorte Basse",
    value: "Scorte Basse",
  },
];

const FormResource: React.FC<IForm> = ({ control, errors, watch }) => {
  const category = watch("category");
  return (
    <>
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          Gestione Risorse
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Completa il modulo per gestire e monitorare le tue risorse in modo
          semplice e veloce.
        </p>
      </div>
      <div className="mt-4">
        {/* Selezione Categoria */}

        <Label>Categoria</Label>
        <Select
          name="category"
          options={categories.map((c) => {
            return { label: c.name, value: c.name };
          })}
          placeholder="Seleziona una categoria"
          control={control}
          error={!!errors?.category}
          hint={errors?.category?.message as string}
        />
      </div>

      <div className="mt-4">
        {/* Prodotto */}
        <Label>Prodotto</Label>
        <Select
          name="name"
          options={categories
            .filter((c) => c.name === category)
            .flatMap((c) => c.resources.map((r) => ({ label: r, value: r })))}
          placeholder="Seleziona una categoria"
          control={control}
          error={!!errors?.name}
          hint={errors?.name?.message as string}
          disabled={category === ""}
        />
      </div>

      <div className="flex gap-4 mt-4">
        {/* Quantità Prodotta */}
        <div className="w-3/5">
          <Label>Quantità Prodotta</Label>
          <Input
            name="quantity"
            type="number"
            placeholder="Quantità"
            control={control}
            error={!!errors?.quantity}
            hint={errors?.quantity?.message as string}
            disabled={category === ""}
          />
        </div>

        {/* Unità di Misura */}
        <div className="w-2/5">
          <Label>Unità di Misura</Label>
          <Select
            name="unit"
            options={categories
              .filter((c) => c.name === category)
              .flatMap((c) => c.units.map((u) => ({ label: u, value: u })))}
            placeholder="Seleziona l'unità di misura"
            control={control}
            error={!!errors?.unit}
            hint={errors?.unit?.message as string}
            disabled={category === ""}
          />
        </div>
      </div>

      {/* Stato */}
      <div className="mt-4">
        <Label>Stato</Label>
        <Select
          name="status"
          options={statues}
          placeholder="Seleziona lo stato"
          control={control}
          error={!!errors?.status}
          hint={errors?.status?.message as string}
          disabled={category === ""}
        />
      </div>
    </>
  );
};

export default FormResource;
