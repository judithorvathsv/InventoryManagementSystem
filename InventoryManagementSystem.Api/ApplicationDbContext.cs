using InventoryManagementSystem.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Api
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseStatus> PurchaseStatuses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }

        public static void SeedCategories(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Raw Material" },
                new Category { Id = 2, Name = "Final Product" }
            );

            modelBuilder.Entity<PurchaseStatus>().HasData(
                new PurchaseStatus { Id = 1, Name = "Incoming" },
                new PurchaseStatus { Id = 2, Name = "Completed" },
                new PurchaseStatus { Id = 3, Name = "Returned" } 
            );

            modelBuilder.Entity<OrderStatus>().HasData(
                new OrderStatus { Id = 1, Name = "Processing" },
                new OrderStatus { Id = 2, Name = "Sent" },
                new OrderStatus { Id = 3, Name = "Cancelled" } 
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SeedCategories(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Purchase>()
                .HasOne(p => p.PurchaseStatus)
                .WithMany(ps => ps.Purchases)
                .HasForeignKey(p => p.PurchaseStatusId);

            modelBuilder.Entity<Order>()
                .HasOne(p => p.OrderStatus)
                .WithMany(ps => ps.Orders)
                .HasForeignKey(p => p.OrderStatusId);

            base.OnModelCreating(modelBuilder);
        }
    }
}