using Microsoft.EntityFrameworkCore.Migrations;

namespace CefClientFeatures.Data.Migrations
{
    public partial class BaseModelNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Model1Name",
                table: "ClientFeature",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model2Name",
                table: "ClientFeature",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Model1Name",
                table: "ClientFeature");

            migrationBuilder.DropColumn(
                name: "Model2Name",
                table: "ClientFeature");
        }
    }
}
