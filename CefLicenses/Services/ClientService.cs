namespace CefLicenses.Services
{
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Relationships;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ClientService : BaseModelService<Client>
    {
        public ClientService(DbContext context) : base(context) { }

        public override IEnumerable<Client> Index()
        {
            return Context
                .Set<Client>()
                .Include(x => x.ClientFeatures)
                .AsNoTracking();
        }

        public override async Task<Client> Details(Guid id)
        {
            return await Context
                .Set<Client>()
                .Include(x => x.ClientFeatures)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<Client> Create(Client client)
        {
            var clientFeatures = Context.Set<Feature>()
                .Where(x => x.IsCore)
                .Select(x => new ClientFeature
                {
                    Model1Id = client.Id,
                    Model1Name = client.Name,
                    Model2Id = x.Id,
                    Model2Name = x.Name,
                    ExpirationDate = DateTime.Now.AddYears(1)
                });
            client.ClientFeatures = client.ClientFeatures
                .Union(clientFeatures)
                .ToList();

            Context.Set<Client>().Add(client);
            await Context.SaveChangesAsync();
            return client;
        }

        public override async Task Edit(Client client)
        {
            var clientFeatures = await Context.Set<Client>()
                .Where(x => x.Id.Equals(client.Id))
                .Include(x => x.ClientFeatures)
                .SelectMany(x => x.ClientFeatures)
                .ToListAsync();
            Context.RemoveRange(clientFeatures
                .Where(x => !client.ClientFeatures.Any(y => y.Model2Id.Equals(x.Model2Id))));
            Context.AddRange(client.ClientFeatures
                .Where(x => !clientFeatures.Any(y => y.Model2Id.Equals(x.Model2Id)))
                .Select(x => new ClientFeature
                {
                    Model1Id = x.Model1Id,
                    Model1Name = x.Model1Name,
                    Model2Id = x.Model2Id,
                    Model2Name = x.Model2Name,
                    ExpirationDate = DateTime.Now.AddYears(1)
                }));
            Context.Entry(client).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }
    }
}