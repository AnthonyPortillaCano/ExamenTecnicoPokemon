using System;
using System.Collections.Generic;
using System.Text;

namespace Negocios
{
    public class UnitOfWork: IUnitOfWork
    {
        public UnitOfWork(string connectionString)
        {
            usuariosNegocio = new UsuariosNegocio(connectionString);
        }
        public IUsuariosNegocio usuariosNegocio { get; private set; }
    }
}
