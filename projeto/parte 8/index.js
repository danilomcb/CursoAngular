var app = angular.module("financas", [
    'angular-ladda',
    'jcs-autoValidate',
    'ngResource',
    'toaster',
    'ngAnimate',
    'mgcrea.ngStrap',
    'angularSpinner'
]);

app.config(function ($httpProvider, laddaProvider) {
    $httpProvider.defaults.headers.common.Authorization = "Tartagura Anonima";
    laddaProvider.setOption({
        style: 'expand-right'
    });
});

app.directive('ccSpinner', function () {
    return {
        'restrict': 'AE',
        'templateUrl': 'templates/spinner.html',
        'scope': {
            'isLoading': '=',
            'message': '@'
        }
    }
});

app.controller("TransacoesLista", ["$scope", "TransacaoService", "$modal",
    function ($scope, TransacaoService, $modal) {
        $scope.pesquisa = {};
        $scope.ordem = "nome";
        $scope.transacaoSelecionada = {};
        $scope.transacoes = TransacaoService;
        $scope.transacoes.carregarTransacoes();

        $scope.filtrar = function (transacao) {
            if ($scope.pesquisa.geral) {
                return transacao.nome.indexOf($scope.pesquisa.geral) > 0 ||
                    transacao.valor == $scope.pesquisa.geral;
            }

            return true;
        };

        $scope.exibirFormulario = function (transacao) {
            $scope.modalForm = $modal({
                scope: $scope,
                template: 'templates/modalFormularioTransacao.html',
                show: true
            });
        };

        $scope.criarTransacao = function(transacao) {
            $scope.transacoes.salvar(transacao).then(function () {
                $scope.transacaoSelecionada = {};
                $scope.modalForm.hide();
            });
        }
    }]);

app.controller("TransacoesDetalhes", ["$scope", "TransacaoService",
    function ($scope, TransacaoService) {

        $scope.transacaoSelecionada = null;
        $scope.transacoes = TransacaoService;

        $scope.atualizar = function () {
            $scope.transacoes.atualizar($scope.transacaoSelecionada)
        };

        $scope.remover = function () {
            $scope.transacoes.remover($scope.transacaoSelecionada)
        };

        $scope.$watch("transacoes.selecionada", function (valorNovo, valorAntigo) {
            $scope.transacaoSelecionada = angular.copy(valorNovo);
            $scope.formTransacao.$setPristine(true);
        });
    }]);


app.factory("Transacao", ["$resource", function ($resource) {
    return $resource('http://localhost:8080/CursoAngular/transacoes/:id', {id: "@id"}, {
        update: {
            method: "PUT"
        }
    });
}]);


app.factory("TransacaoService", ["Transacao", "$http", "toaster", "$q",
    function (Transacao, $http, toaster, $q) {
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

                    var index = self.lista.indexOf(self.selecionada);
                    self.lista.splice(index, 1);
                    self.selecionada = null;
                    toaster.pop('success', transacao.nome + ' Removida.');
                }, function (error) {
                    self.isDeletando = false;
                    toaster.pop('success', 'Error ao remover ' + transacao.nome);
                });
            },
            salvar: function (transacao) {
                var deferObject = $q.defer();
                self.isSalvando = true;

                Transacao.save(transacao).$promise.then(
                    function(response) {
                        console.log(response);
                        self.lista.push(new Transacao(transacao));
                        self.isSalvando = false;
                        self.carregarTransacoes();
                        toaster.pop('success', transacao.nome + ' criada com sucesos.');
                        deferObject.resolve();
                    }, function (error) {
                        self.isSalvando = false;
                        toaster.pop('success', 'Error ao criar ' + transacao.nome);
                        deferObject.reject();
                    }
                );

                return deferObject.promise;
            },
            atualizar: function (transacao) {
                self.isSalvando = true;

                transacao.$update().then(
                    function (response) {
                        console.log(response);
                        self.isSalvando = false;

                        var index = self.lista.indexOf(self.selecionada);
                        self.lista[index] = transacao;
                        self.selecionada = transacao;
                        toaster.pop('success', transacao.nome + ' Atualizada.');
                    }, function (error) {
                        self.isSalvando = false;
                        toaster.pop('success', 'Error ao atualizar ' + transacao.nome);
                    }
                );
            }
        };

        return self;
    }]);
