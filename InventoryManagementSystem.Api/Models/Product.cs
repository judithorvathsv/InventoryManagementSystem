using System.ComponentModel.DataAnnotations;

namespace InventoryManagementSystem.Api.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string ProductName { get; set; }  

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}