using System.ComponentModel.DataAnnotations;

namespace WarehouseApplication.Server.Models
{
    public class Address
    {
        [Key]
        public int AddressID { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Zipcode { get; set; }

        public ICollection<Supplier>? Suppliers { get; set; }
    }
}
