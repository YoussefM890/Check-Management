using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Check_Management;
using Check_Management.Models;
using Microsoft.IdentityModel.Tokens;

namespace AdminPanelv1.Services;

public class AuthService
{
    private static ApplicationDbContext db = new ApplicationDbContext();

    public static User? ValidateUserCredentials(string email, string password)
    {
        User? user = db.Users.FirstOrDefault(user => user.Email == email && user.Password == password);
        return user;
    }

    public static string GenerateBearerToken(int expiryInMinutes, params Claim[] claims)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_best_secret_key_ever_1234567890"));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = "localhost",
            Audience = "localhost",
            Expires = DateTime.UtcNow.AddMinutes(expiryInMinutes),
            SigningCredentials = credentials,
            Subject = new ClaimsIdentity(claims)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public static User RegisterUser(RegisterIn userIn)
    {
        #region User

        var user = new User
        {
            FirstName = userIn.FirstName,
            LastName = userIn.LastName,
            Email = userIn.Email,
            Password = userIn.Password,
            HashedPassword = userIn.Password,
        };
        db.Add(user);
        db.SaveChanges();

        #endregion

        #region Role

        UserRole role = new UserRole
        {
            UserId = user.Id,
            RoleId = 1 //normal user
        };
        db.Add(role);
        db.SaveChanges();

        #endregion

        return user;
    }
}