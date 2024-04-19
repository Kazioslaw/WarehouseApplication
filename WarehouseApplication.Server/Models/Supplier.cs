using System.ComponentModel.DataAnnotations;

namespace WarehouseApplication.Server.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }

        public int AddressID { get; set; }
        public Address Address { get; set; }

        public ICollection<DeliveryDocument>? Documents { get; set; }
    }
}
