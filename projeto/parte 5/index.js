var app = angular.module("financas", [
    'angular-ladda',
    'jcs-autoValidate',
    'angularSpinner'
]);

app.config(function ($httpProvider, laddaProvider) {
    $httpProvider.defaults.headers.common.Authorization = "Tartagura Anonima";
    laddaProvider.setOption({
        style: 'expand-right'
    });
});

app.controller("Transacoes", ["$scope", "TransacaoService", function ($scope, TransacaoService) {
    $scope.pesquisa = {};
    $scope.ordem = "nome";
    $scope.transacoes = TransacaoService;
    $scope.transacoes.carregarTransacoes();

    $scope.filtrar = function (transacao) {
        if ($scope.pesquisa.nome || $scope.pesquisa.valor || $scope.pesquisa.geral) {
            return transacao.nome.indexOf($scope.pesquisa.nome) > 0 ||
                transacao.nome.indexOf($scope.pesquisa.geral) > 0 ||
                transacao.valor == $scope.pesquisa.valor ||
                transacao.valor == $scope.pesquisa.geral;
        }

        return true;
    };

}]);


app.factory("TransacaoService", ["$http", function ($http) {
    var self = {
        lista: [],
        carregando: false,
        selecionada: null,
        carregarTransacoes: function () {
            self.carregando = true;
            $http.get("http://localhost:8080/CursoAngular/transacoes", {}).then(
                function successCallback(response) {
                    self.lista = response.data.list;
                    self.carregando = false;
                }, function errorCallback(response) {
                    console.log(response);
                    self.carregando = false;
                });
        }
    };

    return self;
}]);