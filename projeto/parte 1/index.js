var app = angular.module("financas", []);

app.controller("Transacoes", ["$scope", function($scope) {

    $scope.onSubmit = function () {
        $scope.cadastrado = true;
    }

}]);