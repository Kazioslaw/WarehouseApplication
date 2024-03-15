using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WarehouseApplication.Server.Models
{
	public class DeliveryDocument
	{
		[Key]
		public int DocumentID { get; set; }
        public bool IsApproved { get; set; } = false;
        public bool IsCancelled { get; set; } = false;

		public int SupplierID { get; set;}
		public Supplier Supplier { get; set; }

		public ICollection<LabelDocument>? LabelDocuments { get; set; }

        public ICollection<ProductList>? Products { get; set; }
		
		public int? StorehouseID { get; set; }
		public Storehouse Storehouse { get; set; }
	}
}
