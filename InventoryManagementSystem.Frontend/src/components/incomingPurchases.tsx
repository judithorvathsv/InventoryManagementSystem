import { useContext, useState } from "react";

import { PurchaseContext } from "../context/PurchaseContextProvider";
import { PurchaseProps } from "../types";
import { formatDate } from "../utils/formatDateTime";

const IncomingPurchases = () => {
  const { purchases, errorMessage, updatePurchaseStatus } =
    useContext(PurchaseContext);
  const [selectedPurchase, setSelectedPurchase] =
    useState<PurchaseProps | null>(null);
  const [actionType, setActionType] = useState("");

  const incomingPurchases = purchases.filter(
    (purchase) => purchase.purchaseStatusId === 1
  );

  const handleReceive = (purchase: PurchaseProps) => {
    setSelectedPurchase(purchase);
    setActionType("receive");
  };

  const handleReturn = (purchase: PurchaseProps) => {
    setSelectedPurchase(purchase);
    setActionType("return");
  };

  const handleCancel = () => {
    setSelectedPurchase(null);
    setActionType("");
  };

  const handleConfirmReceive = async () => {
    if (selectedPurchase) {
      await updatePurchaseStatus(selectedPurchase.id, 2);
      handleCancel();
    }
  };

  const handleConfirmReturn = async () => {
    if (selectedPurchase) {
      await updatePurchaseStatus(selectedPurchase.id, 3);
      handleCancel();
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-12 text-center title bold-title">Incoming Purchases</h2>

      {errorMessage && <div className="text-center red-text">{errorMessage}</div>}

      {selectedPurchase && (
        <div className="mt-4 mb-8 p-4 border rounded-lg bg-white shadow-md">
          {actionType === "receive" && (
            <div className="flex flex-col items-center">
              <h3 className="medium-title bold-title">
                Purchase ID: {selectedPurchase.id}
              </h3>
              <p>Are you sure you have been received this purchase?</p>
              <div className="mt-4">
                <button
                  onClick={handleConfirmReceive}
                  className="blue-button all-button mr-2"
                >
                  Confirm Receive
                </button>
                <button
                  onClick={handleCancel}
                  className="grey-button all-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {actionType === "return" && (
            <div className="flex flex-col items-center">
              <h3 className="medium-title bold-title">
                Purchase ID: {selectedPurchase.id}
              </h3>
              <p>Are you sure you want to return this purchase?</p>
              <div className="mt-4">
                <button
                  onClick={handleConfirmReturn}
                  className="navy-button all-button mr-2"
                >
                  Confirm Return
                </button>
                <button
                  onClick={handleCancel}
                  className="grey-button all-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {incomingPurchases.length > 0 ? (
        <div className="overflow-x-auto w-full">
          {/* --- Desktop View --- */}
          <table className="min-w-full border-collapse border border-gray-300 hidden lg:table">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Purchase ID</th>
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Supplier Name(s)</th>
                <th className="border border-gray-300 p-2">Quantity (kg)</th>
                <th className="border border-gray-300 p-2">Purchase Date</th>
                <th className="border border-gray-300 p-2">Total Cost (sek)</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomingPurchases.map((purchase) => (
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
                    {formatDate(purchase.purchaseDate)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {(purchase.quantity * purchase.unitPrice).toFixed(2)}
                  </td>

                  <td className="border border-gray-300 p-2 w-full md:w-48">
                    <div className="flex flex-col md:flex-row md:space-x-2">
                      <button
                        onClick={() => handleReceive(purchase)}
                        className="blue-button all-button mb-2 md:mb-0"
                      >
                        Receive
                      </button>
                      <button
                        onClick={() => handleReturn(purchase)}
                        className="navy-button all-button mb-2 md:mb-0"
                      >
                        Return
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- Mobile View --- */}
          <div className="block lg:hidden">
            {incomingPurchases.map((purchase) => (
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
                  <p className="w-2/3">{formatDate(purchase.purchaseDate)}</p>
                </div>

                <div className="flex items-center mb-2">
                  <label className="font-bold w-1/3">Total Cost:</label>
                  <p className="w-2/3">
                    {(purchase.quantity * purchase.unitPrice).toFixed(2)} sek
                  </p>
                </div>

                <div className="flex items-center mb-2">
                  <button
                    onClick={() => handleReceive(purchase)}
                    className="blue-button all-button mr-2 mt-2"
                  >
                    Receive
                  </button>
                  <button
                    onClick={() => handleReturn(purchase)}
                    className="navy-button all-button mt-2"
                  >
                    Return
                  </button>
                </div>
              </div>
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

export default IncomingPurchases;
