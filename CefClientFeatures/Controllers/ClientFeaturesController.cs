namespace CefClientFeatures.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Relationships;
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
        public override IActionResult Index()
        {
            return base.Index();
        }

        [HttpGet("{id1:guid}/{id2:guid}")]
        [Authorize(Policy = "ClientFeatureDetails")]
        public override async Task<IActionResult> Details([FromRoute] Guid clientId, [FromRoute] Guid featureId)
        {
            return await base.Details(clientId, featureId);
        }

        [HttpPut("{id1:guid}/{id2:guid}")]
        [Authorize(Policy = "ClientFeatureEdit")]
        public override async Task<IActionResult> Edit([FromRoute] Guid clientId, [FromRoute] Guid featureId, [FromBody] ClientFeature clientFeature)
        {
            return await base.Edit(clientId, featureId, clientFeature);
        }

        [HttpPost]
        [Authorize(Policy = "ClientFeatureCreate")]
        public override async Task<IActionResult> Create([FromBody] ClientFeature clientFeature)
        {
            return await base.Create(clientFeature);
        }

        [HttpDelete("{id1:guid}/{id2:guid}")]
        [Authorize(Policy = "ClientFeatureDelete")]
        public override async Task<IActionResult> Delete([FromRoute] Guid clientId, [FromRoute] Guid featureId)
        {
            return await base.Delete(clientId, featureId);
        }
    }
}
