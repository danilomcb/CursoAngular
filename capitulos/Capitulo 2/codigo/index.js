var app = angular.module('cursoAngular', []);

app.controller('CursoAngularCtrl', ["$scope", function($scope) {
    $scope.onSubmit = function() {
        console.log("pessoaForm Submetido");
    };

    $scope.classe = "erro";
    $scope.getClasse = function() {
        return $scope.classe;
    };

    $scope.$watch('formModel.senha', function (newVal, oldVal) {
        console.log("Nova senha = " + newVal + "| Senha Antiga = " + oldVal);
    });

    $scope.$watch('formModel', function (newVal, oldVal) {
        console.log("Novo model = " + newVal + "| Model Antigo = " + oldVal);
    });

    $scope.$watch('formModel', function (newVal, oldVal) {
        console.log("Novo model completo = " + newVal + "| Model Antigo completo = " + oldVal);
    }, true);

}]);