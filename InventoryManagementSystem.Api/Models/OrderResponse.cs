
namespace InventoryManagementSystem.Api.Models
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string CustomerName { get; set; }
        public double Quantity { get; set; }
        public double UnitPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public double TotalPrice => Quantity * UnitPrice;
        public int OrderStatusId { get; set; }
        public string Status { get; set; }
    }
}