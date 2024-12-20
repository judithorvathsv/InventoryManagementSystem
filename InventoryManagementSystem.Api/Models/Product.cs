using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Api.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string ProductName { get; set; }

        public string SupplierName { get; set; }

        public DateOnly PurchaseDate { get; set; }

        public double Quantity { get; set; }

        public double UnitPrice { get; set; }

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}