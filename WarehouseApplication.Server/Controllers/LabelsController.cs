using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
        private readonly WarehouseApplicationServerContext _context;

        public LabelsController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        // GET: api/Labels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabel()
        {
            return await _context.Label.ToListAsync();
        }

        // GET: api/Labels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Label>> GetLabel(int id)
        {
            var label = await _context.Label.FindAsync(id);

            if (label == null)
            {
                return NotFound();
            }

            return label;
        }

        // PUT: api/Labels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabel(int id, Label label)
        {
            if (id != label.LabelID)
            {
                return BadRequest();
            }

            _context.Entry(label).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabelExists(id))
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

        // POST: api/Labels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Label>> PostLabel(Label label)
        {
            _context.Label.Add(label);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabel", new { id = label.LabelID }, label);
        }

        // DELETE: api/Labels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabel(int id)
        {
            var label = await _context.Label.FindAsync(id);
            if (label == null)
            {
                return NotFound();
            }

            _context.Label.Remove(label);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LabelExists(int id)
        {
            return _context.Label.Any(e => e.LabelID == id);
        }
    }
}
