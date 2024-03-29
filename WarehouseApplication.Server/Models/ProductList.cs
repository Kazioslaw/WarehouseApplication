﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseApplication.Server.Models
{
	public class ProductList
	{
		[Key]
		public int ListID{ get; set; }

		[ForeignKey("DeliveryDocument")]
		public int DocumentID { get; set; }
		public DeliveryDocument? Document { get; set; }

		[ForeignKey("Product")]
		public int ProductID { get; set; }
		public Product? Product { get; set; }
		
		public int Quantity { get; set; }
		public decimal Price { get; set; }
	}
}
