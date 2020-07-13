using Modelos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Negocios
{
   public interface IUsuariosNegocio
    {
        Task<Usuarios> ValidarUsuario(string nombreUsuario, string clave);
    }
}
