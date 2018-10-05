namespace CefClientFeatures.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Interfaces;
    using Models;
    using Kendo.Mvc.UI;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    public class FeaturesController : BaseModelController<Feature>
    {
        public FeaturesController(IModelService<Feature> service, ILogger<FeaturesController> logger) : base(service, logger)
        {
        }

        [HttpGet]
        [Authorize(Policy = "FeatureIndex")]
        public override IActionResult Index([DataSourceRequest] DataSourceRequest request = null)
        {
            return base.Index(request);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Policy = "FeatureDetails")]
        public override async Task<IActionResult> Details([FromRoute] Guid id)
        {
            return await base.Details(id);
        }

        [HttpPut("{id:guid}")]
        [Authorize(Policy = "FeatureEdit")]
        public override async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] Feature feature)
        {
            return await base.Edit(id, feature);
        }

        [HttpPost]
        [Authorize(Policy = "FeatureCreate")]
        public override async Task<IActionResult> Create([FromBody] Feature feature)
        {
            return await base.Create(feature);
        }

        [HttpDelete("{id:guid}")]
        [Authorize(Policy = "FeatureDelete")]
        public override async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            return await base.Delete(id);
        }
    }
}
