// using System.Text;
// using Check_Management;
// using Check_Management.Models;
// using Microsoft.AspNetCore.Authentication;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
//
// var builder = WebApplication.CreateBuilder(args);
// ConfigurationManager configuration = builder.Configuration;
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// builder.Services.AddDatabaseDeveloperPageExceptionFilter();
//
// #region Identity
//
// builder.Services.AddIdentity<User, Role>(options =>
//     {
//         // Password settings.
//         options.Password.RequireDigit = false;
//         options.Password.RequireLowercase = false;
//         options.Password.RequireNonAlphanumeric = false;
//         options.Password.RequireUppercase = false;
//         options.Password.RequiredLength = 1;
//         options.Password.RequiredUniqueChars = 1;
//
//         // Lockout settings.
//         options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
//         options.Lockout.MaxFailedAccessAttempts = 5;
//         options.Lockout.AllowedForNewUsers = true;
//
//         // User settings.
//         options.User.AllowedUserNameCharacters =
//             "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
//         options.User.RequireUniqueEmail = false;
//     }
//         )
//     .AddEntityFrameworkStores<ApplicationDbContext>();
//
// // builder.Services.AddIdentityServer()
//     // .AddApiAuthorization<User, ApplicationDbContext>();
//
// #endregion
// #region Add Cors
//
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("_myAllowSpecificOrigins",
//         builder => builder.WithOrigins("http://localhost:4200")
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             
//         );
// });
// #endregion
//
//
// builder.Services.AddAuthentication();
//
// #region Add Jwt
//
// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(options =>
// {
//     options.SaveToken = true;
//     options.RequireHttpsMetadata = false;
//     options.TokenValidationParameters = new TokenValidationParameters()
//     {
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ValidAudience = configuration["JwtSettings:Audience"],
//         ValidIssuer = configuration["JwtSettings:Issuer"],
//         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]))
//         // ValidAudience = "localhost",
//         // ValidIssuer ="localhost",
//         // IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_best_secret_key_ever_1234567890_laksdflkasjdlkjalkgjalksdjglkajsdlkgjalmkdgj"))
//     };
// });
// // builder.Services.AddAuthentication("Bearer")
// //     .AddIdentityServerJwt()
// //     .AddJwtBearer(options =>
// //     {
// //         options.TokenValidationParameters = new TokenValidationParameters
// //         {
// //             ValidateIssuer = true,
// //             ValidateAudience = true,
// //             ValidateIssuerSigningKey = true,
// //             ValidIssuer = "localhost",
// //             ValidAudience = "localhost",
// //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysecretkey12345!@#$%^&"))
// //         };
// //     });
//
// // builder.Services.AddAuthentication().AddIdentityServerJwt();
// #endregion
// // builder.Services.AddAuthorization();
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddControllersWithViews();
//
// var app = builder.Build();
// if (!app.Environment.IsDevelopment())
// {
//     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//     app.UseHsts();
// }
//
// app.UseCors("_myAllowSpecificOrigins");
// app.UseHttpsRedirection();
// app.UseDefaultFiles();
// app.UseStaticFiles();
// app.UseRouting();
// app.UseAuthentication();
// app.UseAuthorization();
// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller}/{action=Index}/{id?}");
// // app.UseMiddleware<DelayMiddleware>(2000);
// app.Run();

