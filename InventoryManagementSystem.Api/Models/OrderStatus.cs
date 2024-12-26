using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Api.Models
{
    public class OrderStatus
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Order> Orders { get; set; } = [];
    }
}