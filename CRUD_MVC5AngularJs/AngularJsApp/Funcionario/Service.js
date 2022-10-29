/** Service.js
 * arquivo responsável por carregar os dados via $http.get - do MVC Controller
 * (onde transformará os dados em Json)
 */
funcionarioApp.service('$funcionarioService', function ($http) {

    this.getTodosFuncionarios = function () {
        //console.log("oi bebe")
        return $http.get("/Funcionario/GetFuncionario");
    }
    
    this.AdicionarFuncionario = function (funcionario) {
        //console.log(" entro no this.AdicionarFuncionario")
        var request = $http({
            method: 'post',
            url: '/Funcionario/AdicionarFuncionario',
            data: funcionario
        });

        return request;
    }

    this.AtualizarFuncionario = function (funcionario) {
        var requestAtualizado = $http({
            method: 'post',
            url: '/Funcionario/AtualizarFuncionario',
            data: funcionario
        });

        return requestAtualizado;
    }

    this.ExcluirFuncionario = function (AtualizadoFuncionarioId) {
        return $http.post('/Funcionario/ExcluirFuncionario/' + AtualizadoFuncionarioId);
    }
    
})