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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Storehouse>>> GetStorehouses()
        {
            return Ok(await _context.Storehouse.ToListAsync());
        }
    }
}
