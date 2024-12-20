import './index.css'

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Login from './components/login';
import Products from './components/Products';

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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
        <RouterProvider router={router} />       
  </React.StrictMode>
)
