var app = angular.module('myApp', ['ui.router', 'ngLodash']);

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $controllerProvider, $locationProvider) {
  // make the controllers be global
  $controllerProvider.allowGlobals();

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/index.html',
      controller: 'Index'
    })
    .state('photo', {
      url: '/photo/:index',
      templateUrl: 'partials/photos.html',
      controller: 'Photos'
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}]);