using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using NuGet.Common;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDocument>>> GetDeliveryDocument()
        {
            var deliveryDocuments = await _context.DeliveryDocument.Include(dd => dd.LabelDocuments).ThenInclude(ld => ld.Label).Select(dd => 
            new DeliveryDocument
            {
                DocumentID = dd.DocumentID,
                IsApproved = dd.IsApproved,
                IsCancelled = dd.IsCancelled,
                SupplierID = dd.SupplierID,
                Supplier = new Supplier
                {
                    SupplierName = dd.Supplier.SupplierName,
                },
                StorehouseID = dd.StorehouseID,
                Storehouse = new Storehouse { 
                    StorehouseName = dd.Storehouse.StorehouseName, 
                },
                LabelDocuments = dd.LabelDocuments.Select(ld => new LabelDocument
                {
                    LabelID = ld.Label.LabelID,
                    Label = new Label { 
                        LabelName = ld.Label.LabelName
                    }
                }).ToList(),
                Products = dd.Products.Select(pl => new ProductList
                {
                    ProductID = pl.Product.ProductID,
                    Product = new Product
                    {
                        ProductName = pl.Product.ProductName,
                        ProductBarcode = pl.Product.ProductBarcode,
                    },
                    Quantity = pl.Quantity,
                    Price = pl.Price
                }).ToList()
            }).ToListAsync();

            return deliveryDocuments;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDocument>> GetDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.Include(dd => dd.LabelDocuments).ThenInclude(ld => ld.Label).Select(dd =>
            new DeliveryDocument
            {
                DocumentID = dd.DocumentID,
                IsApproved = dd.IsApproved,
                IsCancelled = dd.IsCancelled,
                SupplierID = dd.SupplierID,
                Supplier = new Supplier
                {
                    SupplierName = dd.Supplier.SupplierName,
                },
                StorehouseID = dd.StorehouseID,
                Storehouse = new Storehouse
                {
                    StorehouseName = dd.Storehouse.StorehouseName,
                },
                LabelDocuments = dd.LabelDocuments.Select(ld => new LabelDocument
                {
                    LabelID = ld.Label.LabelID,
                    Label = new Label
                    {
                        LabelName = ld.Label.LabelName
                    }
                }).ToList(),
                Products = dd.Products.Select(pl => new ProductList
                {
                    ProductID = pl.Product.ProductID,
                    Product = new Product
                    {
                        ProductName = pl.Product.ProductName,
                        ProductBarcode = pl.Product.ProductBarcode,
                    },
                    Quantity = pl.Quantity,
                    Price = pl.Price
                }).ToList()
            }).SingleOrDefaultAsync(dd => dd.DocumentID == id);

            if(!DeliveryDocumentExists(id))
            {
                return NotFound();
            }     

            return Ok(deliveryDocument);
        }

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

        [HttpPost]
        public async Task<ActionResult<DeliveryDocument>> PostDeliveryDocument(DeliveryDocument deliveryDocument)
        {
            _context.DeliveryDocument.Add(deliveryDocument);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliveryDocument", new { id = deliveryDocument.DocumentID }, deliveryDocument);
        }

        private bool DeliveryDocumentExists(int id)
        {
            return _context.DeliveryDocument.Any(e => e.DocumentID == id);
        }

        [HttpPut("Approve/{id}")]
        public async Task<IActionResult> ApproveDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.FindAsync(id);

            if (!DeliveryDocumentExists(id))
            {
                return NotFound();
            }

            deliveryDocument.IsApproved = true;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("Cancel/{id}")]
        public async Task<IActionResult> CancelDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.FindAsync(id);

            if (!DeliveryDocumentExists(id))
            {
                return NotFound();
            }

            deliveryDocument.IsCancelled = true;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
