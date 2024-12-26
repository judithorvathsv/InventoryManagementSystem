import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Login from "./components/login";
import Products from "./components/products";
import PurchaseForm from "./components/purchaseForm";
import Purchases from "./components/purchases";
import Inventory from "./components/inventory";
import IncomingPurchases from "./components/incomingPurchases";
import { PurchaseContextProvider } from "./context/PurchaseContextProvider";
import OrderForm from "./components/orderForm";
import Orders from "./components/orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "newpurchase",
        element: <PurchaseForm />,
      },
      {
        path: "purchases",
        element: <Purchases />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "incoming-purchases",
        element: <IncomingPurchases />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "neworder",
        element: <OrderForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PurchaseContextProvider>
      <RouterProvider router={router} />
    </PurchaseContextProvider>
  </React.StrictMode>
);
