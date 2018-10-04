namespace CefClientFeatures.Interfaces
{
    using System.Collections.Generic;
    using System.Security.Claims;

    public interface ITokenService
    {
        string GenerateToken(string userEmail, IList<string> userRoles, IList<Claim> userClaims);
    }
}