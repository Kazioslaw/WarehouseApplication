using System.ComponentModel.DataAnnotations;

namespace WarehouseApplication.Server.Models
{
	public class Storehouse
	{
		[Key]
		public int StorehouseID { get; set; }
		public string StorehouseName { get; set; }
		public string StorehouseSymbol { get; set; }

		public ICollection<DeliveryDocument> Documents { get; set; }

    }
}
