import { useContext } from "react";
import { Link } from "react-router-dom";
import { PurchaseContext } from "../context/purchaseContextProvider";

const Purchases = () => {
  const { purchases, errorMessage } = useContext(PurchaseContext);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-4 text-center title bold-title">All Purchases</h2>

      <Link
        className="blue-button all-button mb-4 text-center md:self-end"
        to={"/"}
      >
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
                <th className="border border-gray-300 p-2">Supplier Name(s)</th>
                <th className="border border-gray-300 p-2">Quantity (kg)</th>
                <th className="border border-gray-300 p-2">Purchase Date</th>
                <th className="border border-gray-300 p-2">Total Cost (sek)</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border border-gray-300 p-2">{purchase.id}</td>
                  <td className="border border-gray-300 p-2">
                    {purchase.productName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {purchase.supplierName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {purchase.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {(purchase.quantity * purchase.unitPrice).toFixed(2)}
                  </td>
                  <td
                    className={`border border-gray-300 p-2 ${
                      purchase.status === "Incoming"
                        ? "green-text"
                        : purchase.status === "Returned"
                        ? "red-text"
                        : ""
                    }`}
                  >
                    {purchase.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Mobile View --- */}
          <div className="block md:hidden">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="border border-gray-300 mb-4 p-4"
              >
                <div className="flex flex-wrap items-center mb-2">
                  <label className="font-bold w-1/3">Purchase ID:</label>
                  <p className="w-2/3">{purchase.id}</p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Product:</label>
                  <p className="w-2/3">{purchase.productName}</p>
                </div>
                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Supplier(s):</label>
                  <p className="w-2/3">{purchase.supplierName} </p>
                </div>

                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Quantity:</label>
                  <p className="w-2/3">{purchase.quantity} kg</p>
                </div>

                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Date:</label>
                  <p className="w-2/3">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Total Cost:</label>
                  <p className="w-2/3">
                    {(purchase.quantity * purchase.unitPrice).toFixed(2)} sek
                  </p>
                </div>

                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Status:</label>
                  <p
                    className={`w-2/3 ${
                      purchase.status === "Incoming"
                        ? "text-green-500"
                        : purchase.status === "Returned"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {purchase.status}
                  </p>
                </div>
              </div>

              // <div
              //   key={purchase.id}
              //   className="border-b border-gray-300 mb-4 p-4"
              // >
              //   <h3 className="font-bold">Purchase ID: {purchase.id}</h3>
              //   <p>
              //     <strong>Product:</strong> {purchase.productName}
              //   </p>
              //   <p>
              //     <strong>Supplier:</strong> {purchase.supplierName}
              //   </p>
              //   <p>
              //     <strong>Quantity:</strong> {purchase.quantity}
              //   </p>
              //   <p>
              //     <strong>Purchase Date:</strong>{" "}
              //     {new Date(purchase.purchaseDate).toLocaleDateString()}
              //   </p>
              //   <p>
              //     <strong>Total Cost:</strong>{" "}
              //     {(purchase.quantity * purchase.unitPrice).toFixed(2)}
              //   </p>
              //   <p>
              //     <strong>Status:</strong>{" "}
              //     <span
              //       className={`${
              //         purchase.status === "Incoming"
              //           ? "green-text"
              //           : purchase.status === "Returned"
              //           ? "red-text"
              //           : ""
              //       }`}
              //     >
              //       {purchase.status}
              //     </span>
              //   </p>
              // </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center w-full p-4">
          No purchases have been made yet.
        </p>
      )}
    </div>
  );
};

export default Purchases;
