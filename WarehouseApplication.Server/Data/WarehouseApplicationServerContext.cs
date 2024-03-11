using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WarehouseApplication.Server.Models;

namespace WarehouseApplication.Server.Data
{
    public class WarehouseApplicationServerContext : DbContext
    {
        public WarehouseApplicationServerContext (DbContextOptions<WarehouseApplicationServerContext> options)
            : base(options)
        {
        }

        public DbSet<DeliveryDocument> DeliveryDocument { get; set; } = default!;
        public DbSet<Label> Label { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductList> ProductList { get; set; }
        public DbSet<Storehouse> Storehouse { get; set; }
        public DbSet<Supplier> Supplier { get; set; }
    }
}
