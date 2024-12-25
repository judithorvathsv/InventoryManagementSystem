
namespace InventoryManagementSystem.Api.Models
{
    public class AddProductRequest
    {
        public string ProductName { get; set; }
        public string SupplierName { get; set; }
        public string PurchaseDate { get; set; }
        public double Quantity { get; set; }
        public double UnitPrice { get; set; }
        public int CategoryId { get; set; }  
    }
}