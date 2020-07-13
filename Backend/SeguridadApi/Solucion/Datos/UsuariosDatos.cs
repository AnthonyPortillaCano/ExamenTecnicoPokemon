using Dapper;
using Modelos;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Datos
{
    public class UsuariosDatos: IUsuariosDatos
    {
        protected readonly string _connectionString;
        public UsuariosDatos(string connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<Usuarios> ValidarUsuario(string nombreUsuario, string clave)
        {
            try
            {
                Usuarios usuario = new Usuarios();
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    var parameters = new DynamicParameters();
                    parameters.Add("nombreUsuario", nombreUsuario);
                    parameters.Add("clave", clave);
                    usuario = await connection.QueryFirstOrDefaultAsync<Usuarios>("SP_ValidarUsuario", parameters, commandType: CommandType.StoredProcedure);
                   await connection.CloseAsync();
                    return usuario;
                }
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
    }
}
