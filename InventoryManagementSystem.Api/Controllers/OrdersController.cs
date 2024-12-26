using InventoryManagementSystem.Api.Mappers;
using InventoryManagementSystem.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Api.Controllers
{
    [ApiController, Route("api/v1/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("{id}")]
        public ActionResult<ProductResponse> Get(int id)
        {
            var order = _context.Orders.FirstOrDefault(p => p.Id == id);

            if (order is null)
            {
                return NotFound();
            }
            return Ok(order.ToResponse());
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Create(AddOrderRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);

            if (product is null)
            {
                return BadRequest("Invalid product");
            }

            Order order = request.ToOrder();
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
        }

        [HttpGet]
        public ActionResult<List<Order>> GetOrderList()
        {
            var orders = _context.Orders
                .Include(o => o.OrderStatus)
                .Include(o => o.Product)
                 .ThenInclude(p => p.Category) 
                .ToList();
            var orderResponses = orders.Select(p => p.ToResponse()).ToList();
            return Ok(orderResponses);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] int newStatusId)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order is null)
            {
                return NotFound();
            }

            order.OrderStatusId = newStatusId;
            await _context.SaveChangesAsync();
            return Ok(order);
        }

        [HttpPut("{id}/send")]
        public async Task<ActionResult<Order>> Send(AddOrderRequest request, int id)
        {
            var product = await _context.Products.FindAsync(request.ProductId);

            if (product is null)
            {
                return BadRequest("Invalid product");
            }

            var purchases = await _context.Purchases
                .Where(p => p.ProductId == request.ProductId && p.PurchaseStatusId == 2)
                .ToListAsync();

            double totalAvailableQuantity = purchases.Sum(p => p.Quantity);

            if (totalAvailableQuantity < request.Quantity)
            {
                return BadRequest(new { message = "Insufficient stock to fulfill the order." });
            }

            double remainingOrderQuantity = request.Quantity;

            foreach (var purchase in purchases.OrderBy(p => p.PurchaseDate))
            {
                if (remainingOrderQuantity <= 0) break;

                if (purchase.Quantity >= remainingOrderQuantity)
                {
                    purchase.Quantity -= remainingOrderQuantity;
                    remainingOrderQuantity = 0;
                }
                else
                {
                    remainingOrderQuantity -= purchase.Quantity;
                    purchase.Quantity = 0;
                }

                _context.Purchases.Update(purchase);
            }

            var order = _context.Orders.Find(id);
            order!.OrderStatusId = 2;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
        }


    }
}