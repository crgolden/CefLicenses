namespace CefClientFeatures.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Microsoft.EntityFrameworkCore;

    public abstract class BaseModelService<T> : IModelService<T> where T : BaseModel
    {
        protected readonly DbContext Context;

        protected BaseModelService(DbContext context)
        {
            Context = context;
        }

        public virtual IEnumerable<T> Index()
        {
            return Context.Set<T>().AsNoTracking();
        }

        public virtual async Task<T> Details(Guid id)
        {
            return await Context.Set<T>().FindAsync(id);
        }

        public virtual async Task<T> Create(T model)
        {
            Context.Set<T>().Add(model);
            await Context.SaveChangesAsync();
            return model;
        }

        public virtual async Task Edit(T model)
        {
            Context.Entry(model).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }

        public virtual async Task Delete(Guid id)
        {
            var entity = await Context.Set<T>().FindAsync(id);
            if (entity != null)
            {
                Context.Set<T>().Remove(entity);
                await Context.SaveChangesAsync();
            }
        }
    }
}