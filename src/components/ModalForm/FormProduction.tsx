import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IProduction } from "../../models/IProduction";
import { products } from "../../services/productService";
import Flatpickr from "react-flatpickr";
import { categories } from "../../services/resourceService";
import useUtilsStore from "../../stores/useUtilsStore";

const units = ["kg", "litri", "sacco"];

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

const FormProduction: React.FC = () => {
//   const { production, setProduction } = useUtilsStore();

  const {
    register,
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
    console.log(data);
    
    // const updatedProduction = [...production, data];
    // setProduction(updatedProduction);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-4 py-4">
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
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Prodotto
          </label>
          <select
            {...register("product")}
            className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          >
            <option
              value=""
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              Seleziona un prodotto
            </option>
            {products.map((option) => (
              <option
                key={option.name}
                value={option.name}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {option.name}
              </option>
            ))}
          </select>
          {errors.product && (
            <p className="text-red-500 text-xs">{errors.product.message}</p>
          )}
        </div>

        {/* Data di Produzione */}
        <div className="w-2/5">
          <div className="relative w-full flatpickr-wrapper">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Data di Produzione
            </label>

            <Controller
              name="productionDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{
                    dateFormat: "d-m-y",
                  }}
                  placeholder="Seleziona una data"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                />
              )}
            />
            {errors.productionDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productionDate.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        {/* Quantità Prodotta */}
        <div className="w-3/5">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Quantità Prodotta
          </label>
          <input
            type="number"
            {...register("quantityProduced")}
            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
          />
          {errors.quantityProduced && (
            <p className="text-red-500 text-xs">
              {errors.quantityProduced.message}
            </p>
          )}
        </div>

        {/* Unità di Misura */}
        <div className="w-2/5">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Unità di Misura
          </label>
          <select
            {...register("unit")}
            className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          >
            <option
              value=""
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              Seleziona l'unità
            </option>
            {units.map((unit) => (
              <option
                key={unit}
                value={unit}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {unit}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="text-red-500 text-xs">{errors.unit.message}</p>
          )}
        </div>
      </div>

      {/* Risorse Utilizzate */}
      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Risorse utilizzate
        </label>
        <div className="mt-2 border dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 p-3 rounded-lg">
          <div className="my-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Risorsa
            </label>
            <select
              {...register(`resourcesUsed.${0}.resource` as const)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            >
              <option
                value=""
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Seleziona una risorsa
              </option>
              {categories.map((category) => (
                <option
                  key={category.name}
                  value={category.name}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.resourcesUsed?.[0]?.resource && (
              <p className="text-red-500 text-xs">
                {errors.resourcesUsed[0]?.resource?.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 my-2">
            <div className="w-3/5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Quantità
              </label>
              <input
                type="number"
                {...register(`resourcesUsed.${0}.quantity` as const)}
                placeholder="Quantità"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
              />
              {errors.resourcesUsed?.[0]?.quantity && (
                <p className="text-red-500 text-xs">
                  {errors.resourcesUsed[0]?.quantity?.message}
                </p>
              )}
            </div>
            <div className="w-2/5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Unità di Misura
              </label>
              <select
                {...register(`resourcesUsed.${0}.unit` as const)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              >
                <option
                  value=""
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  Seleziona unità
                </option>
                {categories
                  .filter(
                    (c) => c.name === watch(`resourcesUsed.${0}.resource`)
                  )
                  .map((category) =>
                    category.units.map((unit) => (
                      <option
                        key={unit}
                        value={unit}
                        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                      >
                        {unit}
                      </option>
                    ))
                  )}
              </select>
              {errors.resourcesUsed?.[0]?.unit && (
                <p className="text-red-500 text-xs">
                  {errors.resourcesUsed[0]?.unit?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button type="submit" id="submitFormProduction" className="hidden">
        Submit
      </button>
    </form>
  );
};

export default FormProduction;
