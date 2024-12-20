import { Product } from "../types";

export const fetchProducts = async (): Promise<{
  result?: Product[];
  errorMessage?: string;
}> => {
  let errorMessage = "";
  let result: Product[] = [];

  try {
    const response = await fetch("http://localhost:5036/api/v1/products");

    if (!response.ok) {
      errorMessage = "Failed to fetch the products";
      throw new Error("Failed to fetch the products");
    }

    result = await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error: ", error);
      errorMessage = error.message;
    } else {
      console.error("Unexpected error:", error);
      errorMessage = "An unexpected error occurred";
    }
  }
  return { result, errorMessage };
};
