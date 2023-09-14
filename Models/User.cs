namespace Check_Management.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string HashedPassword { get; set; }
    public ICollection<Check> Checks { get; set; }
    public ICollection<UserRole> UserRoles { get; set; }
    public bool HaveAccess { get; set; } = false;
    public bool IsAuthenticated { get; set; } = false;
}