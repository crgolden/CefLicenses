namespace CefLicenses.Models
{
    using System.Collections.Generic;
    using Relationships;

    public class Feature : BaseModel
    {
        public bool IsCore { get; set; }
        public ICollection<ClientFeature> ClientFeatures { get; set; }
    }
}
