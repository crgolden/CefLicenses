namespace CefClientFeatures.Filters
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using Microsoft.AspNetCore.Authorization;
    using Swashbuckle.AspNetCore.Swagger;
    using Swashbuckle.AspNetCore.SwaggerGen;

    public class SecurityRequirementsOperationFilter : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            var controllerAuthorizeAttributes = context.MethodInfo
                .DeclaringType
                .GetTypeInfo()
                .GetCustomAttributes(true)
                .OfType<AuthorizeAttribute>()
                .ToList();
            var controllerRoles = controllerAuthorizeAttributes.Select(x => x.Roles);
            var controllerPolicies = controllerAuthorizeAttributes.Select(x => x.Policy);
            var actionAuthorizeAttributes = context.MethodInfo
                .GetCustomAttributes(true)
                .OfType<AuthorizeAttribute>()
                .ToList();
            var actionRoles = actionAuthorizeAttributes.Select(x => x.Roles);
            var actionPolicies = actionAuthorizeAttributes.Select(x => x.Policy);
            var policiesAndRoles = controllerRoles
                .Union(controllerPolicies)
                .Union(actionRoles)
                .Union(actionPolicies)
                .Where(x => !string.IsNullOrEmpty(x))
                .Distinct();

            operation.Responses.Add("401", new Response { Description = "Unauthorized" });
            operation.Responses.Add("403", new Response { Description = "Forbidden" });
            operation.Security = new List<IDictionary<string, IEnumerable<string>>>
            {
                new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", policiesAndRoles}
                }
            };
        }
    }
}
