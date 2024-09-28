import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { saving, setSaving } = useState(false);
  const onSubmit = (data) => {
    console.log(data);
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="infoForm">
        <div className=" grid grid-cols-1 sm:grid-cols-4 gap-3 mt-5">
          {/* ========================voucher_id input================================ */}

          <div className=" col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium   ${
                  errors.voucher_id
                    ? "text-red-500 dark:text-red-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                Voucher ID
              </label>
              <input
                type="text"
                defaultValue={generateInvoiceNumber()}
                {...register("voucher_id", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.voucher_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
              />
              {errors.voucher_id?.type === "required" && (
                <p className="text-red-500 text-sm">Product Name is required</p>
              )}
            </div>
          </div>

          {/* ========================customer_name input================================ */}

          <div className=" col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium   ${
                  errors.customer_name
                    ? "text-red-500 dark:text-red-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                Customer Name
              </label>
              <input
                type="text"
                {...register("customer_name", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
                placeholder="eg.apple"
              />
              {errors.customer_name?.type === "required" && (
                <p className="text-red-500 text-sm">Product Name is required</p>
              )}
            </div>
          </div>

          {/* ========================customer_email input================================ */}

          <div className=" col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium   ${
                  errors.customer_email
                    ? "text-red-500 dark:text-red-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                Customer Email
              </label>
              <input
                type="email"
                {...register("customer_email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
                placeholder="eg....@gmail.com"
              />
              {errors.customer_email?.type === "required" && (
                <p className="text-red-500 text-sm">Product Name is required</p>
              )}
            </div>
          </div>

          {/* ========================sale_date input================================ */}

          <div className=" col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium   ${
                  errors.sale_date
                    ? "text-red-500 dark:text-red-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                Sale Date
              </label>
              <input
                type="date"
                defaultValue={"2024-09-21"}
                {...register("sale_date", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.sale_date
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500  dark:border-red-600  dark:focus:ring-red-500 dark:focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`}
              />
              {errors.sale_date?.type === "required" && (
                <p className="text-red-500 text-sm">Product Name is required</p>
              )}
            </div>
          </div>
        </div>
      </form>
      {/* <SaleForm /> */}

      {/* <VoucherTable /> */}

      {/* ========================submit button================================ */}

      <div className="mt-10 flex items-center justify-end gap-3">
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
              <p className="text-red-500 text-xs">This field is required</p>
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
          form="infoForm"
          type="submit"
          className=" flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Confirm Voucher</span>
          {saving && (
            <l-tail-chase size="13" speed="1.75" color="white"></l-tail-chase>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoucherInfo;
