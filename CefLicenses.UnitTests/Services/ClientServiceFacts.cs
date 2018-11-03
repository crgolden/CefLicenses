namespace CefLicenses.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Models;
    using Relationships;
    using CefLicenses.Services;
    using Microsoft.EntityFrameworkCore;
    using Xunit;

    public class ClientServiceFacts
    {
        [Fact]
        public async void Index()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientService_Index")
                .Options;
            var list = new List<Client>
            {
                new Client(),
                new Client(),
                new Client()
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.AddRange(list);
                await context.SaveChangesAsync();
            }

            // Act
            List<Client> clients;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientService(context);
                clients = service.Index().ToList();
            }

            // Assert
            Assert.Equal(list.Count, clients.Count);
        }

        [Fact]
        public async Task Details()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientService_Details")
                .Options;
            var id = Guid.NewGuid();
            const string name = "Name";
            var client = new Client {Id = id, Name = name};
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(client);
                await context.SaveChangesAsync();
            }

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientService(context);
                client = await service.Details(id);
            }

            // Assert
            Assert.Equal(name, client.Name);
        }

        [Fact]
        public async Task Create()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientService_Create")
                .Options;
            var id = Guid.NewGuid();
            const string name = "Client 1";
            var clientFeatures = new List<ClientFeature>
            {
                new ClientFeature {Model2Id = new Guid()}
            };
            var client = new Client
            {
                Id = id,
                Name = name,
                ClientFeatures = clientFeatures
            };
            var coreFeatures = new List<Feature>
            {
                new Feature {IsCore = true},
                new Feature {IsCore = true},
                new Feature {IsCore = true}
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.AddRange(coreFeatures);
                await context.SaveChangesAsync();
            }

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientService(context);
                await service.Create(client);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                client = await context.Set<Client>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }
            Assert.Equal(name, client.Name);
            Assert.Equal(clientFeatures.Count + coreFeatures.Count, client.ClientFeatures.Count);
        }

        [Fact]
        public async Task Edit()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientService_Edit")
                .Options;
            var id = Guid.NewGuid();
            var client = new Client {Id = id, Name = "Client 1"};
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(client);
                await context.SaveChangesAsync();
            }

            // Act
            const string name = "Client 1 New Name";
            client.Name = name;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientService(context);
                await service.Edit(client);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                client = await context.Set<Client>().FindAsync(id);
            }

            Assert.Equal(name, client.Name);
        }

        [Fact]
        public async Task Edit_AddFeatures()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientService_Edit_AddFeatures")
                .Options;
            var id = Guid.NewGuid();
            var client = new Client {Id = id};
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(client);
                await context.SaveChangesAsync();
            }

            // Act
            var clientFeatures = new List<ClientFeature>
            {
                new ClientFeature
                {
                    Model1Id = id,
                    Model2Id = Guid.NewGuid()
                }
            };
            client.ClientFeatures = clientFeatures;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientService(context);
                await service.Edit(client);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                client = await context.Set<Client>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }

            Assert.Equal(clientFeatures.Count, client.ClientFeatures.Count);
        }

        [Fact]
        public async Task Edit_RemoveFeatures()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientService_Edit_RemoveFeatures")
                .Options;
            var id = Guid.NewGuid();
            var clientFeatures = new List<ClientFeature>
            {
                new ClientFeature
                {
                    Model1Id = id,
                    Model2 = new Feature {IsCore = true}
                }
            };
            var client = new Client
            {
                Id = id,
                ClientFeatures = new List<ClientFeature>
                {
                    new ClientFeature {Model2 = new Feature()}
                }
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(client);
                context.AddRange(clientFeatures);
                await context.SaveChangesAsync();
            }

            // Act
            client.ClientFeatures = null;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientService(context);
                await service.Edit(client);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                client = await context.Set<Client>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }

            Assert.Equal(clientFeatures.Count, client.ClientFeatures.Count);
        }
    }
}