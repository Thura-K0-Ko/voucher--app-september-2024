import React, { useState } from "react";

import { waveform } from "ldrs";

// Default values shown

import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useSWRConfig } from "swr";
const ProductRow = ({ product: { id, product_name, price, created_at } }) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting]   = useState(false);
  const date = new Date(created_at);
  const currentDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleDelProduct = async () => {
    setIsDeleting(true);
    
    await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });
    waveform.register();
    setIsDeleting(false);
    mutate(import.meta.env.VITE_API_URL + `/products`);
  };

  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {id}
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product_name}
        </th>
        <td className="px-6 py-4 text-end">{price}</td>

        <td className="px-6 py-4 text-end">
          <p className=" text-xs">{currentDate}</p>
          <p className=" text-xs">{currentTime}</p>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <HiOutlinePencil />
            </button>

            <button
              onClick={handleDelProduct}
              type="button"
              className="px-4 py-2 text-sm font-medium text-red-500 bg-transparent border border-gray-900 rounded-e-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              {isDeleting ? (
            
                <l-waveform
                  size="12"
                  stroke="1"
                  speed="1"
                  color="red"
                ></l-waveform>
              ) : (
                <HiOutlineTrash />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductRow;
