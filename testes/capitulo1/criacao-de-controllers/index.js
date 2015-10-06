var app = angular.module('cursoAngular', []);


//Precisa adicionar a variavel ao $scope para ter acesso a ela no html
app.controller('CursoAngularCtrl', function($scope) {
    $scope.formModel = {};
})