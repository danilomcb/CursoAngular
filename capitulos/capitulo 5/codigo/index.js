var app = angular.module('cursoAngular', []);

app.controller('CursoAngularCtrl', ["$scope", function($scope) {
    $scope.onSubmit = function() {
        console.log("pessoaForm Submetido");
    };

}]);

app.filter('filtroTeste', function() {
    return function(input, texto1, texto2) {
        return input + ' (' + texto1 + ', ' + texto2 + ')';
    }
});