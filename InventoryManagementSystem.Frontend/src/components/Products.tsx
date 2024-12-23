import { useEffect, useState } from "react";
import { ProductDatabaseProps } from "../types";
import { fetchProducts } from "../utils/fetchProduct";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<ProductDatabaseProps[] | []>([]);
  const [errorMessage, setErrorMessage] = useState("");

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

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBuyAgain = (productId: number) => {  
    console.log(`Buying again for product ID: ${productId}`);
  };
  
  const handleUseProduct = (productId: number) => {
    console.log(`Using product with ID: ${productId}`);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-4 text-center title">All Products</h2>

      <Link className="blue-button all-button self-end mb-4" to={"/addproduct"}>
      New Purchase
      </Link>

      {errorMessage && <div className="text-center">{errorMessage}</div>}

      {products.length > 0 ? (
    <div className="overflow-x-auto w-full">

    {/* --- Desktop View --- */}
    <table className="min-w-full border-collapse border border-gray-300 hidden md:table">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Product Name</th>
          <th className="border border-gray-300 p-2">Category</th>
          <th className="border border-gray-300 p-2">Quantity</th>
          <th className="border border-gray-300 p-2">Supplier Name</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border border-gray-300 p-2">{product.productName}</td>
            <td className="border border-gray-300 p-2">{product.category?.name || 'N/A'}</td>
            <td className="border border-gray-300 p-2">{product.quantity}</td>
            <td className="border border-gray-300 p-2">{product.supplierName}</td>
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
      {products.map((product) => (
        <div key={product.id} className="border-b border-gray-300 mb-4 p-4">
          <h3 className="font-bold">{product.productName}</h3>
          <p><strong>Category:</strong> {product.category?.name || 'N/A'}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Supplier:</strong> {product.supplierName}</p>
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
