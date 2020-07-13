using Datos;
using Modelos;
using System.Threading.Tasks;

namespace Negocios
{
    public class UsuariosNegocio: IUsuariosNegocio
    {
        public UsuariosNegocio(string connectionString)
        {
            usuariosDatos = new UsuariosDatos(connectionString);
        }
        public IUsuariosDatos usuariosDatos { get; private set; }
        public async Task<Usuarios> ValidarUsuario(string nombreUsuario, string clave)
        {
            return await usuariosDatos.ValidarUsuario(nombreUsuario, clave);
        }
    }
}
