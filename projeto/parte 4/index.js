var app = angular.module("financas", [
    'angular-ladda',
    'jcs-autoValidate'
]);

app.config(function ($httpProvider, laddaProvider) {
    $httpProvider.defaults.headers.common.Authorization = "Tartagura Anonima";
    laddaProvider.setOption({
        style: 'expand-right'
    });
});

app.controller("Transacoes", ["$scope", "TransacaoService", function ($scope, TransacaoService) {
    $scope.transacoes = TransacaoService;
    $scope.transacoes.carregarTransacoes();
}]);


app.factory("TransacaoService", ["$http", function ($http) {
    var self = {
        lista: [],
        selecionada: null,
        carregarTransacoes: function () {
            $http.get("http://localhost:8080/CursoAngular/transacoes", {}).then(
                function successCallback(response) {
                    self.lista = response.data.list;
                }, function errorCallback(response) {
                    console.log(response);
                });
        }
    };

    return self;
}]);