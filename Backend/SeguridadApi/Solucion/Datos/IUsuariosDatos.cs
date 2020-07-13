using Modelos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
   public  interface IUsuariosDatos
    {
        Task<Usuarios> ValidarUsuario(string nombreUsuario, string clave);
    }
}
