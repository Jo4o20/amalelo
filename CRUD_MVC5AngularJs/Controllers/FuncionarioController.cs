using CRUD_MVC5AngularJs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUD_MVC5AngularJs.Controllers
{
    public class FuncionarioController : Controller
    {
        #region Metodo para listar funcionario -READ

        // GET  Funcionario/GetFuncionario

        [HttpGet]
        public JsonResult GetFuncionario()
        {
            Console.WriteLine("oi bebe <3");
            using (var db = new FuncionariosEntities())
            {
                List<Funcionario> listarFuncionario = db.Funcionarios.ToList();

                return Json(listarFuncionario, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Metodo para adicionar funcionarios - create

        //POST Funcionario/AdicionarFuncionario

        [HttpPost]
        public JsonResult AdicionarFuncionario(Funcionario funcionario)
        {
            if (funcionario != null)
            {
                using (var db = new FuncionariosEntities())
                {
                    db.Funcionarios.Add(funcionario);
                    db.SaveChanges();

                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }
        #endregion

        #region Metodo para Atualizar funcionarios - update

        //POST Funcionario/Atualizar
        [HttpPost]
        public JsonResult AtualizarFuncionario(Funcionario Funcionario)
        {
            using (var db = new FuncionariosEntities())
            {
                var funcionarioAtualizado = db.Funcionarios.Find(Funcionario.FuncionarioId);

                if (funcionarioAtualizado == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    funcionarioAtualizado.Nome = Funcionario.Nome;
                    funcionarioAtualizado.Departamento = Funcionario.Departamento;
                    funcionarioAtualizado.Cargo = Funcionario.Cargo;
                    funcionarioAtualizado.Email = Funcionario.Email;

                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }

        #endregion

        #region Método para Excluir Funcionário - DELETE
        [HttpPost]
        public JsonResult ExcluirFuncionario(int funcionarioId)
        {
            using (var db = new FuncionariosEntities())
            {
                var funcionario = db.Funcionarios.Find(funcionarioId);
                if(funcionario == null)
                {
                    return Json(new { success = false });
                }
                db.Funcionarios.Remove(funcionario);
                db.SaveChanges();

                return Json(new { success = true });
            }
        }
        #endregion

    }
}