using System.Text.Json.Serialization;

namespace Check_Management.Models;

public class UserRole
{
    public int UserId { get; set; }
    public int RoleId { get; set; }

    [JsonIgnore] public User User { get; set; }

    public Role Role { get; set; }
}