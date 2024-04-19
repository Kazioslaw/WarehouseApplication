using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly WarehouseApplicationServerContext _context;

        public SuppliersController(WarehouseApplicationServerContext context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSupplier()
        {
            var suppliers = await _context.Supplier.Include(s => s.Address).Select(s => new
            {
                s.SupplierID,
                s.SupplierName,
                Address = new
                {
                    street = s.Address.Street,
                    city = s.Address.City,
                    zipcode = s.Address.Zipcode,
                    country = s.Address.Country,
                }

            }).ToListAsync();
            return Ok(suppliers);
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            var supplier = await _context.Supplier.Where(s => s.SupplierID == id).Select(s => new
            {
                s.SupplierID,
                s.SupplierName,
                Address = new
                {
                    street = s.Address.Street,
                    city = s.Address.City,
                    zipcode = s.Address.Zipcode,
                    country = s.Address.Country,
                }
            }).FirstOrDefaultAsync();

            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, Supplier supplier)
        {
            if (id != supplier.SupplierID)
            {
                return BadRequest();
            }

            var existingAddress = await _context.Address.FirstOrDefaultAsync(a => a.Street == supplier.Address.Street &&
                                                                             a.City == supplier.Address.City &&
                                                                             a.Zipcode == supplier.Address.Zipcode &&
                                                                             a.Country == supplier.Address.Country);

            if (existingAddress == null)
            {
                _context.Address.Add(supplier.Address);

            }
            else
            {
                supplier.Address = existingAddress;
            }

            _context.Supplier.Update(supplier);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(supplier);
        }

        // POST: api/Suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(Supplier supplier)
        {
            var existingAddress = await _context.Address.FirstOrDefaultAsync(a => a.Street == supplier.Address.Street &&
                                                                             a.City == supplier.Address.City &&
                                                                             a.Zipcode == supplier.Address.Zipcode &&
                                                                             a.Country == supplier.Address.Country);

            var existingSupplier = await _context.Supplier.FirstOrDefaultAsync(s => s.SupplierName == supplier.SupplierName &&
                                                                                s.Address.Street == supplier.Address.Street &&
                                                                             s.Address.City == supplier.Address.City &&
                                                                             s.Address.Zipcode == supplier.Address.Zipcode &&
                                                                             s.Address.Country == supplier.Address.Country);

            if (existingAddress == null)
            {

                _context.Address.Add(supplier.Address);
            }
            else
            {
                supplier.Address = existingAddress;
            }

            if (existingSupplier != null)
            {
                return BadRequest("This supplier is exist in database");
            }

            _context.Supplier.Add(supplier);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetSupplier", new { id = supplier.SupplierID }, new
            {
                SupplierID = supplier.SupplierID,
                SupplierName = supplier.SupplierName,
                Street = supplier.Address.Street,
                City = supplier.Address.City,
                Zipcode = supplier.Address.Zipcode,
                Country = supplier.Address.Country
            });
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplier = await _context.Supplier.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            var address = await _context.Address.FindAsync(supplier.AddressID);
            if (address != null)
            {
                var isAddressUsed = await _context.Supplier.AnyAsync(s => s.AddressID == address.AddressID && s.SupplierID != id);

                if (!isAddressUsed)
                {
                    _context.Address.Remove(address);
                }
            }

            _context.Supplier.Remove(supplier);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool SupplierExists(int id)
        {
            return _context.Supplier.Any(e => e.SupplierID == id);
        }
    }
}
