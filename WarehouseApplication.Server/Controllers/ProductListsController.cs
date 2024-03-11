using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductListsController : ControllerBase
    {
        private readonly WarehouseApplicationServerContext _context;

        public ProductListsController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        // GET: api/ProductLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductList>>> GetProductList()
        {
            return await _context.ProductList.ToListAsync();
        }

        // GET: api/ProductLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductList>> GetProductList(int id)
        {
            var productList = await _context.ProductList.FindAsync(id);

            if (productList == null)
            {
                return NotFound();
            }

            return productList;
        }

        // PUT: api/ProductLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductList(int id, ProductList productList)
        {
            if (id != productList.ListId)
            {
                return BadRequest();
            }

            _context.Entry(productList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductList>> PostProductList(ProductList productList)
        {
            _context.ProductList.Add(productList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductList", new { id = productList.ListId }, productList);
        }

        // DELETE: api/ProductLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductList(int id)
        {
            var productList = await _context.ProductList.FindAsync(id);
            if (productList == null)
            {
                return NotFound();
            }

            _context.ProductList.Remove(productList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductListExists(int id)
        {
            return _context.ProductList.Any(e => e.ListId == id);
        }
    }
}
