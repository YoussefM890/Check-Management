using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Check_Management.Migrations
{
    /// <inheritdoc />
    public partial class added_HaveAceess_column_to_users_and_removed_NotNull_from_CheckNumber_column : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Checks_CheckNumber",
                table: "Checks");

            migrationBuilder.AddColumn<bool>(
                name: "HaveAccess",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsAuthenticated",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "CheckNumber",
                table: "Checks",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Checks_CheckNumber",
                table: "Checks",
                column: "CheckNumber",
                unique: true,
                filter: "[CheckNumber] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Checks_CheckNumber",
                table: "Checks");

            migrationBuilder.DropColumn(
                name: "HaveAccess",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsAuthenticated",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "CheckNumber",
                table: "Checks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Checks_CheckNumber",
                table: "Checks",
                column: "CheckNumber",
                unique: true);
        }
    }
}
