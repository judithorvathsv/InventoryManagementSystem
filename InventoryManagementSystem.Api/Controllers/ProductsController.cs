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

        [HttpPost("purchase")]
        public async Task<ActionResult<Purchase>> CreatePurchase(AddProductRequest request)
        {
            var existingProduct = await _context.Products
                .FirstOrDefaultAsync(p => p.ProductName == request.ProductName && p.CategoryId == request.CategoryId);

            Product product;
            if (existingProduct is null)
            {
                product = new Product
                {
                    ProductName = request.ProductName,
                    CategoryId = request.CategoryId
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();
            }
            else
            {
                product = existingProduct;
            }

            var purchase = new Purchase
            {
                ProductId = product.Id,
                Quantity = request.Quantity,
                SupplierName = request.SupplierName,
                UnitPrice = request.UnitPrice,
                PurchaseDate = DateTime.Parse(request.PurchaseDate),
                PurchaseStatusId = 1
            };

            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPurchases), new { id = purchase.Id }, purchase);
        }

        [HttpGet("purchases")]
        public ActionResult<List<Purchase>> GetPurchases()
        {
            var purchases = _context.Purchases
                .Include(p => p.Product)
                 .ThenInclude(p => p.Category)
                .Include(p => p.PurchaseStatus)
                .ToList();
            var purchaseResponses = purchases.Select(p => p.ToResponse()).ToList();
            return Ok(purchaseResponses);
        }

    }
}