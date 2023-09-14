using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Check_Management.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Check_Management.Services;

public class AuthService
{
    public static User ValidateUserCredentials(string email, string password)
    {
        using var db = new ApplicationDbContext();
        var passwordHasher = new PasswordHasher<User>();
        User? user = db.Users
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .AsNoTracking()
            .FirstOrDefault(user => user.Email == email);
        if (user == null)
            throw new UserNotFoundException("Invalid Credentials.");
        var res = passwordHasher.VerifyHashedPassword(user, user.HashedPassword, password);
        if (res == PasswordVerificationResult.Failed)
            throw new UserNotFoundException("Invalid Credentials.");
        if (!user.HaveAccess)
            throw new UserDoesNotHaveAccessException("You do not have access to login.");
        user.IsAuthenticated = true;
        db.Users.Update(user);
        db.SaveChanges();
        return user;
    }

    public static string GenerateBearerToken(int expiryInMinutes, List<Claim> claims)
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
        using var db = new ApplicationDbContext();

        #region User

        var passwordHasher = new PasswordHasher<User>();
        var user = new User
        {
            FirstName = userIn.FirstName,
            LastName = userIn.LastName,
            Email = userIn.Email,
            Password = userIn.Password,
        };
        user.HashedPassword = passwordHasher.HashPassword(user, user.Password);
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

    public static void Logout(string token)
    {
        using var db = new ApplicationDbContext();
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadJwtToken(token);
        Console.WriteLine(jwtToken);
        var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var user = db.Users.FirstOrDefault(u => u.Id.ToString() == userId);
        if (user != null)
        {
            Console.WriteLine("exists");
            user.IsAuthenticated = false;
            db.Users.Update(user);
            db.SaveChanges();
        }
    }
}