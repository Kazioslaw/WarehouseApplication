using System.ComponentModel.DataAnnotations;

namespace WarehouseApplication.Server.Models
{
	public class Product
	{
		[Key]
		public int ProductID { get; set; }
		public string ProductName { get; set; }
		public string ProductBarcode { get; set; }
	
		public ICollection<ProductList>? ProductsList { get; set; } 
	}
}
