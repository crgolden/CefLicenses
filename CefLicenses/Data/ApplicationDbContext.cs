namespace CefLicenses.Data
{
    using Models;
    using Relationships;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Client>()
                .HasMany(p => p.ClientFeatures);
            builder.Entity<Client>()
                .HasIndex(p => p.Name)
                .IsUnique();
            builder.Entity<Feature>()
                .HasMany(p => p.ClientFeatures);
            builder.Entity<Feature>()
                .HasIndex(p => p.Name)
                .IsUnique();
            builder.Entity<ClientFeature>()
                .HasKey(p => new { p.Model1Id, p.Model2Id });
            builder.Entity<ClientFeature>()
                .HasOne(p => p.Model1)
                .WithMany(p => p.ClientFeatures)
                .HasForeignKey(p => p.Model1Id);
            builder.Entity<ClientFeature>()
                .HasOne(p => p.Model2)
                .WithMany(p => p.ClientFeatures)
                .HasForeignKey(p => p.Model2Id);
        }
    }
}
