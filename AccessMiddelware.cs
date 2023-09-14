using System.Security.Claims;
using Check_Management.Models;

namespace Check_Management;

public class AccessMiddleware
{
    private readonly RequestDelegate _next;

    public AccessMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User.Identity != null && context.User.Identity.IsAuthenticated && !IsUserActive(context.User))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("User is inactive.");
            return;
        }

        // Continue processing the request.
        await _next(context);
    }

    private bool IsUserActive(ClaimsPrincipal user)
    {
        using var db = new ApplicationDbContext();
        // Implement your logic to check if the user is active.
        // You can retrieve user claims and use them for the check.
        // Example: Retrieve a custom claim indicating user activity status.
        var isActiveClaim = user.FindFirst(ClaimTypes.Email);
        if (isActiveClaim == null) return false;
        User u = db.Users.FirstOrDefault(u => u.Email == isActiveClaim.Value);
        return u != null && u.IsAuthenticated && u.HaveAccess;
    }
}