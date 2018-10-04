namespace CefClientFeatures.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Interfaces;
    using Options;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class TokenService : ITokenService
    {
        private readonly JwtOptions _jwtOptions;

        public TokenService(IOptions<JwtOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
        }

        public string GenerateToken(string userEmail, IList<string> userRoles, IList<Claim> userClaims)
        {
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, userEmail));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Iat,
                value: $"{DateTimeOffset.Now.ToUnixTimeSeconds()}",
                valueType: ClaimValueTypes.Integer64));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, $"{Guid.NewGuid()}"));
            foreach (var role in userRoles)
            {
                userClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var secretKeyBytes = Encoding.UTF8.GetBytes(_jwtOptions.SecretKey);
            var secretKey = new SymmetricSecurityKey(secretKeyBytes);

            return new JwtSecurityTokenHandler().WriteToken(
                token: new JwtSecurityToken(
                    header: new JwtHeader(
                        signingCredentials: new SigningCredentials(
                            key: secretKey,
                            algorithm: SecurityAlgorithms.HmacSha256)),
                    payload: new JwtPayload(
                        issuer: _jwtOptions.Issuer,
                        audience: _jwtOptions.Audience,
                        claims: userClaims,
                        notBefore: DateTime.UtcNow,
                        expires: DateTime.UtcNow.AddMinutes(30))));
        }
    }
}