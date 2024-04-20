using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
        private WarehouseApplicationServerContext _context;

        public LabelsController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabels()
        {
            var labels = await _context.Label.ToListAsync();
            var simplyfiedLabels = labels.Select(l => new
            {
                l.LabelID,
                l.LabelName,
            });
            return Ok(simplyfiedLabels);
        }

        [HttpPost]
        public async Task<IActionResult> AddLabel(Label label)
        {
            if (!label.LabelName.IsNullOrEmpty())
            {
                await _context.Label.AddAsync(label);
            }
            else
            {
                return BadRequest(label);
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetLabels", new
            {
                LabelID = label.LabelID,
                LabelName = label.LabelName,
            });
        }
    }
}
