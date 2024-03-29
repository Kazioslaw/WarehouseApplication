﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using NuGet.Common;
using NuGet.Versioning;
using WarehouseApplication.Server.Data;
using WarehouseApplication.Server.Models;
using static System.Net.WebRequestMethods;

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
                                                                  .Include(dd => dd.ProductLists)
                                                                    .ThenInclude(p => p.Product)
                                                                  .Include(dd => dd.Storehouse)
                                                                  .Include(dd => dd.Supplier).ToListAsync();

            var simplyfiedDocument = deliveryDocuments.Select(dd => new
            {
                dd.DocumentID,
                dd.IsApproved,
                dd.IsCancelled,
                SupplierInfo = new
                {
                    SupplierID = dd.Supplier?.SupplierID,
                    SupplierName = dd.Supplier?.SupplierName,
                    SupplierAddress = dd.Supplier?.SupplierAddress,
                    SupplierCity = dd.Supplier?.SupplierCity,
                    SupplierZipcode = dd.Supplier?.SupplierZipcode,
                },
                labelDocuments = dd.LabelDocuments.Select(ld => new
                {
                    LabelID = ld.LabelID,
                    LabelName = ld.Label?.LabelName
                }),
                ProductLists = dd.ProductLists.Select(pl => new
                {
                    ListID = pl.ListID,
                    DocumentID = pl.DocumentID,
                    ProductID = pl.ProductID,
                    ProductName = pl.Product?.ProductName,
                    ProductBarcode = pl.Product?.ProductBarcode,
                    Quantity = pl.Quantity,
                    Price = pl.Price,
                }),
                StorehouseInfo = new
                {
                    StorehouseID = dd.Storehouse?.StorehouseID,
                    StorehouseName = dd.Storehouse?.StorehouseName,
                    StorehouseSymbol = dd.Storehouse?.StorehouseSymbol,
                }
            });

            return Ok(simplyfiedDocument);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDocument>> GetDeliveryDocument(int id)
        {
            var deliveryDocument = await _context.DeliveryDocument.Include(dd => dd.LabelDocuments)
                                                                    .ThenInclude(ld => ld.Label)
                                                                  .Include(dd => dd.ProductLists)
                                                                    .ThenInclude(p => p.Product)
                                                                  .Include(dd => dd.Storehouse)
                                                                  .Include(dd => dd.Supplier)
                                                                  .SingleOrDefaultAsync(dd => dd.DocumentID == id);
            var simplyfiedDocument = new
            {
                deliveryDocument.DocumentID,
                deliveryDocument.IsApproved,
                deliveryDocument.IsCancelled,
                deliveryDocument.SupplierID,
                SupplierInfo = new
                {
                    SupplierName = deliveryDocument.Supplier?.SupplierName,
                    SupplierAddress = deliveryDocument.Supplier?.SupplierAddress,
                    SupplierCity = deliveryDocument.Supplier?.SupplierCity,
                    SupplierZipcode = deliveryDocument.Supplier?.SupplierZipcode,
                },
                labelDocuments = deliveryDocument.LabelDocuments.Select(ld => new
                {
                    LabelID = ld.LabelID,
                    LabelName = ld.Label?.LabelName
                }),
                ProductLists = deliveryDocument.ProductLists.Select(pl => new
                {
                    ListID = pl.ListID,
                    DocumentID = pl.DocumentID,
                    ProductID = pl.ProductID,
                    ProductName = pl.Product?.ProductName,
                    ProductBarcode = pl.Product?.ProductBarcode,
                    Quantity = pl.Quantity,
                    Price = pl.Price,
                }),
                deliveryDocument.StorehouseID,
                StorehouseInfo = new
                {
                    StorehouseName = deliveryDocument.Storehouse?.StorehouseName,
                    StorehouseSymbol = deliveryDocument.Storehouse?.StorehouseSymbol,
                }
            };

            if (!DeliveryDocumentExists(id))
            {
                return NotFound();
            }

            return Ok(simplyfiedDocument);
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
                    .Include(dd => dd.ProductLists)
                    .FirstOrDefaultAsync(dd => dd.DocumentID == id);

                if (existingDocument == null)
                {
                    return NotFound();
                }
                
                _context.Entry(existingDocument).CurrentValues.SetValues(deliveryDocument);

                // Remove existing label documents
                _context.LabelDocument.RemoveRange(existingDocument.LabelDocuments);
                _context.ProductList.RemoveRange(existingDocument.ProductLists);
                foreach (var labelDocument in deliveryDocument.LabelDocuments)
                {
                    existingDocument.LabelDocuments.Add(labelDocument);
                }
                foreach(var productList in deliveryDocument.ProductLists)
                {
                    existingDocument.ProductLists.Add(productList);
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

            return CreatedAtAction("GetDeliveryDocument", new { id = deliveryDocument.DocumentID }, deliveryDocument);
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
