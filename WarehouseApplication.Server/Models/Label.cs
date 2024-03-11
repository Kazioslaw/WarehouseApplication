using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace WarehouseApplication.Server.Models
{
	public class Label
	{
		[Key]
		public int LabelID { get; set; }
		public string LabelName { get; set; }

		public ICollection<DeliveryDocument>? Documents { get; set; }
	}
}
