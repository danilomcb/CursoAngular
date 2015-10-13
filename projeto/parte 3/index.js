var app = angular.module("financas", [
    'angular-ladda',
    'jcs-autoValidate'
]);

app.run(function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['muitoBarato'] = 'Você tem que gastar pelo menos {0} dinheiros';
            errorMessages['muitoCaro'] = 'Não precisa esnobar, gaste menos que {0}';
            errorMessages['nomeRuim'] = 'O nome deve conter apenas numeros, letras e _';
        });
    }
);

app.controller("Transacoes", ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.submitted = false;
    $scope.submitting = false;

    $scope.onSubmit = function () {
        $scope.submitting = true;
        var timeout = $timeout(function () {
            console.log("Enviou o formulario");
        }, 2000);
        timeout.then(
            function () {
                $scope.submitting = false;
                $scope.submitted = true;
            },
            function () {
                $scope.submitting = false;
            });
        //$timeout.cancel(timeout); //Pode cancelar
    }

}]);