namespace InventoryManagementSystem.Api.Models
{
    public class PurchaseResponse
    {
        public int Id { get; set; }
         public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string SupplierName { get; set; }
        public double Quantity { get; set; }
        public double UnitPrice { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double TotalCost => Quantity * UnitPrice; 
        public int  PurchaseStatusId {get;set;} 
        public string Status {get; set;}
    }
}