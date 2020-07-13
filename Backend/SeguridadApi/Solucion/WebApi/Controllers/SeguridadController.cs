
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Modelos;
using Negocios;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("Seguridad")]
    [EnableCors("MyPolicy")]
    [Authorize]
    public class SeguridadController : BaseController
    {
        private IConfiguration _configuration;
        public SeguridadController(IUnitOfWork unitOfWork, IConfiguration configuration) : base(unitOfWork)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("ValidarUsuario")]
        public async Task<IActionResult> ValidarUsuario([FromBody] Usuarios usuarios)
        {
            if (usuarios == null) return BadRequest();
            var result = await _unitOfWork.usuariosNegocio.ValidarUsuario(usuarios.NombreUsuario, usuarios.Clave);
            if (result != null)
            {
                var Token = BuildToken(usuarios);
                usuarios.Token = Token;
                return Ok(usuarios);
            }
            else
            {
                return NotFound();
            }
        }

        private string BuildToken(Usuarios usuarios)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
             {
                new Claim(ClaimTypes.Name,usuarios.NombreUsuario),
            };
            var token = new JwtSecurityToken(_configuration["Auth:Jwt:Issuer"], _configuration["Auth:Jwt:Audience"], claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Auth:Jwt:TokenExpirationInMinutes"])), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
