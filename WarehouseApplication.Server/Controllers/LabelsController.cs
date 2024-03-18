using Microsoft.AspNetCore.Http;
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
        private WarehouseApplicationServerContext _context;

        public LabelsController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabels()
        {
            return Ok(await _context.Label.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddLabel(Label label)
        {
            await _context.Label.AddAsync(label);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
