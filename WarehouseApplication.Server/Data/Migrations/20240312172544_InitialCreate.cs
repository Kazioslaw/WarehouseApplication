using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseApplication.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Label",
                columns: table => new
                {
                    LabelID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LabelName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Label", x => x.LabelID);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductBarcode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductID);
                });

            migrationBuilder.CreateTable(
                name: "Storehouse",
                columns: table => new
                {
                    StorehouseID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StorehouseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StorehouseSymbol = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Storehouse", x => x.StorehouseID);
                });

            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    SupplierID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SupplierName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupplierAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupplierCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SupplierZipcode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.SupplierID);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryDocument",
                columns: table => new
                {
                    DocumentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    IsCancelled = table.Column<bool>(type: "bit", nullable: false),
                    SupplierID = table.Column<int>(type: "int", nullable: false),
                    StorehouseID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryDocument", x => x.DocumentID);
                    table.ForeignKey(
                        name: "FK_DeliveryDocument_Storehouse_StorehouseID",
                        column: x => x.StorehouseID,
                        principalTable: "Storehouse",
                        principalColumn: "StorehouseID");
                    table.ForeignKey(
                        name: "FK_DeliveryDocument_Supplier_SupplierID",
                        column: x => x.SupplierID,
                        principalTable: "Supplier",
                        principalColumn: "SupplierID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LabelDocument",
                columns: table => new
                {
                    LabelID = table.Column<int>(type: "int", nullable: false),
                    DocumentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabelDocument", x => new { x.DocumentID, x.LabelID });
                    table.ForeignKey(
                        name: "FK_LabelDocument_DeliveryDocument_DocumentID",
                        column: x => x.DocumentID,
                        principalTable: "DeliveryDocument",
                        principalColumn: "DocumentID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LabelDocument_Label_LabelID",
                        column: x => x.LabelID,
                        principalTable: "Label",
                        principalColumn: "LabelID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductList",
                columns: table => new
                {
                    ListID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DocumentID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductList", x => x.ListID);
                    table.ForeignKey(
                        name: "FK_ProductList_DeliveryDocument_DocumentID",
                        column: x => x.DocumentID,
                        principalTable: "DeliveryDocument",
                        principalColumn: "DocumentID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductList_Product_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDocument_StorehouseID",
                table: "DeliveryDocument",
                column: "StorehouseID");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDocument_SupplierID",
                table: "DeliveryDocument",
                column: "SupplierID");

            migrationBuilder.CreateIndex(
                name: "IX_LabelDocument_LabelID",
                table: "LabelDocument",
                column: "LabelID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductList_DocumentID",
                table: "ProductList",
                column: "DocumentID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductList_ProductID",
                table: "ProductList",
                column: "ProductID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabelDocument");

            migrationBuilder.DropTable(
                name: "ProductList");

            migrationBuilder.DropTable(
                name: "Label");

            migrationBuilder.DropTable(
                name: "DeliveryDocument");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Storehouse");

            migrationBuilder.DropTable(
                name: "Supplier");
        }
    }
}
