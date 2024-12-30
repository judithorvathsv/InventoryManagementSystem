using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Api.Models
{
    public class AddOrderRequest
    {
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public string CustomerName { get; set; }
        public string OrderDate { get; set; }
        public double Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double TotalPrice => Quantity * UnitPrice;
    }
}