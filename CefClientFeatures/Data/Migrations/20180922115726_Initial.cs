using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CefClientFeatures.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Feature",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    IsCore = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feature", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClientFeature",
                columns: table => new
                {
                    Model1Id = table.Column<Guid>(nullable: false),
                    Model2Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientFeature", x => new { x.Model1Id, x.Model2Id });
                    table.ForeignKey(
                        name: "FK_ClientFeature_Client_Model1Id",
                        column: x => x.Model1Id,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientFeature_Feature_Model2Id",
                        column: x => x.Model2Id,
                        principalTable: "Feature",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Client_Name",
                table: "Client",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClientFeature_Model2Id",
                table: "ClientFeature",
                column: "Model2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Feature_Name",
                table: "Feature",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientFeature");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Feature");
        }
    }
}
