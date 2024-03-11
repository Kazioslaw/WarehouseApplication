using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryDocumentsController : ControllerBase
    {
        private readonly WarehouseApplicationServerContext _context;

        public DeliveryDocumentsController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        // GET: api/DeliveryDocuments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDocument>>> GetDeliveryDocument()
        {
            return await _context.DeliveryDocument.ToListAsync();
        }

        // GET: api/DeliveryDocuments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDocument>> GetDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.FindAsync(id);

            if (deliveryDocument == null)
            {
                return NotFound();
            }

            return deliveryDocument;
        }

        // PUT: api/DeliveryDocuments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeliveryDocument(int id, DeliveryDocument deliveryDocument)
        {
            if (id != deliveryDocument.DocumentID)
            {
                return BadRequest();
            }

            _context.Entry(deliveryDocument).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryDocumentExists(id))
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

        // POST: api/DeliveryDocuments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DeliveryDocument>> PostDeliveryDocument(DeliveryDocument deliveryDocument)
        {
            _context.DeliveryDocument.Add(deliveryDocument);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliveryDocument", new { id = deliveryDocument.DocumentID }, deliveryDocument);
        }

        // DELETE: api/DeliveryDocuments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.FindAsync(id);
            if (deliveryDocument == null)
            {
                return NotFound();
            }

            _context.DeliveryDocument.Remove(deliveryDocument);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeliveryDocumentExists(int id)
        {
            return _context.DeliveryDocument.Any(e => e.DocumentID == id);
        }

        [HttpPost("Approval/{id}")]
        public async Task<IActionResult> DocumentApproval(int id, bool change)
        {
            var deliveryDocument = await _context.DeliveryDocument.FindAsync(id);
            if (deliveryDocument == null)
            {
                return NotFound();
            }
            if(deliveryDocument.IsApproved != change)
            {
                deliveryDocument.IsApproved = change;
            }
            _context.Update(deliveryDocument);
            await _context.SaveChangesAsync(change);
            return NoContent();
        }

        [HttpPost("Cancelation/{id}")]
        public async Task<IActionResult> DocumentCancelation(int id, bool change)
        {
            var deliveryDocument = await _context.DeliveryDocument.FindAsync(id);
            if(deliveryDocument == null)
            {
                return NotFound();
            }
            if(deliveryDocument.IsCancelled != change)
            {
                deliveryDocument.IsCancelled = change;
            }
            _context.Update(deliveryDocument);
            await _context.SaveChangesAsync(change);
            return NoContent();
        }
    }
}
