namespace CefClientFeatures.Models
{
    using System.Collections.Generic;
    using Relationships;

    public class Client : BaseModel
    {
        public ICollection<ClientFeature> ClientFeatures { get; set; }
    }
}
