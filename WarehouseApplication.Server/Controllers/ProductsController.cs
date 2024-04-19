using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly WarehouseApplicationServerContext _context;

        public ProductsController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            var products = await _context.Product.Select(p => new
            {
                p.ProductID,
                p.ProductName,
                p.ProductBarcode,
            }).ToListAsync();
            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Product.Where(p => p.ProductID == id).Select(p => new
            {
                p.ProductID,
                p.ProductName,
                p.ProductBarcode,
            }).FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductID)
            {
                return BadRequest();
            }

            _context.Product.Update(product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostProduct(List<Product> product)
        {
            var newProducts = new List<Product>();

            if (product.Count == 1)
            {
                if (!_context.Product.Any(p => p.ProductName == product[0].ProductName && p.ProductBarcode == product[0].ProductBarcode) || !_context.Product.Any(p => p.ProductName == product[0].ProductName))
                {
                    _context.Product.Add(product.First());
                }
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetProduct", new { id = product.First().ProductID }, product);
            }
            else
            {
                foreach (var prod in product)
                {
                    if (!_context.Product.Any(p => p.ProductName == prod.ProductName && p.ProductBarcode == prod.ProductBarcode) || !_context.Product.Any(p => p.ProductName == prod.ProductName))
                    {
                        newProducts.Add(prod);
                    }
                }
                _context.Product.AddRange(newProducts);
                await _context.SaveChangesAsync();
                var addedProducts = newProducts.Select(p => new
                {
                    id = p.ProductID,
                    name = p.ProductName,
                    barcode = p.ProductBarcode,
                });
                return CreatedAtAction("GetProduct", addedProducts);
            }

        }


        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.ProductID == id);
        }
    }
}
