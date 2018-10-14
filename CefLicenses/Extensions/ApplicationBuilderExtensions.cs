namespace CefLicenses.Extensions
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Data;

    public static class ApplicationBuilderExtensions
    {
        public static void SetupDatabase(this IApplicationBuilder app, IConfiguration configuration,
            ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.Migrate();
            var seed = new Seed(context, userManager, roleManager);
            var adminEmail = configuration.GetSection("AdminEmail").Value;
            var adminPassword = configuration.GetSection("AdminPassword").Value;
            Task.Run(() => seed.SeedData(adminEmail, adminPassword)).Wait();
        }
    }
}
