'use strict';

/* controllers */

function AppCtrl($rootScope, $scope, $location, $http, lodash) {
  // disable right click event
  document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  $rootScope.photos = [];
  $rootScope.videos = [];
  $scope.showPhotos = 0;
  $scope.showVideos = 0;
  $scope.showAbout = 1;
  $scope.onLoad = 0;
  $rootScope.setMenu = function() {
    $http({
      method: 'GET',
      url: '/api/v1/photos/categories'
    }).success(function(responsePhoto) {
      $http({
        method: 'GET',
        url: '/api/v1/videos/categories'
      }).success(function(responseVideo) {
        $rootScope.photosCategories = responsePhoto.data;
        $rootScope.videosCategories = responseVideo.data;
        $scope.onLoad = true;
      })
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

  $rootScope.getVideos = function(callback) {
    $http({
      method: 'GET',
      url: '/api/v1/Videos'
    }).success(function(response) {
      $rootScope.videosData = response.data;
      callback();
    })
  };

  $scope.photosMode = function(index) {
    var totalWidth = 0;
    var imagesStatus = [];
    for (var i = 0; i < $rootScope.photosData[index].items.length; ++i) imagesStatus.push(0);
    lodash.each($rootScope.photosData[index].items, function(item, i) {
      var image = new Image();
      var width, height;
      image.onload = function() {
        width = this.width;
        height = this.height;
        width = width * (500 / height)
        totalWidth = totalWidth + width;
        imagesStatus[i] = 1;
        if (imagesStatus.indexOf(0) === -1) {
          $scope.$apply(function() {
            $rootScope.photos = $rootScope.photosData[index];
            $scope.innerBoxWidthStyle = totalWidth + 30 * $rootScope.photos.items.length;
            $scope.showPhotos = 1;
            $scope.showVideos = 0;
            $scope.showAbout = 0;
          });
        }
      }
      image.src = item.url;
    });
  };

  $scope.videosMode = function(index) {
    $rootScope.video = [];
    $rootScope.video = $rootScope.videosData[index].items[0];
    $scope.showPhotos = 0;
    $scope.showVideos = 1;
    $scope.showAbout = 0;
  };

  $scope.aboutMode = function() {
    $scope.showPhotos = 0;
    $scope.showVideos = 0;
    $scope.showAbout = 1;
  };

  $rootScope.setMenu();
  $rootScope.getPhotos(function() {
    $rootScope.photos = $rootScope.photosData;
  });
  $rootScope.getVideos(function() {
    $rootScope.videos = $rootScope.videosData;
  })
};

AppCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'lodash'];

function Index($rootScope, $scope, $location, $http) {};

Index.$inject = ['$rootScope', '$scope', '$location', '$http'];

// function Photos($rootScope, $scope, $location, $http, $stateParams, lodash) {
//   $rootScope.setMenu();

//   $rootScope.getPhotos(function() {
//     $rootScope.photos = $rootScope.photosData[$stateParams.index];

//     var totalWidth = 0
//     lodash.each($rootScope.photos.items, function(item, index) {
//       var image = new Image();
//       var width, height;
//       image.onload = function() {
//         width = this.width;
//         height = this.height;
//         width = width * (500 / height)
//         totalWidth = totalWidth + width;
//         $scope.innerBoxWidthStyle = totalWidth + 30 * $rootScope.photos.items.length;
//       }
//       image.src = item.url;
//     });
//   });

// };

// Photos.$inject = ['$rootScope', '$scope', '$location', '$http', '$stateParams', 'lodash'];
// function Videos($rootScope, $scope, $location, $http, $stateParams, lodash) {
//   $rootScope.setMenu();
//   $rootScope.getVideos(function() {
//     $rootScope.video = $rootScope.videosData[$stateParams.index];
//     console.log($rootScope.video.items[0]);
//   });

// };

// Videos.$inject = ['$rootScope', '$scope', '$location', '$http', '$stateParams', 'lodash'];

// function About($rootScope, $scope, $location, $http, $stateParams, lodash) {
//   $rootScope.setMenu();
// };

// About.$inject = ['$rootScope', '$scope', '$location', '$http', '$stateParams', 'lodash'];