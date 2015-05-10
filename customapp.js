(function(){
	var app = angular.module('custom', ['ngAnimate', 'ngTouch']);
	
	app.factory('DataSource', ['$http', function($http){
	return {
			get:function(fileName,callback){
				$http.get(filename).
				success(function(data, status) {
					callback(data);
				});
				}
			};
	}]);
	
	var GalleryController = function($scope, DataSource) {
		var IMAGE_WIDTH = 405;
		$scope.IMAGE_LOCATION = "http://rabidgadfly.com/assets/angular/gallery1/";
		
		Datasource.get("images.json",function(data){
			$scope.galleryData = data;
			$scope.selected = data[0];
		});
		
		$scope.scrollTo = function(image, ind) {
			$scope.listposition = {left:(IMAGE_WIDTH * ind * -1)+ "px"};
			$scope.selected = image;
		};
	
	}; 
	
	app.controller('CustomController', function($scope){
    this.projects = projects;
	
	$scope.photos = [
	        {src: 'img/projects/archimate_case2.png', desc: 'Image 01'},
	        {src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', desc: 'Image 02'},
	        {src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg', desc: 'Image 03'},
	        {src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg', desc: 'Image 04'},
	        {src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_b.jpg', desc: 'Image 05'},
	        {src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_b.jpg', desc: 'Image 06'}
	    ];
		
		//$scope.photos = [
	        //{src: 'img/projects/archimate_case2.png', desc: 'Image 01'},
	        //{src: 'img/projects/conforg2.png', desc: 'Image 02'},
	        //{src: 'img/projects/gemal_concepts.png', desc: 'Image 03'},
	        //{src: 'img/projects/paper_advanced_viewstyle.png', desc: 'Image 04'}
	    //];
		
		$scope._Index = 0;
  
  $scope.isActive = function(index) {
	return $scope._Index === index;
  };
  
  $scope.showPrev = function() {
	$scope._Index = ($scope._Index > 0) ? --$scope._Index :
	$scope.photos.length -1;
  };
  
  $scope.showNext = function () {
	$scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
  };
  
  $scope.showPhoto = function (index) {
	$scope._Index = index;
  }
	
	});
	

	
	
	app.directive('customHeader', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'custom-header.html',
		controller: function() {
		},
		controllerAs: 'header'
		};
	});
	
	
	app.directive('customHeaderTabs', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'custom-header-tabs.html',
		controller: function() {
			this.tab = 2;
			this.isSet = function(checkTab){
			return this.tab === checkTab;
			};
			this.setTab = function(activeTab){
			this.tab = activeTab;
		};
		},
		controllerAs: 'headerTabs'
		};
	});
	
	
	 

	
	
	var projects = [
    {
      name: 'BachelorPro',
      description: "Mitt bachelorprosjekt",
      year: 2012,
      type: "Group",
      images: [
        "img/bachelor-01.png",
        "img/bachelor-02.png",
        "img/bachelor-03.png"
      ]
    }, {
      name: 'FordypningsPro',
      description: "Mitt fordypningsprosjekt",
      year: 2013,
      type: "Solo",
      images: [
        "img/fordypning-01.png",
        "img/fordypning-02.png",
        "img/fordypning-03.png"
      ]
    }, {
      name: 'MasterPro',
      description: "Mitt masterprosjekt",
      year: 2015,
      type: "Solo",
      images: [
        "img/projects/archimate_case2.png",
        "img/projects/conforg2.png",
        "img/projects/gemal_concepts.png",
		"img/projects/paper_advanced_viewstyle.png"
      ]
    }
  ];
  
  
	
	
})();