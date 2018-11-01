namespace CefLicenses.Services
{
    using System;
    using System.Threading.Tasks;
    using Models;
    using Relationships;
    using Microsoft.EntityFrameworkCore;

    public class ClientFeatureService : BaseRelationshipService<ClientFeature, Client, Feature>
    {
        public ClientFeatureService(DbContext context) : base(context) { }

        public override async Task<ClientFeature> Create(ClientFeature clientFeature)
        {
            if (!clientFeature.ExpirationDate.HasValue)
            {
                clientFeature.ExpirationDate = DateTime.Now.AddYears(1);
            }
            Context.Add(clientFeature);
            await Context.SaveChangesAsync();
            return clientFeature;
        }

        public override async Task Edit(ClientFeature clientFeature)
        {
            var entity = await Context.Set<ClientFeature>().SingleOrDefaultAsync(x =>
                x.Model1Id.Equals(clientFeature.Model1Id) &&
                x.Model2Id.Equals(clientFeature.Model2Id));
            if (entity != null)
            {
                entity.ExpirationDate = clientFeature.ExpirationDate;
                await Context.SaveChangesAsync();
            }
        }
    }
}