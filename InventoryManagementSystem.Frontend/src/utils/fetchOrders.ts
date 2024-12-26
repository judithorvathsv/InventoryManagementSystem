import { OrderProps } from "../types";

export const fetchOrders = async (): Promise<{
  result?: OrderProps[];
  errorMessage?: string;
}> => {
  let errorMessage = "";
  let result: OrderProps[] = [];

  try {
    const response = await fetch("http://localhost:5036/api/v1/orders");

    if (!response.ok) {
      errorMessage = "Failed to fetch orders";
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
