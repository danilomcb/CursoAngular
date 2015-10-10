var app = angular.module('cursoAngular', []);

app.controller('CursoAngularCtrl', ["$scope", function ($scope) {
    $scope.onSubmit = function () {
        console.log("pessoaForm Submetido");
    };

}]);

app.directive('diretivaComCompile', function() {
    return {
        transclude: true,
        template: function(tElement, tAttrs) {
            return "<div ng-transclude></div>";
        },
        compile: function (element, attributes) {
            element.append("<span>Modificado pelo compile antes do transclude</span>");
        }
    }
});

app.directive('diretivaSemCompile', function() {
    return {
        transclude: true,
        template: function(tElement, tAttrs) {
            return "<div ng-transclude></div>";
        }
    }
});