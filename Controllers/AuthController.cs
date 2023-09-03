using System.Security.Claims;
using AdminPanelv1.Services;
using Check_Management.Models;
using Microsoft.AspNetCore.Mvc;

namespace Check_Management.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginIn userIn)
        {
            User? validatedUser = AuthService.ValidateUserCredentials(userIn.Email, userIn.Password);
            if (validatedUser != null)
            {
                // User credentials are valid
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, validatedUser.Id.ToString()),
                    new Claim(ClaimTypes.Email, validatedUser.Email),
                    new Claim("first_name", validatedUser.FirstName), // Custom claim type for first name
                    new Claim("last_name", validatedUser.LastName), // Custom claim type for last name
                    // new Claim(ClaimTypes.Role, validatedUser.Role)
                };
                var user = CustomMapper.Map<User, LoginOut>(validatedUser);
                var token = AuthService.GenerateBearerToken(expiryInMinutes: 1440, claims);
                var responseData = new
                {
                    token,
                    user
                };
                var response = Utils.GetResponseObject(200, "Login successful.", responseData);
                return Ok(response);
            }
            else
            {
                // User credentials are invalid
                var response = Utils.GetResponseObject(401, "Invalid email or password");
                return Ok(response);
            }
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterIn userIn)
        {
            var user = AuthService.RegisterUser(userIn);
            var response = Utils.GetResponseObject(201, "User created successfully.", user);
            return Ok(response);
        }
    }
}