using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseApplication.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeparateAddressTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Adress",
                columns: table => new
                {
                    AddressID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zipcode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adress", x => x.AddressID);
                });

            migrationBuilder.Sql("INSERT INTO Address (Street, City, Zipcode) SELECT SupplierAddress, SupplierCity, SupplierZipcode FROM Supplier");
            migrationBuilder.AddColumn<int>(
                name: "AddressID",
                table: "Supplier",
                type: "int",
                nullable: false,
                defaultValue: 0);
            migrationBuilder.Sql("UPDATE Supplier SET AddressID = Address.AddressID FROM Supplier INNER JOIN Address ON Supplier.SupplierID = Address.AddressID");

            migrationBuilder.DropColumn(
             name: "SupplierAddress",
             table: "Supplier");

            migrationBuilder.DropColumn(
                name: "SupplierCity",
                table: "Supplier");

            migrationBuilder.DropColumn(
                name: "SupplierZipcode",
                table: "Supplier");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_AddressID",
                table: "Supplier",
                column: "AddressID");

            migrationBuilder.AddForeignKey(
                name: "FK_Supplier_Adress_AddressID",
                table: "Supplier",
                column: "AddressID",
                principalTable: "Address",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Supplier_Adress_AddressID",
                table: "Supplier");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Supplier_AddressID",
                table: "Supplier");

            migrationBuilder.DropColumn(
                name: "AddressID",
                table: "Supplier");

            migrationBuilder.AddColumn<string>(
                name: "SupplierAddress",
                table: "Supplier",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SupplierCity",
                table: "Supplier",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SupplierZipcode",
                table: "Supplier",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
