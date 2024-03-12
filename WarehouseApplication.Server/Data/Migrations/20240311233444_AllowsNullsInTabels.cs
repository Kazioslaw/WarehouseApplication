using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseApplication.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AllowsNullsInTabels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDocument_Storehouse_StorehouseID",
                table: "DeliveryDocument");

            migrationBuilder.AlterColumn<int>(
                name: "StorehouseID",
                table: "DeliveryDocument",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDocument_Storehouse_StorehouseID",
                table: "DeliveryDocument",
                column: "StorehouseID",
                principalTable: "Storehouse",
                principalColumn: "StorehouseID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryDocument_Storehouse_StorehouseID",
                table: "DeliveryDocument");

            migrationBuilder.AlterColumn<int>(
                name: "StorehouseID",
                table: "DeliveryDocument",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryDocument_Storehouse_StorehouseID",
                table: "DeliveryDocument",
                column: "StorehouseID",
                principalTable: "Storehouse",
                principalColumn: "StorehouseID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
