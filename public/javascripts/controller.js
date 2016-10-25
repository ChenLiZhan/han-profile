'use strict';

/* controllers */

function AppCtrl($rootScope, $scope, $location, $http, lodash) {
  $rootScope.setMenu = function() {
    $http({
      method: 'GET',
      url: '/api/v1/photos/categories'
    }).success(function(response) {
      $rootScope.photosCategories = response.data;
    });
  };

  $rootScope.getPhotos = function(callback) {
    $http({
      method: 'GET',
      url: '/api/v1/photos'
    }).success(function(response) {
      $rootScope.photosData = response.data;
      callback();
    })
  };

  $rootScope.setMenu();
  // $rootScope.getPhotos(function() {
  //   $rootScope.photos = $rootScope.photosData;
  //   console.log($scope.photos);
  // });
};

AppCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'lodash'];

function Index($rootScope, $scope, $location, $http) {};

Index.$inject = ['$rootScope', '$scope', '$location', '$http'];

function Photos($rootScope, $scope, $location, $http, $stateParams, lodash) {
  $rootScope.setMenu();
  $rootScope.getPhotos(function() {
    $rootScope.photos = $rootScope.photosData[$stateParams.index];

    var totalWidth = 0
    lodash.each($rootScope.photos.items, function(item, index) {
      var image = new Image();
      var width, height;
      image.onload = function() {
        width = this.width;
        height = this.height;
        width = width * (500 / height)
        totalWidth = totalWidth + width;
        console.log(totalWidth);
        $scope.innerBoxWidthStyle = totalWidth + 30 * $rootScope.photos.items.length;
      }
      image.src = item.url;
    });
  });

};

Photos.$inject = ['$rootScope', '$scope', '$location', '$http', '$stateParams', 'lodash'];