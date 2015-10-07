var app = angular.module('cursoAngular', []);
app.controller('CursoAngularCtrl', ['$scope', function(nomeAleatorioEscopo) {
    nomeAleatorioEscopo.formModel = {
        name: "Nome default"
    }
}]);