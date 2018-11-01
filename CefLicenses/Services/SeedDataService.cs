namespace CefLicenses.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Controllers;
    using Interfaces;
    using Models;
    using Options;
    using Relationships;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    public class SeedDataService : ISeedDataService
    {
        private readonly DbContext _context;
        private readonly UsersOptions _usersOptions;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public SeedDataService(DbContext context, IOptions<UsersOptions> usersOptions,
            UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _usersOptions = usersOptions.Value;
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
                new Client { Name = "Wilco", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Valisure", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Merck", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Notifyd", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "Atlas", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "IIA", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "United Aqua Group", ClientFeatures = new List<ClientFeature>() },
                new Client { Name = "AK Rail", ClientFeatures = new List<ClientFeature>() }
            };

        private static IEnumerable<Feature> Features =>
            new List<Feature>
            {
                new Feature { Name = "Checkout", IsCore = true },
                new Feature { Name = "Wallet" },
                new Feature { Name = "Catalog", IsCore = true },
                new Feature { Name = "Avalara" },
                new Feature { Name = "PayPal", IsCore = true },
                new Feature { Name = "USPS Shipping" },
                new Feature { Name = "Flat Rate Shipping", IsCore = true },
                new Feature { Name = "Subscriptions" }
            };

        public async Task SeedData()
        {
            if (!await _roleManager.Roles.AnyAsync()) await CreateRolesAsync();
            if (!await _userManager.Users.AnyAsync()) await CreateUsersAsync();
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

        private async Task CreateUsersAsync()
        {
            using (_userManager)
            {
                foreach (var user in _usersOptions.Users)
                {
                    var identityUser = new IdentityUser
                    {
                        UserName = user.Email,
                        Email = user.Email,
                        SecurityStamp = $"{Guid.NewGuid()}"
                    };
                    await _userManager.CreateAsync(identityUser, user.Password);
                    await _userManager.AddToRolesAsync(identityUser, Roles.Select(role => role.Name));
                    await _userManager.AddClaimsAsync(identityUser, Claims);
                }
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
                    client.ClientFeatures.Add(new ClientFeature
                    {
                        Model1Name = client.Name,
                        Model2Id = feature.Id,
                        Model2Name = feature.Name,
                        ExpirationDate = DateTime.Now.AddYears(1)
                    });
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}