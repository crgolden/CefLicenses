﻿namespace CefLicenses.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [Produces("application/json")]
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public abstract class BaseModelController<T> : ControllerBase
        where T : BaseModel
    {
        protected readonly IModelService<T> Service;
        private readonly ILogger<BaseModelController<T>> _logger;

        protected BaseModelController(IModelService<T> service, ILogger<BaseModelController<T>> logger)
        {
            Service = service;
            _logger = logger;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Index([DataSourceRequest] DataSourceRequest request = null)
        {
            var models = Service.Index();
            return request != null ? Ok(await models.ToDataSourceResultAsync(request)) : Ok(models);
        }

        [HttpGet("{id:guid}")]
        public virtual async Task<IActionResult> Details([FromRoute] Guid id)
        {
            try
            {
                var model = await Service.Details(id);
                if (model == null)
                {
                    return NotFound(id);
                }

                return Ok(model);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return BadRequest(id);
            }
        }

        [HttpPut("{id:guid}")]
        public virtual async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] T model)
        {
            if (!id.Equals(model?.Id))
            {
                return BadRequest(id);
            }

            try
            {
                await Service.Edit(model);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return BadRequest(model);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] T model)
        {
            try
            {
                var created = await Service.Create(model);
                return Ok(created);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return BadRequest(model);
            }
        }

        [HttpDelete("{id:guid}")]
        public virtual async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                await Service.Delete(id);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return BadRequest(id);
            }
        }
    }
}
