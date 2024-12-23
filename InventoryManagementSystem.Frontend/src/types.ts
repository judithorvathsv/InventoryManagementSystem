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
  categoryName: string;
  categoryId: number;
};

export type PurchaseProps = {
  id: number;               
  productName: string;      
  supplierName: string;    
  quantity: number;        
  purchaseDate: string;    
  unitPrice: number;       
  totalCost: number;       
  status: string;          
};

