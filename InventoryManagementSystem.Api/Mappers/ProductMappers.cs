using InventoryManagementSystem.Api.Models;

namespace InventoryManagementSystem.Api.Mappers
{
    public static class ProductMappers
    {
        public static Product ToProduct(this AddProductRequest request)
        {
            return new Product
            {
                ProductName = request.ProductName,
                SupplierName = request.SupplierName,
                PurchaseDate = request.PurchaseDate,
                Quantity = request.Quantity,
                UnitPrice = request.UnitPrice,
                CategoryId = request.CategoryId
            };
        }

        public static ProductResponse ToResponse(this Product product)
        {
            return new ProductResponse
            {
                ProductName = product.ProductName,
                SupplierName = product.SupplierName,
                PurchaseDate = product.PurchaseDate,
                Quantity = product.Quantity,
                UnitPrice = product.UnitPrice,
                CategoryId = product.CategoryId
            };
        }
    }
}
