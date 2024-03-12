using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseApplication.Server.Models
{
	public class DeliveryDocument
	{
		[Key]
		public int DocumentID { get; set; }
		public bool IsApproved { get; set; } = false;
		public bool IsCancelled { get; set; } = false;

		[ForeignKey(nameof(SupplierID))]
		public int SupplierID { get; set;}
		public Supplier? Supplier { get; set; }

		public ICollection<Label>? Labels { get; set; }
		
		public ICollection<ProductList>? Products { get; set; }
		
		[ForeignKey(nameof(StorehouseID))]
		public int? StorehouseID { get; set; }
		public Storehouse? Storehouse { get; set; }
	}
}
