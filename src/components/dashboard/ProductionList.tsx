import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import useUtilsStore from "../../stores/useUtilsStore";
import { format } from "date-fns";
import { IProduction } from "../../models/IProduction";

export default function ProductionList() {
  const productions = useUtilsStore((state) => state.production);
  const products = useUtilsStore((state)=> state.products)

  const getIncome = (production: IProduction) =>{

    let productPrice = products.find((p)=> p.product === production.product)
    if (productPrice) {
      return (production.quantityProduced * productPrice.pricePerUnit).toFixed(2)
    }

    
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Produzione
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Prodotto
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantità
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Risorse Utilizzate
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Guadagno
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {productions.map((production) => (
              <TableRow key={production.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {production.product}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {`${production.quantityProduced} (${production.unit})` } 
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {production.resourcesUsed.map((r, index) => (
                    <div key={index}>
                      {r.resource} ({r.quantity} {r.unit})
                    </div>
                  ))}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {`€ ${getIncome(production)}`}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {format(production.productionDate, "dd/mm/yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
