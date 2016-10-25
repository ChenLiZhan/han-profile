var app = angular.module('myApp', ['ui.router', 'ngLodash', 'myApp.filters']);

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
    })
    .state('video', {
      url: '/video/:index',
      templateUrl: 'partials/videos.html',
      controller: 'Videos'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html',
      controller: 'About'
    });


  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}]);