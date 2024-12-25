import { useContext, useState } from "react";

import { PurchaseContext } from "../context/purchaseContextProvider";
import { PurchaseProps } from "../types";

const IncomingPurchases = () => {
      const { purchases, errorMessage, updatePurchaseStatus } = useContext(PurchaseContext); 
      const [selectedPurchase, setSelectedPurchase] = useState<PurchaseProps | null>(null);
      const [actionType, setActionType] = useState("");

      const incomingPurchases = purchases.filter(purchase => purchase.purchaseStatusId === 1);

      const handleReceive = (purchase:PurchaseProps) => {
        setSelectedPurchase(purchase);
        setActionType('receive');
      }

      const handleReturn = (purchase:PurchaseProps) => {
    setSelectedPurchase(purchase);
        setActionType('return');
      }

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

      {errorMessage && <div className="text-center">{errorMessage}</div>}

      {selectedPurchase && (
                <div className="mt-4 mb-8 p-4 border rounded-lg bg-white shadow-md">
                    {actionType === 'receive' && (
                        <div className="flex flex-col items-center">
                            <h3 className="medium-title bold-title">Purchase ID: {selectedPurchase.id}</h3>
                            <p>Are you sure you have been received this purchase?</p>
                            <div className="mt-4">
                            <button onClick={handleConfirmReceive} className="blue-button all-button mr-2">Confirm Receive</button>
                            <button onClick={handleCancel} className="grey-button all-button">Cancel</button>
                            </div>
 
                        </div>
                    )}
                    {actionType === 'return' && (
                        <div className="flex flex-col items-center">
                            <h3 className="medium-title bold-title">Purchase ID: {selectedPurchase.id}</h3>
                            <p>Are you sure you want to return this purchase?</p>
                            <div className="mt-4">
                            <button onClick={handleConfirmReturn} className="navy-button all-button mr-2">Confirm Return</button>
                            <button onClick={handleCancel} className="grey-button all-button">Cancel</button>
                            </div>

                        </div>
                    )}
                </div>
            )}






      {incomingPurchases.length > 0 ? (
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
              {incomingPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border border-gray-300 p-2">{purchase.id}</td>
                  <td className="border border-gray-300 p-2">{purchase.productName}</td>
                  <td className="border border-gray-300 p-2">{purchase.supplierName}</td>
                  <td className="border border-gray-300 p-2">{purchase.quantity}</td>
                  <td className="border border-gray-300 p-2">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2">{(purchase.quantity * purchase.unitPrice).toFixed(2)}</td>
                  <td className={`border border-gray-300 p-2 ${purchase.status === "Incoming" ? "green-text" : purchase.status === "Returned" ? "red-text" : ""}`}>
                  {purchase.status}</td>
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
          <div className="block md:hidden">
            {incomingPurchases.map((purchase) => (
              <div key={purchase.id} className="border-b border-gray-300 mb-4 p-4">
                <h3 className="font-bold">Purchase ID: {purchase.id}</h3>
                <p><strong>Product:</strong> {purchase.productName}</p>
                <p><strong>Supplier:</strong> {purchase.supplierName}</p>
                <p><strong>Quantity:</strong> {purchase.quantity}</p>
                <p><strong>Purchase Date:</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                <p><strong>Total Cost:</strong> {(purchase.quantity * purchase.unitPrice).toFixed(2)}</p>
                <p><strong>Status:</strong> <span className={`${purchase.status === "Incoming" ? "green-text" : purchase.status === "Returned" ? "red-text" : ""}`}>
                    {purchase.status}
                  </span></p>
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

export default IncomingPurchases;




