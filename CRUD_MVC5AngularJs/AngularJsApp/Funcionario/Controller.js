/**
 * aruivo: controller.js
 * esse arquivo irá conter o código do "funcionarioCtrl" a qual controla-rá os módulos de "funcionários
 */

//controller - funcionário:

funcionarioApp.controller('funcionarioCtrl', function ($scope, $funcionarioService) {
    //aqui estamos carregando todos os dados gravados do funcionário quando a pagina for carregada
    carregarFuncionarios();

    //Metodo responsavel por carregar todas as propriedade do funcionario
    function carregarFuncionarios() {
        var listarFuncionarios = $funcionarioService.getTodosFuncionarios();

        listarFuncionarios.then(function (d) {
            //se tudo funcionar:
            $scope.Funcionarios = d.data;
        },
            function () {
                alert("Ocorreu um erro ao listar todos os funcionários!");
            });
    }

    //Metodo responsavel por carregar todas as propriedade de um novo funcionario
    $scope.adicionarFuncionario = function () {

        var funcionario = {
            FuncionarioId: $scope.funcionarioId,
            Nome: $scope.nome,
            Email: $scope.email,
            Departamento: $scope.departamento,
            Cargo: $scope.cargo
        };//7:54

        console.log("antes da service ", funcionario)
        $funcionarioService.AdicionarFuncionario(funcionario).then(function (resposta) {
            console.log(" resposta = ", resposta)
            if (resposta.data.success === true) {
                carregarFuncionarios();
                alert("Funcionario adicionado com sucesso!");

                $scope.limparDados();
            }
            else {
                alert("Funcionario não adicionado");
            }
        },
            function () {
                alert("Erro ao tentar adicionaer um novo funcionario!");
            });
    }

    //Limpar os campos apoós inserir os dados no db :
    $scope.limparDados = function () {
        $scope.funcionarioId = '';
        $scope.nome = '';
        $scope.email = '';
        $scope.departamento = '';
        $scope.cargo = '';
    }

    //Metodo responsavel por atualizar dados do Funcionario pelo Id
    $scope.atualizarFuncionarioPorId = function (funcionario) {
        $scope.AtualizadoFuncionarioId = funcionario.FuncionarioId;
        $scope.AtualizadoNome = funcionario.Nome;
        $scope.AtualizadoEmail = funcionario.Email;
        $scope.AtualizadoDepartamento = funcionario.Departamento;
        $scope.AtualizadoCargo = funcionario.Cargo;
    }

    //Metodo responsavel por atualizar dados do Funcionario
    $scope.atualizarFuncionario = function () {
        var funcionario = {
            FuncionarioId: $scope.AtualizadoFuncionarioId,
            Nome: $scope.AtualizadoNome,
            Email: $scope.AtualizadoEmail,
            Departamento: $scope.AtualizadoDepartamento,
            Cargo: $scope.AtualizadoCargo
        };

        var atualizarInfos = $funcionarioService.AtualizarFuncionario(funcionario);
        atualizarInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionarios();
                alert("Funcionario Atualizado");
                $scope.limparDadosAtualizados();
            }
            else {
                alert("Funcionario NÃO Atualizado");
            }
        },
            function () {
                alert("Ocorreu um erro ao tentar atualizar o Funcionario");
            });
    }

    //Metodo responsavel por limpar os dados depois de atualizar funcionario
    $scope.limparDadosAtualizados = function () {
        $scope.AtualizadoFuncionarioId = '';
        $scope.AtualizadoNome = '';
        $scope.AtualizadoEmail = '';
        $scope.AtualizadoDepartamento = '';
        $scope.AtualizadoCargo = '';
    }

    //Metodo responsavel por excluir o funcionario
    $scope.excluirfuncionario = function (AtualizadoFuncionarioId) {

        var excluirInfos = $funcionarioService.excluirfuncionario($scope.atualizarFuncionarioPorId);
        excluirInfos.then(function (d) {
            if (d.data.success === true) {
                carregarFuncionarios();

                alert("Funcionario excluído com sucesso");
            }
            else {
                alert("Funcionario não excluído");
            }
        });

    }

});
