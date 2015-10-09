var app = angular.module('cursoAngular', []);

app.directive('jogo', function () {
   return {
       scope: {
           times: '@'
       },
       controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
           $scope.gols = 0;
           this.increment = function() {
               $scope.gols++;
               console.log($scope.gols);
           }
       }],
       template: "<p>Partida: [{{times}}]</p><b>Gols do jogo: </b> {{gols}}"
   };
});

app.directive('gol', function() {
    return {
        require: 'jogo',
        link: function (scope, el, attrs, jogoController) {
            var b = angular.element("<p><button>Aumentar gols do Jogo</button></p>");
            b.on('click', function() {
                jogoController.increment();
            });
            el.append(b);
        }
    };
});