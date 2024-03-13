using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseApplication.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class ManyToManyRelationshipJoinTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeliveryDocumentLabel");

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

            migrationBuilder.CreateIndex(
                name: "IX_LabelDocument_LabelID",
                table: "LabelDocument",
                column: "LabelID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabelDocument");

            migrationBuilder.CreateTable(
                name: "DeliveryDocumentLabel",
                columns: table => new
                {
                    DocumentsDocumentID = table.Column<int>(type: "int", nullable: false),
                    LabelsLabelID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryDocumentLabel", x => new { x.DocumentsDocumentID, x.LabelsLabelID });
                    table.ForeignKey(
                        name: "FK_DeliveryDocumentLabel_DeliveryDocument_DocumentsDocumentID",
                        column: x => x.DocumentsDocumentID,
                        principalTable: "DeliveryDocument",
                        principalColumn: "DocumentID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryDocumentLabel_Label_LabelsLabelID",
                        column: x => x.LabelsLabelID,
                        principalTable: "Label",
                        principalColumn: "LabelID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDocumentLabel_LabelsLabelID",
                table: "DeliveryDocumentLabel",
                column: "LabelsLabelID");
        }
    }
}
