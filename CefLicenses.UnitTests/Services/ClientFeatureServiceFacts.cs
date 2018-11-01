namespace CefLicenses.UnitTests.Services
{
    using System;
    using System.Threading.Tasks;
    using Data;
    using Relationships;
    using CefLicenses.Services;
    using Microsoft.EntityFrameworkCore;
    using Xunit;

    public class ClientFeatureServiceFacts
    {
        [Fact]
        public async Task Create()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientFeatureService_Create")
                .Options;
            var model1Id = Guid.NewGuid();
            var model2Id = Guid.NewGuid();
            var expirationDate = DateTime.Now;

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientFeatureService(context);
                await service.Create(new ClientFeature
                {
                    Model1Id = model1Id,
                    Model2Id = model2Id,
                    ExpirationDate = expirationDate
                });
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                var clientFeature = await context.Set<ClientFeature>().FindAsync(model1Id, model2Id);
                Assert.Equal(expirationDate, clientFeature.ExpirationDate);
            }
        }

        [Fact]
        public async Task Create_NullExpirationDate()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientFeatureService_CreateNullExpirationDate")
                .Options;
            var model1Id = Guid.NewGuid();
            var model2Id = Guid.NewGuid();

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientFeatureService(context);
                await service.Create(new ClientFeature
                {
                    Model1Id = model1Id,
                    Model2Id = model2Id
                });
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                var clientFeature = await context.Set<ClientFeature>().FindAsync(model1Id, model2Id);
                Assert.NotNull(clientFeature.ExpirationDate);
            }
        }

        [Fact]
        public async Task Edit()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("ClientFeatureService_Edit")
                .Options;
            var model1Id = Guid.NewGuid();
            var model2Id = Guid.NewGuid();
            var now = DateTime.Now;
            var tomorrow = now.AddDays(1);
            using (var context = new ApplicationDbContext(options))
            {
                context.Set<ClientFeature>().Add(new ClientFeature
                {
                    Model1Id = model1Id,
                    Model2Id = model2Id,
                    ExpirationDate = now
                });
                await context.SaveChangesAsync();
            }

            // Act
            using (var context = new ApplicationDbContext(options))
            {
                var service = new ClientFeatureService(context);
                await service.Edit(new ClientFeature
                {
                    Model1Id = model1Id,
                    Model2Id = model2Id,
                    ExpirationDate = tomorrow
                });
            }

            // Assert
            using (var context = new ApplicationDbContext(options))
            {
                var clientFeature = await context.Set<ClientFeature>().FindAsync(model1Id, model2Id);
                Assert.Equal(tomorrow, clientFeature.ExpirationDate);
            }
        }
    }
}