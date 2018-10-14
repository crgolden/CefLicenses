namespace CefClientFeatures.Services
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
            Context.Set<ClientFeature>().Add(clientFeature);
            await Context.SaveChangesAsync();
            return clientFeature;
        }
    }
}