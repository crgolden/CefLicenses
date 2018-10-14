namespace CefClientFeatures.Tests.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CefClientFeatures.Controllers;
    using Interfaces;
    using Models;
    using Kendo.Mvc.UI;
    using Relationships;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Moq;
    using Xunit;

    public class BaseRelationshipControllerFacts
    {
        private Mock<IRelationshipService<BaseRelationship<BaseModel, BaseModel>, BaseModel, BaseModel>> _relationshipService;
        private Mock<ILogger<SubController>> _logger;

        [Fact]
        public async Task Index_Ok()
        {
            Setup();
            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var index = await controller.Index();
            var result = Assert.IsType<OkObjectResult>(index);
            Assert.IsAssignableFrom<IEnumerable<BaseRelationship<BaseModel, BaseModel>>>(result.Value);
        }

        [Fact]
        public async Task Index_DataSourceRequest_Ok()
        {
            Setup();
            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var index = await controller.Index(new DataSourceRequest());
            var result = Assert.IsType<OkObjectResult>(index);
            Assert.IsAssignableFrom<DataSourceResult>(result.Value);
        }

        [Fact]
        public async Task Details_Ok()
        {
            Setup();
            _relationshipService.Setup(x => x.Details(It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(Task.FromResult(new Mock<BaseRelationship<BaseModel, BaseModel>>().Object));

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var details = await controller.Details(Guid.NewGuid(), Guid.NewGuid());
            var result = Assert.IsType<OkObjectResult>(details);
            Assert.IsAssignableFrom<BaseRelationship<BaseModel, BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Details_Bad_Request_Id()
        {
            Setup();
            var id1 = Guid.NewGuid();
            var id2 = Guid.NewGuid();
            _relationshipService.Setup(x => x.Details(It.IsAny<Guid>(), It.IsAny<Guid>())).Throws(new Exception());

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var details = await controller.Details(id1, id2);
            var result = Assert.IsType<BadRequestObjectResult>(details);
            Assert.Equal($"{{ id1 = {id1}, id2 = {id2} }}", $"{result.Value}");
        }

        [Fact]
        public async Task Details_Not_Found_Id()
        {
            Setup();
            var id1 = Guid.NewGuid();
            var id2 = Guid.NewGuid();
            _relationshipService.Setup(x => x.Details(It.IsAny<Guid>(), It.IsAny<Guid>())).Returns(Task.FromResult(default(BaseRelationship<BaseModel, BaseModel>)));

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var details = await controller.Details(id1, id2);
            var result = Assert.IsType<NotFoundObjectResult>(details);
            Assert.Equal($"{{ id1 = {id1}, id2 = {id2} }}", $"{result.Value}");
        }

        [Fact]
        public async Task Edit_No_Content()
        {
            Setup();
            var relationship = new Mock<BaseRelationship<BaseModel, BaseModel>>();
            relationship.Setup(x => x.Model1Id).Returns(Guid.NewGuid());
            relationship.Setup(x => x.Model2Id).Returns(Guid.NewGuid());
            _relationshipService.Setup(x => x.Edit(relationship.Object)).Returns(Task.FromResult(relationship.Object));

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var edit = await controller.Edit(relationship.Object.Model1Id, relationship.Object.Model2Id, relationship.Object);
            Assert.IsType<NoContentResult>(edit);
        }

        [Fact]
        public async Task Edit_Bad_Request_Id1()
        {
            Setup();
            var relationship = new Mock<BaseRelationship<BaseModel, BaseModel>>();
            relationship.Setup(x => x.Model1Id).Returns(Guid.NewGuid());
            relationship.Setup(x => x.Model2Id).Returns(Guid.NewGuid());

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var edit = await controller.Edit(Guid.NewGuid(), relationship.Object.Model2Id, relationship.Object);
            var result = Assert.IsType<BadRequestObjectResult>(edit);
            Assert.IsAssignableFrom<BaseRelationship<BaseModel, BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Edit_Bad_Request_Id2()
        {
            Setup();
            var relationship = new Mock<BaseRelationship<BaseModel, BaseModel>>();
            relationship.Setup(x => x.Model1Id).Returns(Guid.NewGuid());
            relationship.Setup(x => x.Model2Id).Returns(Guid.NewGuid());

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var edit = await controller.Edit(relationship.Object.Model1Id, Guid.NewGuid(), relationship.Object);
            var result = Assert.IsType<BadRequestObjectResult>(edit);
            Assert.IsAssignableFrom<BaseRelationship<BaseModel, BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Edit_Bad_Request_Relationship()
        {
            Setup();
            var relationship = new Mock<BaseRelationship<BaseModel, BaseModel>>();
            relationship.Setup(x => x.Model1Id).Returns(Guid.NewGuid());
            relationship.Setup(x => x.Model2Id).Returns(Guid.NewGuid());
            _relationshipService.Setup(x => x.Edit(relationship.Object)).Throws(new Exception());

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var edit = await controller.Edit(relationship.Object.Model1Id, relationship.Object.Model2Id, relationship.Object);
            var result = Assert.IsType<BadRequestObjectResult>(edit);
            Assert.IsAssignableFrom<BaseRelationship<BaseModel, BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Create_Ok()
        {
            Setup();
            var relationship = new Mock<BaseRelationship<BaseModel, BaseModel>>();
            _relationshipService.Setup(x => x.Create(relationship.Object)).Returns(Task.FromResult(relationship.Object));

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var create = await controller.Create(relationship.Object);
            var result = Assert.IsType<OkObjectResult>(create);
            Assert.IsAssignableFrom<BaseRelationship<BaseModel, BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Create_Bad_Request_Relationship()
        {
            Setup();
            var relationship = new Mock<BaseRelationship<BaseModel, BaseModel>>();
            _relationshipService.Setup(x => x.Create(relationship.Object)).Throws(new Exception());

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var create = await controller.Create(relationship.Object);
            var result = Assert.IsType<BadRequestObjectResult>(create);
            Assert.IsAssignableFrom<BaseRelationship<BaseModel, BaseModel>>(result.Value);
        }

        [Fact]
        public async Task Delete_No_Content()
        {
            Setup();
            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var delete = await controller.Delete(new Guid(), new Guid());
            Assert.IsType<NoContentResult>(delete);
        }

        [Fact]
        public async Task Delete_Bad_Request_Id()
        {
            Setup();
            var id1 = Guid.NewGuid();
            var id2 = Guid.NewGuid();
            _relationshipService.Setup(x => x.Delete(It.IsAny<Guid>(), It.IsAny<Guid>())).Throws(new Exception());

            var controller = new SubController(_relationshipService.Object, _logger.Object);
            var delete = await controller.Delete(id1, id2);
            var result = Assert.IsType<BadRequestObjectResult>(delete);
            Assert.Equal($"{{ id1 = {id1}, id2 = {id2} }}", $"{result.Value}");
        }

        public class SubController : BaseRelationshipController<BaseRelationship<BaseModel, BaseModel>, BaseModel, BaseModel>
        {
            public SubController(IRelationshipService<BaseRelationship<BaseModel, BaseModel>, BaseModel, BaseModel> service, ILogger<SubController> logger) : base(service, logger) { }
        }

        private void Setup()
        {
            _relationshipService = new Mock<IRelationshipService<BaseRelationship<BaseModel, BaseModel>, BaseModel, BaseModel>>();
            _logger = new Mock<ILogger<SubController>>();
        }
    }
}
