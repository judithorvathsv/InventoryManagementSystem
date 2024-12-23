import { PurchaseProps } from "../types";

export const fetchPurchases = async (): Promise<{
  result?: PurchaseProps[];
  errorMessage?: string;
}> => {
  let errorMessage = "";
  let result: PurchaseProps[] = [];

  try {
    const response = await fetch("http://localhost:5036/api/v1/products/purchases");

    if (!response.ok) {
      errorMessage = "Failed to fetch the purchases";
      throw new Error(errorMessage);
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