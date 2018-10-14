namespace CefClientFeatures.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Relationships;
    using Kendo.Mvc.UI;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    public class ClientFeaturesController : BaseRelationshipController<ClientFeature, Client, Feature>
    {
        public ClientFeaturesController(IRelationshipService<ClientFeature, Client, Feature> service, ILogger<ClientFeaturesController> logger) : base(service, logger)
        {
        }

        [HttpGet]
        [Authorize(Policy = "ClientFeatureIndex")]
        public override async Task<IActionResult> Index([DataSourceRequest] DataSourceRequest request = null)
        {
            return await base.Index(request);
        }

        [HttpGet("{id1:guid}/{id2:guid}")]
        [Authorize(Policy = "ClientFeatureDetails")]
        public override async Task<IActionResult> Details([FromRoute] Guid id1, [FromRoute] Guid id2)
        {
            return await base.Details(id1, id2);
        }

        [HttpPut("{id1:guid}/{id2:guid}")]
        [Authorize(Policy = "ClientFeatureEdit")]
        public override async Task<IActionResult> Edit([FromRoute] Guid id1, [FromRoute] Guid id2, [FromBody] ClientFeature clientFeature)
        {
            return await base.Edit(id1, id2, clientFeature);
        }

        [HttpPost]
        [Authorize(Policy = "ClientFeatureCreate")]
        public override async Task<IActionResult> Create([FromBody] ClientFeature clientFeature)
        {
            return await base.Create(clientFeature);
        }

        [HttpDelete("{id1:guid}/{id2:guid}")]
        [Authorize(Policy = "ClientFeatureDelete")]
        public override async Task<IActionResult> Delete([FromRoute] Guid id1, [FromRoute] Guid id2)
        {
            return await base.Delete(id1, id2);
        }
    }
}
