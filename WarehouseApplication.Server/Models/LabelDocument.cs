using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseApplication.Server.Models
{
	public class LabelDocument
	{
		public int LabelID { get; set; }
		public Label Label { get; set; }

		public int DocumentID { get; set; }
		public DeliveryDocument Document { get; set; }
	}
}
