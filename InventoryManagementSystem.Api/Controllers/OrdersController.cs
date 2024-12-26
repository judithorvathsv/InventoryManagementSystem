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
                .Include(p => p.Product)
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
    }
}