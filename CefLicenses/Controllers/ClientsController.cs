namespace CefLicenses.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Kendo.Mvc.UI;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    public class ClientsController : BaseModelController<Client>
    {
        public ClientsController(IModelService<Client> service, ILogger<ClientsController> logger)
            : base(service, logger)
        {
        }

        [HttpGet]
        // [Authorize(Policy = "ClientIndex")]
        public override async Task<IActionResult> Index([DataSourceRequest] DataSourceRequest request = null)
        {
            return await base.Index(request);

        }

        [HttpGet("{id:guid}")]
        // [Authorize(Policy = "ClientDetails")]
        public override async Task<IActionResult> Details([FromRoute] Guid id)
        {
            return await base.Details(id);
        }

        [HttpPut("{id:guid}")]
        [Authorize(Policy = "ClientEdit")]
        public override async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] Client client)
        {
            return await base.Edit(id, client);
        }

        [HttpPost]
        [Authorize(Policy = "ClientCreate")]
        public override async Task<IActionResult> Create([FromBody] Client client)
        {
            return await base.Create(client);
        }

        [HttpDelete("{id:guid}")]
        [Authorize(Policy = "ClientDelete")]
        public override async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            return await base.Delete(id);
        }
    }
}
