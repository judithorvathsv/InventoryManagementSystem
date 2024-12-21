using InventoryManagementSystem.Api.Mappers;
using InventoryManagementSystem.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Api.Controllers
{
    [ApiController, Route("api/v1/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<Product> GetProductList()
        {
            var products = _context.Products
                    .Include(p => p.Category)
                    .ToList();

            var productResponses = products.Select(product =>
            {
                var productResponse = product.ToResponse();
                productResponse.Category = new Category
                {
                    Id = product.Category.Id,
                    Name = product.Category.Name
                };
                return productResponse;
            }).ToList();

            return Ok(productResponses);
        }


        [HttpPost]
        public async Task<ActionResult<Product>> Create(AddProductRequest request)
        {
            var category = await _context.Categories.FindAsync(request.CategoryId);

            if (category is null)
            {
                return BadRequest("Invalid category id");
            }

            var product = request.ToProduct();
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var response = product.ToResponse();
            return CreatedAtAction(nameof(Get), new { id = product.Id }, response);
        }

        [HttpGet("{id}")]
        public ActionResult<ProductResponse> Get(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);

            if (product is null)
            {
                return NotFound();
            }

            return Ok(product.ToResponse());
        }

    }
}