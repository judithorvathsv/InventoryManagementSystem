import './index.css'

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Login from './components/login';
import Products from './components/products';
import PurchaseForm from './components/purchaseForm';
import Purchases from './components/purchases';
import Inventory from './components/inventory';

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
        element: <Purchases/>
      },
      {
        path: "inventory",
        element: <Inventory/>
      }
      
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
   <React.StrictMode>    
        <RouterProvider router={router} />       
   </React.StrictMode>
)
