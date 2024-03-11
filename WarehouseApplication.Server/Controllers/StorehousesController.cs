using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorehousesController : ControllerBase
    {
        private readonly WarehouseApplicationServerContext _context;

        public StorehousesController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        // GET: api/Storehouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Storehouse>>> GetStorehouse()
        {
            return await _context.Storehouse.ToListAsync();
        }

        // GET: api/Storehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Storehouse>> GetStorehouse(int id)
        {
            var storehouse = await _context.Storehouse.FindAsync(id);

            if (storehouse == null)
            {
                return NotFound();
            }

            return storehouse;
        }

        // PUT: api/Storehouses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStorehouse(int id, Storehouse storehouse)
        {
            if (id != storehouse.StorehouseID)
            {
                return BadRequest();
            }

            _context.Entry(storehouse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StorehouseExists(id))
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

        // POST: api/Storehouses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Storehouse>> PostStorehouse(Storehouse storehouse)
        {
            _context.Storehouse.Add(storehouse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStorehouse", new { id = storehouse.StorehouseID }, storehouse);
        }

        // DELETE: api/Storehouses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStorehouse(int id)
        {
            var storehouse = await _context.Storehouse.FindAsync(id);
            if (storehouse == null)
            {
                return NotFound();
            }

            _context.Storehouse.Remove(storehouse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StorehouseExists(int id)
        {
            return _context.Storehouse.Any(e => e.StorehouseID == id);
        }
    }
}
