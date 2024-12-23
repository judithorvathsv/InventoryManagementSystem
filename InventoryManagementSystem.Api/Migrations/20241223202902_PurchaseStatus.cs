using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventoryManagementSystem.Api.Migrations
{
    /// <inheritdoc />
    public partial class PurchaseStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PurchaseStatusId",
                table: "Purchases",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PurchaseStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseStatuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "PurchaseStatuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Incoming" },
                    { 2, "Completed" },
                    { 3, "Returned" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_PurchaseStatusId",
                table: "Purchases",
                column: "PurchaseStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_PurchaseStatuses_PurchaseStatusId",
                table: "Purchases",
                column: "PurchaseStatusId",
                principalTable: "PurchaseStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_PurchaseStatuses_PurchaseStatusId",
                table: "Purchases");

            migrationBuilder.DropTable(
                name: "PurchaseStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_PurchaseStatusId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "PurchaseStatusId",
                table: "Purchases");
        }
    }
}
