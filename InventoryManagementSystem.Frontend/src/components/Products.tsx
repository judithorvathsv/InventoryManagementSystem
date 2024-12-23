import { useEffect, useState } from "react";
import { ProductDatabaseProps, PurchaseProps, PurchaseSummary } from "../types";
import { fetchProducts } from "../utils/fetchProduct";
import { Link } from "react-router-dom";
import { fetchPurchases } from "../utils/fetchPurchases";

const Products = () => {
  const [products, setProducts] = useState<ProductDatabaseProps[] | []>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchases, setPurchases] = useState<PurchaseProps[] | []>([]);

  useEffect(() => {
    let isMounted = true;
    
    const getProducts = async () => {
      const { result, errorMessage } = await fetchProducts();
      if (errorMessage) {
        setErrorMessage(errorMessage);
      } else if (isMounted) {
        setProducts(result || []);
      }
    };

    const getPurchases = async () => {
      const { result, errorMessage } = await fetchPurchases();
      if (errorMessage) {
        setErrorMessage(errorMessage);
      } else if (isMounted) {
        setPurchases(result || []);
      }
    };

    getProducts();
    getPurchases();

    return () => {
      isMounted = false;
    };
  }, []);


  const purchaseSummary: Record<number, PurchaseSummary> = {};

  purchases.forEach(purchase => {      
      const productId = purchase.productId;         
     
      if (!purchaseSummary[productId]) {
        purchaseSummary[productId] = {
          totalQuantity: 0,
          totalQuantityPending: 0,
          suppliers: new Set()
        };
      }   
      
      if (purchase.purchaseStatusId === 2) {
        purchaseSummary[productId].totalQuantity += purchase.quantity;
        purchaseSummary[productId].suppliers.add(purchase.supplierName);
      }  

     else if (purchase.purchaseStatusId === 1) {
        purchaseSummary[productId].totalQuantityPending += purchase.quantity;
      }
    
  });

  const processedProducts = products.map(product => {
    const summary = purchaseSummary[product.id] || { totalQuantity: 0, totalQuantityPending: 0, suppliers: new Set() };

    return {
      ...product,
      totalQuantity: summary.totalQuantity,
      totalQuantityPending: summary.totalQuantityPending,
      suppliersList: Array.from(summary.suppliers).join(", ")
    };
  });

  const handleBuyAgain = (productId: number) => {  
    console.log(`Buying again for product ID: ${productId}`);
  };
  
  const handleUseProduct = (productId: number) => {
    console.log(`Using product with ID: ${productId}`);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-4 text-center title">All Products</h2>

      <Link className="blue-button all-button self-end mb-4" to={"/newpurchase"}>
      New Purchase
      </Link>

      {errorMessage && <div className="text-center">{errorMessage}</div>}

      {processedProducts.length > 0 ? (
    <div className="overflow-x-auto w-full">

    {/* --- Desktop View --- */}
    <table className="min-w-full border-collapse border border-gray-300 hidden md:table">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Product Name</th>
          <th className="border border-gray-300 p-2">Category</th>
          <th className="border border-gray-300 p-2">In stock</th>
          <th className="border border-gray-300 p-2">Pending orders</th>
          <th className="border border-gray-300 p-2">Supplier Name</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {processedProducts.map((product) => (
          <tr key={product.id}>
            <td className="border border-gray-300 p-2">{product.productName}</td>
            <td className="border border-gray-300 p-2">{product.categoryName || 'N/A'}</td>
            <td className="border border-gray-300 p-2">{product.totalQuantity}</td>
            <td className="border border-gray-300 p-2">{product.totalQuantityPending}</td>
            <td className="border border-gray-300 p-2">{product.suppliersList }</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => handleBuyAgain(product.id)} className="blue-button all-button">
              Purchase Again
              </button>
              <button onClick={() => handleUseProduct(product.id)} className="blue-button all-button ml-2">
                Use Product
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* --- Mobile View --- */}
    <div className="block md:hidden">
      {processedProducts.map((product) => (
        <div key={product.id} className="border-b border-gray-300 mb-4 p-4">
          <h3 className="font-bold">{product.productName}</h3>
          <p><strong>Category:</strong> {product.categoryName}</p>
          <p><strong>Quantity:</strong> {product.totalQuantity}</p>
          <p><strong>Quantity:</strong> {product.totalQuantityPending}</p>
          <p><strong>Supplier:</strong> {product.suppliersList }</p>
          <div className="mt-2">
            <button onClick={() => handleBuyAgain(product.id)} className="blue-button all-button mr-2">
              Purchase Again
            </button>
            <button onClick={() => handleUseProduct(product.id)} className="blue-button all-button">
              Use Product
            </button>
          </div>
        </div>
      ))}
    </div>

  </div>
      ) : (
        <p className="text-center w-full p-4">
          No products have been added yet.
        </p>
      )}
    </div>
  );
};

export default Products;
