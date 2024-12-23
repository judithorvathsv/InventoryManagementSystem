import { useEffect, useState } from "react";
import { fetchPurchases } from "../utils/fetchPurchases";
import { Link } from "react-router-dom";
import { PurchaseProps } from "../types";

const Purchases = () => {
  const [purchases, setPurchases] = useState<PurchaseProps[] |[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const getPurchases = async () => {
      const { result, errorMessage } = await fetchPurchases();

      if (errorMessage) {
        setErrorMessage(errorMessage);
      } else if (isMounted) {
        setPurchases(result || []);
      }
    };

    getPurchases();
    return () => {
        isMounted = false;
      };
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-4 text-center title">All Purchases</h2>

      <Link className="blue-button all-button self-end mb-4" to={"/"}>
        Show cost in diagram
      </Link>

      {errorMessage && <div className="text-center">{errorMessage}</div>}

      {purchases.length > 0 ? (
        <div className="overflow-x-auto w-full">
          {/* --- Desktop View --- */}
          <table className="min-w-full border-collapse border border-gray-300 hidden md:table">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Purchase ID</th>
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Supplier Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Purchase Date</th>
                <th className="border border-gray-300 p-2">Total Cost</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border border-gray-300 p-2">{purchase.id}</td>
                  <td className="border border-gray-300 p-2">{purchase.productName}</td>
                  <td className="border border-gray-300 p-2">{purchase.supplierName}</td>
                  <td className="border border-gray-300 p-2">{purchase.quantity}</td>
                  <td className="border border-gray-300 p-2">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">{(purchase.quantity * purchase.unitPrice).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{purchase.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Mobile View --- */}
          <div className="block md:hidden">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="border-b border-gray-300 mb-4 p-4">
                <h3 className="font-bold">Purchase ID: {purchase.id}</h3>
                <p><strong>Product:</strong> {purchase.productName}</p>
                <p><strong>Supplier:</strong> {purchase.supplierName}</p>
                <p><strong>Quantity:</strong> {purchase.quantity}</p>
                <p><strong>Purchase Date:</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                <p><strong>Total Cost:</strong> {(purchase.quantity * purchase.unitPrice).toFixed(2)}</p>
                <p><strong>Status:</strong> {purchase.status}</p>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <p className="text-center w-full p-4">No purchases have been made yet.</p>
      )}
    </div>
  );
};

export default Purchases;

