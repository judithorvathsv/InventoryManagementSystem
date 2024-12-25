import { FormEvent, useEffect, useState } from "react";
import { ProductDatabaseProps, PurchaseProps, PurchaseSummary } from "../types";
import { fetchProducts } from "../utils/fetchProduct";
import { Link } from "react-router-dom";
import { fetchPurchases } from "../utils/fetchPurchases";

const Products = () => {
  const [products, setProducts] = useState<ProductDatabaseProps[] | []>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchases, setPurchases] = useState<PurchaseProps[] | []>([]);

  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDatabaseProps | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const [useProductFormVisible, setUseProductFormVisible] = useState(false);

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

  const handleBuyAgain = (product: ProductDatabaseProps) => {
    setSelectedProduct(product);
    setShowPurchaseForm(true);
  };

  const handleCancelPurchase = () => {
    setShowPurchaseForm(false);
    setSelectedProduct(null);
    setQuantity(0); 
  };

  const handleSubmitPurchase = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedProduct) return;

    const supplierName = selectedProduct.suppliersList
    && selectedProduct.suppliersList.includes(",") 
    ? selectedProduct.suppliersList.split(", ")[0] 
    : selectedProduct.suppliersList
    || "";

    const purchaseData = {
      productName: selectedProduct.productName,
      categoryId: selectedProduct.categoryId,
      supplierName: supplierName,
      unitPrice: selectedProduct.unitPrice || 0, 
      quantity,
      purchaseDate: new Date().toISOString() 
    };

    try {
      const response = await fetch("http://localhost:5036/api/v1/products/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData)
      });

      if (!response.ok) throw new Error("Failed to create purchase");

      console.log("Purchase created successfully");     
      handleCancelPurchase();   
      window.location.reload();
    } catch (error) {
      console.error("Error creating purchase:", error);
      setErrorMessage("Failed to create purchase");
    }
  };


  const handleUseProduct = (productId: number) => {
    console.log(productId);
    setUseProductFormVisible(true);
  }


const handleSubmitUseProduct = (e: FormEvent<HTMLFormElement>) => {
  setErrorMessage("This function is not ready, click on cancel")
  e.preventDefault();
}


const handleCancelUseProduct = () => {
  setUseProductFormVisible(false);
};  


  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-4 text-center title bold-title">All Products</h2>

      <Link className="blue-button all-button mb-4 text-center md:self-end" to={"/newpurchase"}>
      New Purchase
      </Link>

      {errorMessage && <div className="text-center red-text">{errorMessage}</div>}



      {showPurchaseForm && selectedProduct && (
        <form onSubmit={handleSubmitPurchase} className="mb-8 p-4 border border-gray-300 rounded-lg flex flex-col items-center">
          <label>
            Quantity:
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))} 
              required 
              min="1"
              className="ml-2 border border-gray-300 p-1"
            />
          </label>
          <div className="mt-4">
            <button type="submit" className="blue-button all-button mr-2">Save</button>
            <button type="button" onClick={handleCancelPurchase} className="blue-button all-button">Cancel</button>
          </div>
        </form>
      )}

{useProductFormVisible &&  (
    <form onSubmit={handleSubmitUseProduct} className="mb-8 p-4 border border-gray-300 rounded-lg flex flex-col items-center">
        <label>
            Quantity:
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                required 
                min="1"
                className="ml-2 border border-gray-300 p-1"
            />
        </label>
        <div className="mt-4">
            <button type="submit" className="blue-button all-button mr-2">Deduct</button>
            <button type="button" onClick={handleCancelUseProduct} className="blue-button all-button">Cancel</button>
        </div>
        {errorMessage && <p className="red-text">{errorMessage}</p>} 
    </form>
)}


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
              <button onClick={() => handleBuyAgain(product)} className="blue-button all-button mr-2 mt-2">
              Purchase Again
              </button>
              <button onClick={() => handleUseProduct(product.id)} className="green-button all-button mt-2">
              Use Product
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* --- Mobile View --- */}
    <div className="block md:hidden ">
      {processedProducts.map((product) => (
        <div key={product.id} className="border border-gray-300 mb-4 p-4">
          <h3 className="font-bold medium-title">{product.productName}</h3>
          <p><strong>Category:</strong> {product.categoryName}</p>
          <p><strong>In Stock:</strong> {product.totalQuantity}</p>
          <p><strong>Pending orders:</strong> {product.totalQuantityPending}</p>
          <p><strong>Supplier:</strong> {product.suppliersList }</p>
          <div className="">
            <button onClick={() => handleBuyAgain(product)} className="blue-button all-button mr-2 mt-2">
              Purchase Again
            </button>            
            <button onClick={() => handleUseProduct(product.id)} className="green-button all-button mt-2">
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
