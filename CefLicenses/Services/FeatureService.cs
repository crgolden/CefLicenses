namespace CefLicenses.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Models;
    using Relationships;
    using Microsoft.EntityFrameworkCore;

    public class FeatureService : BaseModelService<Feature>
    {
        public FeatureService(DbContext context) : base(context)
        {
        }

        public override IEnumerable<Feature> Index()
        {
            return Context
                .Set<Feature>()
                .Include(x => x.ClientFeatures)
                .AsNoTracking();
        }

        public override async Task<Feature> Details(Guid id)
        {
            return await Context
                .Set<Feature>()
                .Include(x => x.ClientFeatures)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<Feature> Create(Feature feature)
        {
            if (feature.IsCore)
            {
                var clientFeatures = Context.Set<Client>()
                    .Select(x => new ClientFeature
                    {
                        Model1Id = x.Id,
                        Model1Name = x.Name,
                        Model2Id = feature.Id,
                        Model2Name = feature.Name,
                        ExpirationDate = DateTime.Now.AddYears(1)
                    });
                feature.ClientFeatures = feature.ClientFeatures
                    .Union(clientFeatures)
                    .ToList();
            }

            Context.Set<Feature>().Add(feature);
            await Context.SaveChangesAsync();
            return feature;
        }

        public override async Task Edit(Feature feature)
        {
            if (feature.IsCore)
            {
                foreach (var client in Context.Set<Client>())
                {
                    if (!await Context.Set<ClientFeature>().AnyAsync(x =>
                        x.Model1Id.Equals(client.Id) &&
                        x.Model2Id.Equals(feature.Id)))
                    {
                        Context.Set<ClientFeature>().Add(new ClientFeature
                        {
                            Model1Id = client.Id,
                            Model1Name = client.Name,
                            Model2Id = feature.Id,
                            Model2Name = feature.Name,
                            ExpirationDate = DateTime.Now.AddYears(1)
                        });
                    }
                }
            }
            else
            {
                var clientFeatures = Context.Set<ClientFeature>()
                    .Where(x => x.Model2Id.Equals(feature.Id));
                if (feature.ClientFeatures != null)
                {
                    Context.AddRange(feature.ClientFeatures
                        .Where(x => !clientFeatures.Any(y => y.Model1Id.Equals(x.Model1Id)))
                        .Select(x => new ClientFeature
                        {
                            Model1Id = x.Model1Id,
                            Model1Name = x.Model1Name,
                            Model2Id = x.Model2Id,
                            Model2Name = x.Model2Name,
                            ExpirationDate = DateTime.Now.AddYears(1)
                        }));
                    Context.RemoveRange(clientFeatures
                        .Where(x => !feature.ClientFeatures.Any(y => y.Model1Id.Equals(x.Model1Id))));
                    feature.ClientFeatures.Clear();
                }
                else
                {
                    Context.RemoveRange(clientFeatures);
                }
            }

            Context.Entry(feature).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }
    }
}
