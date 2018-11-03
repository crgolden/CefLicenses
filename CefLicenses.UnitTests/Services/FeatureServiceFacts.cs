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

    public class FeatureServiceFacts
    {
        [Fact]
        public async void Index()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("FeatureService_Index")
                .Options;
            var list = new List<Feature>
            {
                new Feature(),
                new Feature(),
                new Feature()
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.AddRange(list);
                await context.SaveChangesAsync();
            }

            // Act
            List<Feature> features;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new FeatureService(context);
                features = service.Index().ToList();
            }

            // Assert
            Assert.Equal(list.Count, features.Count);
        }

        [Fact]
        public async Task Details()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("FeatureService_Details")
                .Options;
            var id = Guid.NewGuid();
            const string name = "Name";
            var feature = new Feature {Id = id, Name = name};
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(feature);
                await context.SaveChangesAsync();
            }

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new FeatureService(context);
                feature = await service.Details(id);
            }

            // Assert
            Assert.Equal(name, feature.Name);
        }

        [Fact]
        public async Task Create()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("FeatureService_Create")
                .Options;
            var id = Guid.NewGuid();
            const string name = "Feature 1";
            var feature = new Feature
            {
                Id = id,
                Name = name,
                IsCore = true,
                ClientFeatures = new List<ClientFeature>()
            };
            var clients = new List<Client>
            {
                new Client(),
                new Client(),
                new Client()
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.AddRange(clients);
                await context.SaveChangesAsync();
            }

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new FeatureService(context);
                await service.Create(feature);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                feature = await context.Set<Feature>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }

            Assert.Equal(name, feature.Name);
            Assert.Equal(clients.Count, feature.ClientFeatures.Count);
        }

        [Fact]
        public async Task Edit()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("FeatureService_Edit")
                .Options;
            var id = Guid.NewGuid();
            var feature = new Feature {Id = id, Name = "Feature 1"};
            var clients = new List<Client>
            {
                new Client(),
                new Client(),
                new Client()
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(feature);
                context.AddRange(clients);
                await context.SaveChangesAsync();
            }

            // Act
            const string name = "Feature 1 New Name";
            feature.Name = name;
            feature.IsCore = true;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new FeatureService(context);
                await service.Edit(feature);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                feature = await context.Set<Feature>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }

            Assert.Equal(name, feature.Name);
            Assert.Equal(clients.Count, feature.ClientFeatures.Count);
        }

        [Fact]
        public async Task Edit_AddClients()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("FeatureService_Edit_AddClients")
                .Options;
            var id = Guid.NewGuid();
            var feature = new Feature {Id = id};
            var clientFeatures = new List<ClientFeature>
            {
                new ClientFeature
                {
                    Model1Id = Guid.NewGuid(),
                    Model2Id = id
                },
                new ClientFeature
                {
                    Model1Id = Guid.NewGuid(),
                    Model2Id = id
                },
                new ClientFeature
                {
                    Model1Id = Guid.NewGuid(),
                    Model2Id = id
                }
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(feature);
                await context.SaveChangesAsync();
            }

            // Act
            feature.ClientFeatures = clientFeatures;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new FeatureService(context);
                await service.Edit(feature);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                feature = await context.Set<Feature>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }

            Assert.Equal(clientFeatures.Count, feature.ClientFeatures.Count);
        }

        [Fact]
        public async Task Edit_RemoveClients()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("FeatureService_Edit_RemoveClients")
                .Options;
            var id = Guid.NewGuid();
            var feature = new Feature
            {
                Id = id,
                ClientFeatures = new List<ClientFeature>
                {
                    new ClientFeature {Model1Id = Guid.NewGuid()},
                    new ClientFeature {Model1Id = Guid.NewGuid()},
                    new ClientFeature {Model1Id = Guid.NewGuid()}
                }
            };
            using (var context = new ApplicationDbContext(options))
            {
                context.Add(feature);
                await context.SaveChangesAsync();
            }

            // Act
            feature.ClientFeatures = null;
            using (var context = new ApplicationDbContext(options))
            {
                var service = new FeatureService(context);
                await service.Edit(feature);
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                feature = await context.Set<Feature>()
                    .Include(x => x.ClientFeatures)
                    .SingleOrDefaultAsync(x => x.Id.Equals(id));
            }

            Assert.Empty(feature.ClientFeatures);
        }
    }
}
