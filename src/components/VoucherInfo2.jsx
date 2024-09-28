import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SaleForm2 from "./SaleForm2";
import VoucherTable2 from "./VoucherTable2";
import useRecordStore from "../stores/useRecordStore";

import { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { leapfrog } from "ldrs";

const VoucherInfo2 = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { records, resetRecord } = useRecordStore();

  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const onSubmit = async (data) => {
    const total = records.reduce((pv, cv) => pv + cv.cost, 0);

    const vat = (total * 0.07).toFixed(2);
    const netTotal = total + vat;
    setSaving(true);
    leapfrog.register();

    const res = await fetch(import.meta.env.VITE_API_URL + `/vouchers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, records, total, vat, netTotal }),
    });

    navigate("/voucher");

    mutate(import.meta.env.VITE_API_URL + `/vouchers`);
    toast.success("Voucher create successfully");
    reset();
    resetRecord();
    setSaving(false);
    // console.log(data);
  };

  const generateInvoiceNumber = () => {
    const now = new Date();
    const datePart =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0");

    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `INV-${datePart}-${randomPart}`;
  };

  // const onSubmit = (data) => {
  //   const total = records.reduce((pv, cv) => pv + cv.cost, 0);

  //   const vat = total * 0.07;
  //   const netTotal = total + vat;
  //   console.log({ ...data, records,total,vat,netTotal });
  // };
  return (
    <div>
      <form id="voucher" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-4 gap-3">
          {/* ====================Voucher ID input========================== */}
          <div className=" col-span-1">
            <label
              htmlFor="voucher_id"
              className={`block mb-2 text-sm font-medium ${
                errors.voucher_id
                  ? "text-red-700 dark:text-red-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Voucher ID
            </label>
            <input
              type="text"
              {...register("voucher_id", { required: true })}
              id="voucher_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={generateInvoiceNumber()}
            />
            {errors.voucher_id && (
              <p className="text-red-700 text-sm  dark:text-red-500">
                Voucher ID is required
              </p>
            )}
          </div>

          {/* ====================Customer Name input========================== */}
          <div className=" col-span-1">
            <label
              className={`block mb-2 text-sm font-medium ${
                errors.customer_name
                  ? "text-red-700 dark:text-red-500  "
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Customer Name
            </label>
            <input
              type="text"
              {...register("customer_name", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              className={`bg-gray-50 border ${
                errors.customer_name
                  ? " border-red-300 focus:ring-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500 focus:border-red-500"
                  : " border-gray-300 focus:ring-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500"
              }
                text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
              placeholder="John"
            />
            {errors.customer_name?.type === "required" && (
              <p className="text-red-700 text-sm dark:text-red-500">
                Customer Name is required
              </p>
            )}
            {errors.customer_name?.type === "minLength" && (
              <p className="text-red-700 text-sm dark:text-red-500">
                Customer Name must be at least 3 characters
              </p>
            )}
            {errors.customer_name?.type === "maxLength" && (
              <p className="text-red-700 text-sm dark:text-red-500">
                Customer Name must be at most 20 characters
              </p>
            )}
          </div>

          {/* ====================Customer email input========================== */}
          <div className=" col-span-1">
            <label
              htmlFor="customer_email"
              className={`block mb-2 text-sm font-medium ${
                errors.customer_email
                  ? "text-red-700 dark:text-red-500 "
                  : "text-gray-900 dark:text-white"
              }`}
            >
              Customer Email
            </label>
            <input
              type="email"
              {...register("customer_email", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              id="customer_email"
              className={`bg-gray-50 border ${
                errors.customer_email
                  ? " border-red-300 focus:ring-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500 focus:border-red-500"
                  : " border-gray-300 focus:ring-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500"
              }
               text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
              placeholder="John@gmail.com"
            />
            {errors.customer_email?.type === "required" && (
              <p className="text-red-700 text-sm dark:text-red-500">
                Customer Name is required
              </p>
            )}
            {errors.customer_email?.type === "minLength" && (
              <p className="text-red-700 text-sm dark:text-red-500">
                Customer Name must be at least 3 characters
              </p>
            )}
            {errors.customer_email?.type === "maxLength" && (
              <p className="text-red-700 text-sm dark:text-red-500">
                Customer Name must be at most 20 characters
              </p>
            )}
          </div>

          {/* ====================Sale Date input========================== */}

          <div className=" col-span-1">
            <label
              htmlFor="sale_date"
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
            >
              Sale Date
            </label>
            <input
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              {...register("sale_date")}
              id="sale_date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </form>

      <SaleForm2 />
      <VoucherTable2 />

      <div className="flex justify-end gap-2 items-center mt-5">
        {/* ==================form sure checkbox================= */}

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              {...register("all_correct", { required: true })}
              type="checkbox"
              className="w-4 h-4 border border-gray-300 cursor-pointer rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
            {errors.all_correct && (
              <p className="ps-2 text-red-500 text-xs">Check this box</p>
            )}
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
          >
            Make sure all field are correct
          </label>
        </div>
        <button
          form="voucher"
          type="submit"
          className=" flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto
           px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <p>Confirm Voucher</p>
          {saving && (
            <l-leapfrog size="20" speed="2.5" color="red"></l-leapfrog>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoucherInfo2;
