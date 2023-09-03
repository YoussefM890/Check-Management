using Check_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Check_Management;

public class ApplicationDbContext : DbContext
{
    public DbSet<Check> Checks { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory()) // Set the path to your project root
            .AddJsonFile("appsettings.json") // Load the appsettings.json file
            .Build();

        string connectionString = configuration.GetConnectionString("DefaultConnection"); // Use the desired key

        optionsBuilder.UseSqlServer(connectionString);
    }

    // Configure your entity relationships and other model configurations here
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        #region User

        // modelBuilder.Entity<User>().Property(u => u.FirstName).HasMaxLength(50);
        // modelBuilder.Entity<User>().Property(u => u.LastName).HasMaxLength(50);

        #endregion

        #region UserRoles

        modelBuilder.Entity<UserRole>()
            .HasKey(ur => new { ur.UserId, ur.RoleId });

        modelBuilder.Entity<UserRole>()
            .HasOne(ur => ur.User)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.UserId);

        modelBuilder.Entity<UserRole>()
            .HasOne(ur => ur.Role)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RoleId);

        #endregion

        // Configure custom entity relationships if needed

        #region Check

        modelBuilder.Entity<Check>()
            .HasIndex(c => c.CheckNumber)
            .IsUnique();

        modelBuilder.Entity<Check>()
            .HasOne(c => c.User)
            .WithMany(u => u.Checks)
            .HasForeignKey(c => c.UserId);


        modelBuilder.Entity<Check>()
            .Property(c => c.Amount)
            .HasColumnType("decimal(18, 2)"); // Set precision and scale accordingly

        #endregion
    }
}