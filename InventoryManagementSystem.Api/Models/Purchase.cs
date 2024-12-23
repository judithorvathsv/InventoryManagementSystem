using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Api.Models
{
    public class Purchase
    {
        [Key]
        public int Id { get; set; }

        public int ProductId { get; set; }

        public double Quantity { get; set; }

        public string SupplierName { get; set; }

        public double UnitPrice { get; set; }

        public DateTime PurchaseDate { get; set; }

        public virtual Product Product { get; set; }

    }
}