var app = angular.module('cursoAngular', []);

app.controller('CursoAngularCtrl', ["$scope", function($scope) {
    $scope.onSubmit = function() {
        console.log("pessoaForm Submetido");
    };

}]);

app.directive('teste', function() {
    return {
        templateUrl: 'meuTemplate.html',
        scope: {
            texto : '@'
        }
    }
});

app.directive('teste2', function() {
    return {
        template: '<div class="row"><div class="col-md-12">{{texto}}</div></div>',
        scope: {
            texto : '@'
        }
    }
});