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
                CategoryId = request.CategoryId
            };
        }

        public static ProductResponse ToResponse(this Product product)
        {
            return new ProductResponse
            {
                Id = product.Id,
                ProductName = product.ProductName,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name
            };
        }
    }
}
