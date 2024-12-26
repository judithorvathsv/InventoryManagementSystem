using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Api.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int ProductId { get; set; }

        public double Quantity { get; set; }

        public string CustomerName { get; set; }

        public double UnitPrice { get; set; }

        public DateTime OrderDate { get; set; }

        public virtual Product Product { get; set; }

        public int OrderStatusId { get; set; }

        public virtual OrderStatus OrderStatus { get; set; }
    }
}