var app = angular.module("financas", []);

app.controller("Transacoes", ["$scope", "TransacoesService", function ($scope, TransacoesService) {
    TransacoesService.carregarTrasancoes().then(function () {
        $scope.transacoes = TransacoesService.transacoes;
    });
}]);

app.service('TransacoesService', function ($http, $q) {

    var self = {
        transacoes: [],
        carregarTrasancoes: function () {
            var defer = $q.defer();

            if (self.transacoes.length == 0) {
                $http.get('transacoes.json')
                    .success(function (data) {
                        self.transacoes = data;
                        defer.resolve();
                    })
                    .error(function() {
                        defer.reject('não foi possível abrir o arquivo');
                    });
            } else {
                defer.resolve();
            }

            return defer.promise;
        }
    };
    self.carregarTrasancoes();

    return self;
});