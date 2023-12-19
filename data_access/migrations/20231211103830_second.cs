using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContectCreators.data_access.migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Videos",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Videos",
                newName: "Name");
        }
    }
}
