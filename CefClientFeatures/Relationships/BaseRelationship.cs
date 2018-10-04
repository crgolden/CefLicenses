namespace CefClientFeatures.Relationships
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Models;

    public abstract class BaseRelationship<T1, T2>
        where T1 : BaseModel
        where T2 : BaseModel
    {
        [Required]
        public virtual Guid Model1Id { get; set; }
        public T1 Model1 { get; set; }
        [Required]
        public virtual Guid Model2Id { get; set; }
        public T2 Model2 { get; set; }
    }
}
