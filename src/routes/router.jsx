import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";

import ProductPage from "../pages/ProductPage";
import DashboardPage from "../pages/DashboardPage";
import SalePage from "../pages/SalePage";
import VoucherPage from "../pages/VoucherPage";
import CreateProductPage from "../pages/CreateProductPage";

import EditProductPage from "../pages/EditProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/product/create", element: <CreateProductPage /> },
      { path: "/product/edit/:productId", element: <EditProductPage /> },
      { path: "/sale", element: <SalePage /> },
      { path: "/voucher", element: <VoucherPage /> },
    ],
  },
]);
export default router;
