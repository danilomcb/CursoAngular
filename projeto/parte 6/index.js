var app = angular.module("financas", [
    'angular-ladda',
    'jcs-autoValidate',
    'ngResource',
    'angularSpinner'
]);

app.config(function ($httpProvider, laddaProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.headers.common.Authorization = "Tartagura Anonima";
    laddaProvider.setOption({
        style: 'expand-right'
    });
});

app.controller("TransacoesLista", ["$scope", "TransacaoService", function ($scope, TransacaoService) {
    $scope.pesquisa = {};
    $scope.ordem = "nome";
    $scope.transacoes = TransacaoService;
    $scope.transacoes.carregarTransacoes();

    $scope.filtrar = function (transacao) {
        if ($scope.pesquisa.geral) {
            return transacao.nome.indexOf($scope.pesquisa.geral) > 0 ||
                transacao.valor == $scope.pesquisa.geral;
        }

        return true;
    };
}]);

app.controller("TransacoesDetalhes", ["$scope", "TransacaoService", function ($scope, TransacaoService) {
    $scope.transacoes = TransacaoService;

    $scope.salvar = function () {
        $scope.transacoes.salvar($scope.transacoes.selecionada)
    };

    $scope.remover = function () {
        $scope.transacoes.remover($scope.transacoes.selecionada)
    };
}]);


app.factory("Transacao", ["$resource", function ($resource) {
    return $resource('http://localhost:8080/curso/transacoes/:id', {id: "@id"}, {
        update: {
            method: "PUT"
        }
    });
}]);


app.factory("TransacaoService", ["Transacao", "$http", function (Transacao, $http) {
    var self = {
        lista: [],
        isSalvando: false,
        isDeletando: false,
        isCarregando: false,
        selecionada: null,
        carregarTransacoes: function () {
            self.isCarregando = true;

            Transacao.get({},
                function (response) {
                    self.lista = [];
                    angular.forEach(response.list, function (transacao) {
                        self.lista.push(new Transacao(transacao));
                    });
                    self.isCarregando = false;
                },
                function (error) {
                    console.log(error);
                }
            );
        },
        remover: function (transacao) {
            self.isDeletando = true;
            transacao.$remove().then(function () {
                self.isDeletando = false;

                var index = self.lista.indexOf(transacao);
                self.lista.splice(index, 1);
                self.selecionada = null;
            }, function (error) {
                self.isDeletando = false;
                console.log(error);
            });
        },
        salvar: function (transacao) {
            self.isSalvando = true;
            //Metodo Alternativo
            //transacao.$update().then(
            //    function (response) {
            //        console.log(response);
            //        self.isSalvando = false;
            //    }, function (error) {
            //        console.log(error);
            //        self.isSalvando = false;
            //    }
            //);

            Transacao.update(transacao).$promise.then(
                function(response) {
                    console.log(response);
                    self.isSalvando = false;
                }, function (error) {
                    console.log(error);
                    self.isSalvando = false;
                }
            );
        }
    };

    return self;
}]);
