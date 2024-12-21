export type ProductProps = {
  productName: string;
  supplierName: string;
  purchaseDate: string;
  quantity: number;
  unitPrice: number;
  categoryId: number;
};

export type CategoryProps = {
  id: number;
  name: string;
};

export type ProductDatabaseProps = {
  id:number,
  productName: string;
  supplierName: string;
  purchaseDate: string;
  quantity: number;
  unitPrice: number;
  categoryId: number;
  category: CategoryProps
}
