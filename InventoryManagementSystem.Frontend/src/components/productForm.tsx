import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Category, Product } from "../types";
import { fetchCategories } from "../utils/fetchCategory";

const ProductForm = () => {
  const [product, setProduct] = useState<Product>({
    productName: "",
    supplierName: "",
    purchaseDate: "",
    quantity: 0,
    unitPrice: 0,
    categoryId: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const getCategories = async () => {
      const { result, errorMessage } = await fetchCategories();

      if (errorMessage) {
        setErrorMessage(errorMessage);
      } else if (isMounted) {
        setCategories(result || []);
      }
    };

    getCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "unitPrice" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = Number(e.target.value);
    setProduct((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedProduct = {
      ProductName: product.productName,
      SupplierName: product.supplierName,
      PurchaseDate: product.purchaseDate,
      Quantity: product.quantity,
      UnitPrice: product.unitPrice,
      CategoryId: product.categoryId,
    };

    try {
      const response = await fetch("http://localhost:5036/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      handleCancel();
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage("Failed to create product.");
    }
  };

  const handleCancel = () => {
    setProduct({
      productName: "",
      supplierName: "",
      purchaseDate: "",
      quantity: 0,
      unitPrice: 0,
      categoryId: 0,
    });
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <div className="mb-4">
        <label htmlFor="product-name" className="block text-sm font-medium">
          Product Name
        </label>
        <input
          type="text"
          id="product-name"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          className="input input-bordered flex items-center gap-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="supplier-name" className="block text-sm font-medium">
          Supplier Name
        </label>
        <input
          type="text"
          id="supplier-name"
          name="supplierName"
          value={product.supplierName}
          onChange={handleChange}
          className="input input-bordered flex items-center gap-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          name="categoryId"
          value={product.categoryId}
          onChange={handleCategoryChange}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="purchase-date" className="block text-sm font-medium">
          Purchase Date
        </label>
        <input
          type="date"
          id="purchase-date"
          name="purchaseDate"
          value={product.purchaseDate}
          onChange={handleChange}
          className="input input-bordered flex items-center gap-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="input input-bordered flex items-center gap-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="unit-price" className="block text-sm font-medium">
          Unit Price
        </label>
        <input
          type="number"
          id="unit-price"
          name="unitPrice"
          value={product.unitPrice}
          onChange={handleChange}
          className="input input-bordered flex items-center gap-2 w-full"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
