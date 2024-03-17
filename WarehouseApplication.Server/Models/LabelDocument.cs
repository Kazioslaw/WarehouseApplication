using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseApplication.Server.Models
{
	public class LabelDocument
	{
		[ForeignKey("Label")]
		public int LabelID { get; set; }      
        public Label? Label { get; set; }

		[ForeignKey("Document")]
		public int DocumentID { get; set; }        
        public DeliveryDocument? Document { get; set; }
	}
}
