﻿namespace CefLicenses.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Models;

    public interface IModelService<T> where T : BaseModel
    {
        IEnumerable<T> Index();
        Task<T> Details(Guid id);
        Task<T> Create(T model);
        Task Edit(T model);
        Task Delete(Guid id);
    }
}