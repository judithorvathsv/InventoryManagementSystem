using InventoryManagementSystem.Api.Models;

namespace InventoryManagementSystem.Api.Mappers
{
    public static class OrderMappers
    {
        public static OrderResponse ToResponse(this Order order)
        {
            return new OrderResponse
            {
                Id = order.Id,
                ProductName = order.Product.ProductName,
                ProductId = order.ProductId,
                CustomerName = order.CustomerName,
                Quantity = order.Quantity,
                UnitPrice = order.UnitPrice,
                OrderDate = order.OrderDate,
                OrderStatusId = order.OrderStatusId,
                Status = order.OrderStatus.Name,
                CategoryName = order.Product?.Category?.Name,
            };
        }

        public static Order ToOrder(this AddOrderRequest request)
        {
            return new Order
            {              
                ProductId = request.ProductId,
                CustomerName = request.CustomerName,
                Quantity = request.Quantity,
                UnitPrice = request.UnitPrice,
                OrderDate = DateTime.Parse(request.OrderDate),
                OrderStatusId = 1,              
            };
        }
    }

}