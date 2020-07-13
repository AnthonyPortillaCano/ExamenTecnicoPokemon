using System;
using System.Collections.Generic;
using System.Text;

namespace Negocios
{
   public interface IUnitOfWork
    {
        IUsuariosNegocio usuariosNegocio { get; }
    }
}
