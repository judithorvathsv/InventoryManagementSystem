using System;
using System.Collections.Generic;
using System.Linq;
using InventoryManagementSystem.Api.Models;
using Microsoft.AspNetCore.Mvc;

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
        public ActionResult<Product> GetproductList() => Ok(_context.Products.ToList());



    }
}