import { useEffect, useState } from "react";
import { ProductDatabaseProps, PurchaseProps, PurchaseSummary } from "../types";
import { fetchProducts } from "../utils/fetchProduct";
import { fetchPurchases } from "../utils/fetchPurchases";

const Inventory = () => {
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

  purchases.forEach((purchase) => {
    const productId = purchase.productId;

    if (!purchaseSummary[productId]) {
      purchaseSummary[productId] = {
        totalQuantity: 0,
        totalQuantityPending: 0,
        unitPrice: purchase.unitPrice,
        fullTotal: 0,
      };
    }

    if (purchase.purchaseStatusId === 2) {
      purchaseSummary[productId].totalQuantity += purchase.quantity;
    } else if (purchase.purchaseStatusId === 1) {
      purchaseSummary[productId].totalQuantityPending += purchase.quantity;
    }
  });

  const processedProducts = products.map((product) => {
    const summary = purchaseSummary[product.id] || {
      totalQuantity: 0,
      totalQuantityPending: 0,
      suppliers: new Set(),
    };
    const totalValue = summary.totalQuantity * summary.unitPrice!;
    const fullTotal = summary.totalQuantity + summary.totalQuantityPending;

    return {
      ...product,
      totalQuantity: summary.totalQuantity,
      totalQuantityPending: summary.totalQuantityPending,
      unitPrice: summary.unitPrice,
      totalValue,
      fullTotal,
    };
  });

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-12 text-center title bold-title">Inventory</h2>

      {errorMessage && (
        <div className="text-center red-text">{errorMessage}</div>
      )}
      {processedProducts.length > 0 ? (
        <div className="overflow-x-auto w-full">
          {/* --- Desktop View --- */}
          <table className="min-w-full border-collapse border border-gray-300 hidden md:table">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">In stock (kg)</th>
                <th className="border border-gray-300 p-2">
                  Pending orders (kg)
                </th>
                <th className="border border-gray-300 p-2">Total (kg)</th>

                <th className="border border-gray-300 p-2">Unit Price (sek)</th>
                <th className="border border-gray-300 p-2">
                  Total Value in Stock (sek)
                </th>
              </tr>
            </thead>
            <tbody>
              {processedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal">
                    {product.productName}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal">
                    {product.categoryName || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal">
                    {product.totalQuantity}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal green-text">
                    {product.totalQuantityPending}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal">
                    {product.fullTotal}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal">
                    {product.unitPrice}
                  </td>
                  <td className="border border-gray-300 p-2 w-1/6 whitespace-normal">
                    {product.totalValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Mobile View --- */}
          <div className="block md:hidden ">
            {processedProducts.map((product) => (
              <div key={product.id} className="border border-gray-300 mb-4 p-4">
                <h3 className="font-bold medium-title">
                  {product.productName}
                </h3>

                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Category:</label>
                  <p className="w-2/3">{product.categoryName}</p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">In Stock:</label>
                  <p className="w-2/3">{product.totalQuantity} kg</p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Pending orders:</label>
                  <p className="w-2/3 green-text">
                    {product.totalQuantityPending} kg
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Total:</label>
                  <p className="w-2/3">{product.fullTotal} kg</p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Unit Price:</label>
                  <p className="w-2/3">{product.unitPrice} sek</p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">
                    Total Value in Stock:
                  </label>
                  <p className="font-bold w-2/3">{product.totalValue} sek</p>
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

export default Inventory;
