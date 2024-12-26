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
  id: number;
  productName: string;
  suppliersList: string;
  purchaseDate: string;
  quantity: number;
  unitPrice: number;
  categoryName: string;
  categoryId: number;
};

export type PurchaseProps = {
  id: number;
  productName: string;
  productId: number;
  categoryName: string;
  categoryId: number;
  supplierName: string;
  quantity: number;
  purchaseDate: string;
  unitPrice: number;
  totalCost: number;
  status: string;
  purchaseStatusId: number;
};

export type PurchaseSummary = {
  productName?: string;
  categoryName?: string;
  categoryId?: number;
  totalQuantity: number;
  suppliers?: Set<string>;
  totalQuantityPending: number;
  unitPrice?: number;
  fullTotal?: number;
  hasPendingOrders?: boolean;
};

export type OrderProps = {
  id?: number;
  productId: number;
  productName: string;
  customerName: string;
  orderDate: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status?: string;
  orderStatusId?: number;
  categoryName?: string;
};
