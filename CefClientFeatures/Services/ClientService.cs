using CefClientFeatures.Relationships;

namespace CefClientFeatures.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Models;
    using Microsoft.EntityFrameworkCore;

    public class ClientService : BaseModelService<Client>
    {
        public ClientService(DbContext context) : base(context) { }

        public override IEnumerable<Client> Index()
        {
            return Context
                .Set<Client>()
                .Include(x => x.ClientFeatures)
                .ThenInclude(x => x.Model2)
                .AsNoTracking();
        }

        public override async Task<Client> Details(Guid id)
        {
            return await Context
                .Set<Client>()
                .Include(x => x.ClientFeatures)
                .ThenInclude(x => x.Model2)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<Client> Create(Client client)
        {
            client.ClientFeatures = client.ClientFeatures.Union(Context.Set<Feature>().Where(x => x.IsCore).Select(x =>
                new ClientFeature
                {
                    Model2Id = x.Id,
                    Model1Id = client.Id
                })).ToList();

            Context.Set<Client>().Add(client);
            await Context.SaveChangesAsync();
            return client;
        }
    }
}