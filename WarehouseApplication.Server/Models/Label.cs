using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace WarehouseApplication.Server.Models
{
    public class Label
    {
        [Key]
        public int LabelID { get; set; }
        [Required]
        [SwaggerParameter("Nazwa", Required = true)]
        public string LabelName { get; set; }

        public ICollection<LabelDocument>? LabelDocuments { get; set; }
    }
}
