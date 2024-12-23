namespace InventoryManagementSystem.Api.Models
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName {get;set;}
  
    }
}