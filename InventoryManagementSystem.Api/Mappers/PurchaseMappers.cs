using InventoryManagementSystem.Api.Models;

namespace InventoryManagementSystem.Api.Mappers
{
    public static class PurchaseMappers
    {
        public static PurchaseResponse ToResponse(this Purchase purchase)
        {
            return new PurchaseResponse
            {
                Id = purchase.Id,
                ProductName = purchase.Product.ProductName,
                ProductId = purchase.ProductId,
                SupplierName = purchase.SupplierName,
                Quantity = purchase.Quantity,
                UnitPrice = purchase.UnitPrice,
                PurchaseDate = purchase.PurchaseDate,
                PurchaseStatusId = purchase.PurchaseStatusId,
                Status = purchase.PurchaseStatus.Name
            };
        }
    }
}