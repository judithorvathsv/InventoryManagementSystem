export type Product = {
  productName: string;
  supplierName: string;
  purchaseDate: string;
  quantity: number;
  unitPrice: number;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
};
