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

        public DbSet<DeliveryDocument> DeliveryDocument { get; set; }
        public DbSet<Label> Label { get; set; }
        public DbSet<LabelDocument> LabelDocument { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductList> ProductList { get; set; }
        public DbSet<Storehouse> Storehouse { get; set; }
        public DbSet<Supplier> Supplier { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            modelBuilder.Entity<LabelDocument>().HasKey(ld => new { ld.DocumentID, ld.LabelID });

            modelBuilder.Entity<LabelDocument>().HasOne(ld => ld.Document).WithMany(d => d.LabelDocuments).HasForeignKey(ld => ld.DocumentID);
            modelBuilder.Entity<LabelDocument>().HasOne(ld => ld.Label).WithMany(d => d.LabelDocuments).HasForeignKey(ld => ld.LabelID);

            base.OnModelCreating(modelBuilder);
		}
	}
}
