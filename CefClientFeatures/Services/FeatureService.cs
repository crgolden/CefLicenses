namespace CefClientFeatures.Services
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
        public FeatureService(DbContext context) : base(context) { }

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
                feature.ClientFeatures = feature.ClientFeatures.Union(Context.Set<Client>().Select(x =>
                    new ClientFeature
                    {
                        Model1Id = x.Id,
                        Model2Id = feature.Id
                    })).ToList();
            }

            Context.Set<Feature>().Add(feature);
            await Context.SaveChangesAsync();
            return feature;
        }
    }
}