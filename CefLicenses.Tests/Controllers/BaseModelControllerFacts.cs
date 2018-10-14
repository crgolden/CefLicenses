namespace CefLicenses.Tests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CefLicenses.Controllers;
    using Interfaces;
    using Models;
    using Kendo.Mvc.UI;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Moq;
    using Xunit;

    public class BaseModelControllerFacts
    {
        private Mock<IModelService<BaseModel>> _modelService;
        private Mock<ILogger<SubController>> _logger;

        [Fact]
        public async Task Index_Ok()
        {
            Setup();
            var controller = new SubController(_modelService.Object, _logger.Object);
            var index = await controller.Index();
            var result = Assert.IsType<OkObjectResult>(index);
            Assert.IsAssignableFrom<IEnumerable<BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Index_DataSourceRequest_Ok()
        {
            Setup();
            var controller = new SubController(_modelService.Object, _logger.Object);
            var index = await controller.Index(new DataSourceRequest());
            var result = Assert.IsType<OkObjectResult>(index);
            Assert.IsAssignableFrom<DataSourceResult>(result.Value);
        }

        [Fact]
        public async Task Details_Ok()
        {
            Setup();
            _modelService.Setup(x => x.Details(It.IsAny<Guid>())).Returns(Task.FromResult(new Mock<BaseModel>().Object));

            var controller = new SubController(_modelService.Object, _logger.Object);
            var details = await controller.Details(Guid.NewGuid());
            var result = Assert.IsType<OkObjectResult>(details);
            Assert.IsAssignableFrom<BaseModel>(result.Value);
        }

        [Fact]
        public async Task Details_Bad_Request_Id()
        {
            Setup();
            _modelService.Setup(x => x.Details(It.IsAny<Guid>())).Throws(new Exception());

            var controller = new SubController(_modelService.Object, _logger.Object);
            var details = await controller.Details(Guid.NewGuid());
            var result = Assert.IsType<BadRequestObjectResult>(details);
            Assert.IsType<Guid>(result.Value);
        }

        [Fact]
        public async Task Details_Not_Found_Id()
        {
            Setup();
            _modelService.Setup(x => x.Details(It.IsAny<Guid>())).Returns(Task.FromResult(default(BaseModel)));

            var controller = new SubController(_modelService.Object, _logger.Object);
            var details = await controller.Details(Guid.NewGuid());
            var result = Assert.IsType<NotFoundObjectResult>(details);
            Assert.IsType<Guid>(result.Value);
        }

        [Fact]
        public async Task Edit_No_Content()
        {
            Setup();
            var model = new Mock<BaseModel>();
            model.Setup(x => x.Id).Returns(Guid.NewGuid());
            _modelService.Setup(x => x.Edit(model.Object)).Returns(Task.FromResult(model.Object));

            var controller = new SubController(_modelService.Object, _logger.Object);
            var edit = await controller.Edit(model.Object.Id, model.Object);
            Assert.IsType<NoContentResult>(edit);
        }

        [Fact]
        public async Task Edit_Bad_Request_Id()
        {
            Setup();
            var model = new Mock<BaseModel>();
            model.Setup(x => x.Id).Returns(Guid.NewGuid());

            var controller = new SubController(_modelService.Object, _logger.Object);
            var edit = await controller.Edit(Guid.NewGuid(), model.Object);
            var result = Assert.IsType<BadRequestObjectResult>(edit);
            Assert.IsType<Guid>(result.Value);
        }

        [Fact]
        public async Task Edit_Bad_Request_Model()
        {
            Setup();
            var model = new Mock<BaseModel>();
            model.Setup(x => x.Id).Returns(Guid.NewGuid());
            _modelService.Setup(x => x.Edit(model.Object)).Throws(new Exception());

            var controller = new SubController(_modelService.Object, _logger.Object);
            var edit = await controller.Edit(model.Object.Id, model.Object);
            var result = Assert.IsType<BadRequestObjectResult>(edit);
            Assert.IsAssignableFrom<BaseModel>(result.Value);
        }

        [Fact]
        public async Task Create_Ok()
        {
            Setup();
            var model = new Mock<BaseModel>();
            _modelService.Setup(x => x.Create(model.Object)).Returns(Task.FromResult(model.Object));

            var controller = new SubController(_modelService.Object, _logger.Object);
            var create = await controller.Create(model.Object);
            var result = Assert.IsType<OkObjectResult>(create);
            Assert.IsAssignableFrom<BaseModel>(result.Value);
        }

        [Fact]
        public async Task Create_Bad_Request_Model()
        {
            Setup();
            var model = new Mock<BaseModel>();
            _modelService.Setup(x => x.Create(model.Object)).Throws(new Exception());

            var controller = new SubController(_modelService.Object, _logger.Object);
            var create = await controller.Create(model.Object);
            var result = Assert.IsType<BadRequestObjectResult>(create);
            Assert.IsAssignableFrom<BaseModel>(result.Value);
        }

        [Fact]
        public async Task Delete_No_Content()
        {
            Setup();
            var controller = new SubController(_modelService.Object, _logger.Object);
            var delete = await controller.Delete(new Guid());
            Assert.IsType<NoContentResult>(delete);
        }

        [Fact]
        public async Task Delete_Bad_Request_Id()
        {
            Setup();
            _modelService.Setup(x => x.Delete(It.IsAny<Guid>())).Throws(new Exception());

            var controller = new SubController(_modelService.Object, _logger.Object);
            var delete = await controller.Delete(new Guid());
            var result = Assert.IsType<BadRequestObjectResult>(delete);
            Assert.IsType<Guid>(result.Value);
        }

        public class SubController : BaseModelController<BaseModel>
        {
            public SubController(IModelService<BaseModel> service, ILogger<SubController> logger) : base(service, logger) { }
        }

        private void Setup()
        {
            _modelService = new Mock<IModelService<BaseModel>>();
            _logger = new Mock<ILogger<SubController>>();
        }
    }
}
