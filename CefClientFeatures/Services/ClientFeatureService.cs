namespace CefClientFeatures.Services
{
    using Models;
    using Relationships;
    using Microsoft.EntityFrameworkCore;

    public class ClientFeatureService : BaseRelationshipService<ClientFeature, Client, Feature>
    {
        public ClientFeatureService(DbContext context) : base(context) { }
    }
}