using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Common;
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
            var deliveryDocuments = await _context.DeliveryDocument.Include(dd => dd.LabelDocuments)
                                                                    .ThenInclude(ld => ld.Label)
                                                                  .Include(dd => dd.ProductList)
                                                                    .ThenInclude(p => p.Product)
                                                                  .Include(dd => dd.Storehouse)
                                                                  .Include(dd => dd.Supplier)
                                                                    .ThenInclude(s => s.Address)
                                                                   .Select(dd => new
                                                                   {
                                                                       dd.DocumentID,
                                                                       dd.IsApproved,
                                                                       dd.IsCancelled,
                                                                       dd.SupplierID,
                                                                       SupplierInfo = new
                                                                       {
                                                                           SupplierName = dd.Supplier.SupplierName,
                                                                           SupplierAddress = dd.Supplier.Address.Street,
                                                                           SupplierCity = dd.Supplier.Address.City,
                                                                           SupplierZipcode = dd.Supplier.Address.Zipcode,
                                                                       },
                                                                       dd.StorehouseID,
                                                                       StorehouseInfo = new
                                                                       {
                                                                           StorehouseName = dd.Storehouse.StorehouseName,
                                                                           StorehouseSymbol = dd.Storehouse.StorehouseSymbol
                                                                       },
                                                                       LabelDocuments = dd.LabelDocuments.Select(ld => new
                                                                       {
                                                                           LabelID = ld.LabelID,
                                                                           LabelName = ld.Label.LabelName
                                                                       }),
                                                                       ProductList = dd.ProductList.Select(pl => new
                                                                       {
                                                                           ListID = pl.ListID,
                                                                           DocumentID = pl.DocumentID,
                                                                           ProductID = pl.ProductID,
                                                                           ProductName = pl.Product.ProductName,
                                                                           ProductBarcode = pl.Product.ProductBarcode,
                                                                           Quantity = pl.Quantity,
                                                                           Price = pl.Price,
                                                                       })
                                                                   })
                                                                   .ToListAsync();

            return Ok(deliveryDocuments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDocument>> GetDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.Include(dd => dd.LabelDocuments)
                                                                    .ThenInclude(ld => ld.Label)
                                                                  .Include(dd => dd.ProductList)
                                                                    .ThenInclude(p => p.Product)
                                                                  .Include(dd => dd.Storehouse)
                                                                  .Include(dd => dd.Supplier)
                                                                    .ThenInclude(s => s.Address)
                                                                    .Where(dd => dd.DocumentID == id)
                                                                    .Select(dd => new
                                                                    {
                                                                        dd.DocumentID,
                                                                        dd.IsApproved,
                                                                        dd.IsCancelled,
                                                                        dd.SupplierID,
                                                                        dd.StorehouseID,
                                                                        SupplierInfo = new
                                                                        {
                                                                            SupplierName = dd.Supplier.SupplierName,
                                                                            SupplierAddress = dd.Supplier.Address.Street,
                                                                            SupplierCity = dd.Supplier.Address.City,
                                                                            SupplierZipcode = dd.Supplier.Address.Zipcode,
                                                                        },
                                                                        StorehouseInfo = new
                                                                        {
                                                                            StorehouseName = dd.Storehouse.StorehouseName,
                                                                            StorehouseSymbol = dd.Storehouse.StorehouseSymbol
                                                                        },
                                                                        LabelDocuments = dd.LabelDocuments.Select(ld => new
                                                                        {
                                                                            LabelID = ld.LabelID,
                                                                            LabelName = ld.Label.LabelName
                                                                        }),
                                                                        ProductList = dd.ProductList.Select(pl => new
                                                                        {
                                                                            ListID = pl.ListID,
                                                                            DocumentID = pl.DocumentID,
                                                                            ProductID = pl.ProductID,
                                                                            ProductName = pl.Product.ProductName,
                                                                            ProductBarcode = pl.Product.ProductBarcode,
                                                                            Quantity = pl.Quantity,
                                                                            Price = pl.Price,
                                                                        })
                                                                    }).FirstOrDefaultAsync();
            if (!DeliveryDocumentExists(id))
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
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingDocument = await _context.DeliveryDocument
                    .Include(dd => dd.LabelDocuments)
                    .Include(dd => dd.ProductList)
                    .FirstOrDefaultAsync(dd => dd.DocumentID == id);

                if (existingDocument == null)
                {
                    return NotFound();
                }
                existingDocument.StorehouseID = deliveryDocument.StorehouseID;
                existingDocument.SupplierID = deliveryDocument.SupplierID;

                existingDocument.LabelDocuments = deliveryDocument.LabelDocuments;
                foreach (var product in deliveryDocument.ProductList)
                {
                    var existingProduct = existingDocument.ProductList.FirstOrDefault(p => p.ListID == product.ListID);
                    if (existingProduct != null)
                    {
                        existingProduct.Quantity = product.Quantity;
                        existingProduct.Price = product.Price;
                    }
                    else
                    {
                        existingDocument.ProductList.Add(product);
                    }
                }

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

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<DeliveryDocument>> PostDeliveryDocument(DeliveryDocument deliveryDocument)
        {
            _context.DeliveryDocument.Add(deliveryDocument);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliveryDocument", new { id = deliveryDocument.DocumentID }, new
            {
                DocumentID = deliveryDocument.DocumentID,
                IsApproved = deliveryDocument.IsApproved,
                IsCancelled = deliveryDocument.IsCancelled,
                SupplierInfo = new
                {
                    SupplierID = deliveryDocument.SupplierID,
                    SupplierName = deliveryDocument.Supplier.SupplierName,
                    SupplierAddress = deliveryDocument.Supplier.Address.Street,
                    SupplierCity = deliveryDocument.Supplier.Address.City,
                    SupplierZipcode = deliveryDocument.Supplier.Address.Zipcode,
                },
                LabelDocuments = deliveryDocument.LabelDocuments.Select(ld => new
                {
                    LabelID = ld.LabelID,
                    LabelName = ld.Label.LabelName
                }),
                ProductList = deliveryDocument.ProductList.Select(pl => new
                {
                    ListID = pl.ListID,
                    DocumentID = pl.DocumentID,
                    ProductID = pl.Product,
                    ProductName = pl.Product.ProductName,
                    ProductBarcode = pl.Product.ProductBarcode,
                    Quantity = pl.Quantity,
                    Price = pl.Price,
                }),
                StorehouseInfo = new
                {
                    StorehouseID = deliveryDocument.StorehouseID,
                    StorehouseName = deliveryDocument.Storehouse.StorehouseName,
                    StorehouseSymbol = deliveryDocument.Storehouse.StorehouseSymbol
                }
            });
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


        private bool DeliveryDocumentExists(int id)
        {
            return _context.DeliveryDocument.Any(e => e.DocumentID == id);
        }
    }
}
