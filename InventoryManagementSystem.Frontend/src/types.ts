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
  supplierName: string;    
  quantity: number;      
  purchaseDate: string;    
  unitPrice: number;       
  totalCost: number;       
  status: string;   
  purchaseStatusId:number;   
};

export type PurchaseSummary = {
  totalQuantity: number;
  suppliers: Set<string>;
  totalQuantityPending:number;  
  unitPrice?:number;
  fullTotal?:number
}

