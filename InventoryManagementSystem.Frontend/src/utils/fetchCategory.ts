import { Category } from "../types";

export const fetchCategories = async (): Promise<{
  result?: Category[];
  errorMessage?: string;
}> => {
  let errorMessage = "";
  let result: Category[] = [];

  try {
    const response = await fetch("http://localhost:5036/api/v1/categories");

    if (!response.ok) {
      errorMessage = "Failed to fetch the categories";
      throw new Error("Failed to fetch the categories");
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
