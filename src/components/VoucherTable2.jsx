import React from "react";
import VoucherTableRow from "./VoucherTableRow";
import useRecordStore from "../stores/useRecordStore";
import EmptyRecord from "./EmptyRecord";

const VoucherTable2 = () => {
  const { records } = useRecordStore();
  const total = records.reduce((pv, cv) => pv + cv.cost, 0);

  const vat = total * 0.07;
  const netTotal = total + vat;
  return (
    <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
        <tr className=" ">
          <th scope="col" className="px-6 py-4">
            #
          </th>
          <th scope="col" className="px-6 py-4">
            Product name
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            Price
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            Quantity
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            Cost
          </th>
          <th scope="col" className="px-6 py-4 text-end">
            {" "}
          </th>
        </tr>
      </thead>
      <tbody id="recordGroup">
        {records.length > 0 ? (
          records.map((record, index) => (
            <VoucherTableRow key={record.id} record={record} index={index} />
          ))
        ) : (
          <EmptyRecord />
        )}
        {/* <VoucherTableRow /> */}
        {/* <RecordGroup removeRecord={removeRecord} records={records} /> */}
      </tbody>
      <tfoot>
        <tr className="border-b">
          <td className="px-6 py-4 text-end font-bold" colSpan={4}>
            Total
          </td>
          <td className="px-6 py-4 text-end" id="recordTotal">
            {total.toFixed(2)}
          </td>
        </tr>
        <tr className="border-b">
          <td className="px-6 py-4 text-end font-bold" colSpan={4}>
            Tax ( Vat 7% )
          </td>
          <td className="px-6 py-4 text-end" id="recordTotal">
            {vat.toFixed(2)}
          </td>
        </tr>
        <tr className="border-b">
          <td className="px-6 py-4 text-end font-bold" colSpan={4}>
            Net Total ( TBH )
          </td>
          <td className="px-6 py-4 text-end" id="recordTotal">
            {netTotal.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default VoucherTable2;
