namespace CefLicenses.Relationships
{
    using System;
    using Models;

    public class ClientFeature : BaseRelationship<Client, Feature>
    {
        public DateTime? ExpirationDate { get; set; }
    }
}
