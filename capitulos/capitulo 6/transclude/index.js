var app = angular.module('cursoAngular', []);

app.controller('CursoAngularCtrl', ["$scope", function($scope) {
    $scope.onSubmit = function() {
        console.log("pessoaForm Submetido");
    };

}]);

app.directive('comTransclude', function() {
    return {
        transclude: true,
        template: function(tElement, tAttrs) {
            console.log("Com Transclude");
            console.log(tElement);
            console.log(tAttrs);
            return "<div ng-transclude></div>";
        }
    }
});

app.directive('semTransclude', function() {
    return {
        transclude: false,
        template: function(tElement, tAttrs) {
            console.log("Com Transclude");
            console.log(tElement);
            console.log(tAttrs);
            return "<a>Sem Transclude</a>";
        }
    }
});