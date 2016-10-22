var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $controllerProvider, $locationProvider) {
  // make the controllers be global
  $controllerProvider.allowGlobals();

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/index.html',
      controller: 'Index'
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}]);