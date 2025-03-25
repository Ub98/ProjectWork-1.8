import React from "react";
import { products } from "../../../services/productService";
import { categories } from "../../../services/resourceService";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Select from "../../form/Select";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { IProduction } from "../../../models/IProduction";

interface IForm{
  control: Control<IProduction>,
  errors: FieldErrors<IProduction>,
  watch: UseFormWatch<IProduction>,
}

const FormProduction: React.FC<IForm> = ({control, errors, watch}) => {
  const resourceName = watch(`resourcesUsed.0.resource`) || "";
  return (
    <>
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          Gestione Produzione
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Completa il modulo per gestire e monitorare la tua produzione in modo
          semplice e veloce.
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        {/* Selezione Prodotto */}
        <div className="w-3/5">
          <Label>Prodotto</Label>
          <Select
            name="product"
            options={products.map((p) => {
              return { label: p.name, value: p.name };
            })}
            placeholder="Seleziona un prodotto"
            control={control}
            error={!!errors?.product}
            hint={errors?.product?.message as string}
          />
        </div>

        {/* Data di Produzione */}
        <div className="w-2/5">
          <Label>Data di produzione</Label>
          <Input
            name="productionDate"
            type="date"
            placeholder="Data di produzione"
            control={control}
            error={!!errors?.productionDate}
            hint={errors?.productionDate?.message as string}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        {/* Quantità Prodotta */}
        <div className="w-3/5">
          <Label>Quantità Prodotta</Label>
          <Input
            name="quantityProduced"
            type="number"
            placeholder="Quantità"
            control={control}
            error={!!errors?.quantityProduced}
            hint={errors?.quantityProduced?.message as string}
          />
        </div>

        {/* Unità di Misura */}
        <div className="w-2/5">
          <Label>Unità di Misura</Label>
          <Select
            name="unit"
            options={Array.from(
              new Set(products.filter((p) => p.unit).map((p) => p.unit))
            ).map((unit) => ({ label: unit, value: unit }))}
            placeholder="Seleziona l'unità di misura"
            control={control}
            error={!!errors?.unit}
            hint={errors?.unit?.message as string}
          />
        </div>
      </div>

      {/* Risorse Utilizzate */}
      <div className="mt-6">
        <Label>Risorse utilizzate</Label>
        <div className="mt-2 border dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 p-3 rounded-lg">
          <div className="my-2">
            <Label>Risorsa</Label>
            <Select
              name={`resourcesUsed.${0}.resource`}
              options={categories.map((c) => ({
                label: c.name,
                value: c.name,
              }))}
              placeholder="Seleziona la risorsa"
              control={control}
              error={!!errors?.resourcesUsed?.[0]?.resource}
              hint={errors?.resourcesUsed?.[0]?.resource?.message as string}
            />
          </div>

          <div className="flex gap-4 my-2">
            <div className="w-3/5">
              <Label>Quantità</Label>
              <Input
                name={`resourcesUsed.${0}.quantity`}
                type="number"
                placeholder="Quantità"
                control={control}
                error={!!errors?.resourcesUsed?.[0]?.quantity}
                hint={errors?.resourcesUsed?.[0]?.quantity?.message as string}
              />
            </div>
            <div className="w-2/5">
              <Label>Unità di misura</Label>
              <Select
                name={`resourcesUsed.${0}.unit`}
                options={categories
                  .filter(
                    (c) => c.name === resourceName
                  )
                  .flatMap((c) => c.units.map((u) => ({ label: u, value: u })))}
                placeholder="Seleziona l'unità di misura"
                control={control}
                error={!!errors?.resourcesUsed?.[0]?.unit}
                hint={errors?.resourcesUsed?.[0]?.unit?.message as string}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormProduction;
