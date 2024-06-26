﻿using Microsoft.AspNetCore.Mvc;
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
            var storehouses = await _context.Storehouse.Select(s => new
            {
                s.StorehouseID,
                s.StorehouseName,
                s.StorehouseSymbol,
            }).ToListAsync();
            return Ok(storehouses);
        }
    }
}
