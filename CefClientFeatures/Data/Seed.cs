namespace CefClientFeatures.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Controllers;
    using Models;
    using Relationships;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    public class Seed
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public Seed(ApplicationDbContext context, UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        private static IEnumerable<Claim> Claims =>
            new List<Claim>
            {
                new Claim(nameof(ClientsController.Index), nameof(Client)),
                new Claim(nameof(FeaturesController.Index), nameof(Feature)),
                new Claim(nameof(ClientFeaturesController.Index), nameof(ClientFeature)),
                new Claim(nameof(ClientsController.Edit), nameof(Client)),
                new Claim(nameof(FeaturesController.Edit), nameof(Feature)),
                new Claim(nameof(ClientFeaturesController.Edit), nameof(ClientFeature)),
                new Claim(nameof(ClientsController.Details), nameof(Client)),
                new Claim(nameof(FeaturesController.Details), nameof(Feature)),
                new Claim(nameof(ClientFeaturesController.Details), nameof(ClientFeature)),
                new Claim(nameof(ClientsController.Create), nameof(Client)),
                new Claim(nameof(FeaturesController.Create), nameof(Feature)),
                new Claim(nameof(ClientFeaturesController.Create), nameof(ClientFeature)),
                new Claim(nameof(ClientsController.Delete), nameof(Client)),
                new Claim(nameof(FeaturesController.Delete), nameof(Feature)),
                new Claim(nameof(ClientFeaturesController.Delete), nameof(ClientFeature))
            };

        private static IEnumerable<IdentityRole> Roles => new List<IdentityRole>
        {
            new IdentityRole("User"),
            new IdentityRole("Admin")
        };

        private static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client { Name = "Client 1", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 2", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 3", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 4", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 5", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 6", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 7", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Client 8", ClientFeatures = new List<ClientFeature>() }
            };

        private static IEnumerable<Feature> Features =>
            new List<Feature>
            {
                new Feature { Name = "Feature 1", IsCore = true },
                new Feature { Name = "Feature 2" },
                new Feature { Name = "Feature 3", IsCore = true },
                new Feature { Name = "Feature 4" },
                new Feature { Name = "Feature 5", IsCore = true },
                new Feature { Name = "Feature 6" },
                new Feature { Name = "Feature 7", IsCore = true },
                new Feature { Name = "Feature 8" }

            };

        public async Task SeedData(string adminEmail, string adminPassword)
        {
            if (!await _roleManager.Roles.AnyAsync()) await CreateRolesAsync();
            if (!await _userManager.Users.AnyAsync()) await CreateUsersAsync(adminEmail, adminPassword);
            if (!await _context.Set<Client>().AnyAsync()) await CreateClientsAsync();
            if (!await _context.Set<Feature>().AnyAsync()) await CreateFeaturesAsync();
            if (!await _context.Set<ClientFeature>().AnyAsync()) await CreateClientFeaturesAsync();
        }

        private async Task CreateRolesAsync()
        {
            using (_roleManager)
            {
                foreach (var role in Roles)
                {
                    await _roleManager.CreateAsync(role);
                }
            }
        }

        private async Task CreateUsersAsync(string adminEmail, string adminPassword)
        {
            var admin = new IdentityUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                SecurityStamp = $"{Guid.NewGuid()}"
            };
            using (_userManager)
            {
                await _userManager.CreateAsync(admin, adminPassword);
                await _userManager.AddToRolesAsync(admin, Roles.Select(role => role.Name));
                await _userManager.AddClaimsAsync(admin, Claims);
            }
        }

        private async Task CreateClientsAsync()
        {
            _context.Set<Client>().AddRange(Clients);
            await _context.SaveChangesAsync();
        }

        private async Task CreateFeaturesAsync()
        {
            _context.Set<Feature>().AddRange(Features);
            await _context.SaveChangesAsync();
        }

        private async Task CreateClientFeaturesAsync()
        {
            foreach (var client in _context.Set<Client>())
            {
                foreach (var feature in _context.Set<Feature>().Where(x => x.IsCore))
                {
                    client.ClientFeatures.Add(new ClientFeature { Model2 = feature });
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}