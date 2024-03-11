using System.ComponentModel.DataAnnotations;

namespace WarehouseApplication.Server.Models
{
	public class Supplier
	{
		[Key]
		public int SupplierID { get; set; }
		public string SupplierName { get; set; }
		public string SupplierAddress { get; set; }
		public string SupplierCity { get; set; }
		public string SupplierZipcode { get; set;}

		public ICollection<DeliveryDocument>? Documents { get; set; }

	}
}
