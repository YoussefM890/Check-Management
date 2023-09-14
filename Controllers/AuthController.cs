using System.Security.Claims;
using Check_Management.Models;
using Check_Management.Services;
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
            User validatedUser;
            try
            {
                validatedUser = AuthService.ValidateUserCredentials(userIn.Email, userIn.Password);
            }
            catch (Exception e)
            {
                return Ok(Utils.GetResponseObject(401, e.Message));
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, validatedUser.Id.ToString()),
                new Claim(ClaimTypes.Email, validatedUser.Email),
                new Claim("first_name", validatedUser.FirstName),
                new Claim("last_name", validatedUser.LastName),
            };
            foreach (var userRole in validatedUser.UserRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole.Role.Name));
            }

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

        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterIn userIn)
        {
            var user = AuthService.RegisterUser(userIn);
            var response = Utils.GetResponseObject(201, "User created successfully.", user);
            return Ok(response);
        }

        //logout endpoint
        [HttpGet]
        [Route("logout")]
        public IActionResult Logout()
        {
            return ControllerUtils.HandleError(this, () =>
            {
                AuthService.Logout(Request.Headers["Authorization"].ToString().Split(" ")[1]);
                return Ok(Utils.GetResponseObject(200, "User logged out successfully."));
            }, 500);
        }
    }
}