namespace CefLicenses.Controllers
{
    using System.Threading.Tasks;
    using Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<IdentityUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return BadRequest();
            }

            var roles = await _userManager.GetRolesAsync(user);
            var claims = await _userManager.GetClaimsAsync(user);
            var token = _tokenService.GenerateToken(user.Email, roles, claims);

            return Ok(token);

        }
    }

    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
