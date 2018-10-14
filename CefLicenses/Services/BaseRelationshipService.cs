namespace CefLicenses.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Relationships;
    using Microsoft.EntityFrameworkCore;

    public abstract class BaseRelationshipService<T, T1, T2> : IRelationshipService<T, T1, T2>
        where T : BaseRelationship<T1, T2>
        where T1 : BaseModel
        where T2 : BaseModel
    {
        protected readonly DbContext Context;

        protected BaseRelationshipService(DbContext context)
        {
            Context = context;
        }

        public virtual IEnumerable<T> Index()
        {
            return Context.Set<T>()
                .Include(x => x.Model1)
                .Include(x => x.Model2)
                .AsNoTracking();
        }

        public virtual async Task<T> Details(Guid id1, Guid id2)
        {
            return await Context.Set<T>().FindAsync(id1, id2);
        }

        public virtual async Task<T> Create(T relationship)
        {
            Context.Set<T>().Add(relationship);
            await Context.SaveChangesAsync();
            return relationship;
        }

        public virtual async Task Edit(T relationship)
        {
            Context.Entry(relationship).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }

        public virtual async Task Delete(Guid id1, Guid id2)
        {
            var entity = await Context.Set<T>().FindAsync(id1, id2);
            if (entity != null)
            {
                Context.Set<T>().Remove(entity);
                await Context.SaveChangesAsync();
            }
        }
    }
}