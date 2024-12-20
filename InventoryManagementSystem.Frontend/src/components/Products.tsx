import { useEffect, useState } from "react";
import { Product } from "../types";
import { fetchProducts } from "../utils/fetchProduct";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
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

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="mb-4 text-center title">Products</h2>

      <Link className="mt-4 blueButton" to={"/addproduct"}>
        Buy new product
      </Link>

      {errorMessage && <div className="text-center">{errorMessage}</div>}

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.productName}>{product.productName}</li>
          ))}
        </ul>
      ) : (
        <p className="text-center w-full p-4">
          No products have been added yet.{" "}
        </p>
      )}
    </div>
  );
};

export default Products;
