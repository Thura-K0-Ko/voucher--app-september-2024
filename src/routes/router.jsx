import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";

import ProductPage from "../pages/ProductPage";
import DashboardPage from "../pages/DashboardPage";
import SalePage from "../pages/SalePage";
import VoucherPage from "../pages/VoucherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/sale", element: <SalePage /> },
      { path: "/voucher", element: <VoucherPage /> },
    ],
  },
]);
export default router;
