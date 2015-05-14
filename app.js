var app = angular.module('galleryApp',['ngCookies', 'ngAnimate', 'ngRoute']);//'ngAnimate', 'ngTouch'

app.config(['$locationProvider', '$routeProvider', '$provide', function AppConfig($locationProvider, $routeProvider, $provide){
	
    //$provide.decorator('$sniffer', function($delegate) {
	  //$delegate.history = false;
	  //return $delegate;
	//});
	//$routeProvider
	  //.when('/contact', {
		//templateUrl: 'contact.html',
	  //});
	$locationProvider
	  .html5Mode(true)
	  .hashPrefix('!');
	
}]);

app.controller('DummyCtrl', function(){ 
	DataSource.get("",function(data) {});	
});

app.factory('DataSource', ['$http',function($http){
       return {
           get: function(fileName,callback){
                $http.get(fileName).
                success(function(data, status) {
                    callback(data);
                });
           }
       };
    }]);
	
	
app.service('sharedProperties', function() {
	var pid = "";  //project id
    return {
		getPid: function() {
			return pid;
		},
		setPid: function(value){
			pid = value;
		}
    }
});
		
/**
Temp solution for making sure that header tabs are updated properly TODO: replace with something better.
**/
app.controller('TempActiveHeaderItemCtrl', ['$scope', 'DataSource', function($scope, DataSource){ 
	DataSource.get("",function(data) {});	
}]);

/**
	Controller for retrieving and setting data for the image gallery from .json files + TODO: some outdated functions 
**/
app.controller('GalleryController', ['$scope', 'DataSource', function($scope, DataSource){
	var IMAGE_WIDTH = 70.75;
	var PROJECT_COUNT = 2;
	$scope.IMAGE_LOCATION = "/img/projects/";
	$scope.IMAGE_INFO_LOCATION = "/img/projects/";
	
	
	//Retrieve image data from json files and store it in scope variables 
	$scope.galleryDataArray = [];
	$scope.selectedDataArray = [];

	DataSource.get($scope.IMAGE_INFO_LOCATION+1+"/images"+1+".json",function(data) {
			$scope.galleryData1 = data;
			$scope.selectedData = data[0];
		});
	
	DataSource.get($scope.IMAGE_INFO_LOCATION+2+"/images"+2+".json",function(data) {
			$scope.galleryData2 = data;
			$scope.selectedData2 = data[0];
	});
    
	
	//Function for Scroll to appropriate position based on image index and width 
	//TODO: currently not used
    $scope.scrollTo = function(image,ind) {
        $scope.listposition = {left:(IMAGE_WIDTH * ind * -1) + "vw"};
        $scope.selected = image;
		$scope.selectedFordypning = image;
		$scope.selectedData = $scope.selectedData2 = $scope.selectedData3 = image; 
    };
	
	//Function for navigating left or right when arrows are clicked in the Image Gallery.
	//TODO: currently not used
	$scope.myNavigate = function(galleryid, navAction) {
	
		var tempGalleryData = [];
		var tempSelectedData = [];
		
		if(galleryid==1){
			tempGalleryData = $scope.galleryData1;
			tempSelectedData = $scope.selectedData;
		}
		else if(galleryid==2){
			tempGalleryData = $scope.galleryData2;
			tempSelectedData = $scope.selectedData2;
		}
		
		var tempId = 0;
		for (i = 0; i < tempGalleryData.length; i++) { 
			if(tempGalleryData[i] == tempSelectedData){
				tempId = i;
				break;
			}
		}
		if(navAction=="next"){
			if(i >= tempGalleryData.length-1){
				$scope.scrollTo(tempGalleryData[0],(0));	
			}
			else{
				$scope.scrollTo(tempGalleryData[i+1],(i+1));	
			}
		}
		else if(navAction=="prev"){
			if(i == 0){
				$scope.scrollTo(tempGalleryData[tempGalleryData.length-1],tempGalleryData.length-1);	
			}
			else
			{
				$scope.scrollTo(tempGalleryData[i-1],(i-1));	
			}
		}	
	}
}]);


/**
	Controller for Project tabs. Used for checking/setting active project tab. Values are stored in cookies to maintain tab state on page refresh.
	//TODO: currently not used
**/
app.controller('ProjectTabCtrl', ['$scope', '$cookieStore', 'sharedProperties', '$location', function ProjectTabCtrl($scope, $cookieStore, sharedProperties, $location) {
	$scope.projectTab = 1;
	
	if (typeof $cookieStore.get('projectTab') === 'undefined') 
	{
			$cookieStore.put('projectTab', 1);
			$scope.projectTab = 1;
	}
	else
	{
			$scope.projectTab = $cookieStore.get('projectTab');
	}
	
	this.isSet = function(checkTab)
	{
		return $scope.projectTab === checkTab;
		
	};
	this.setTab = function(activeTab)
	{
		$scope.projectTab = activeTab;
		$cookieStore.put('projectTab', activeTab);
	};
	$scope.isCurrentSlideIndex = function (index) {
            return 1 === index;
        };
}]);


/**
	Controller for Header tabs. Used for checking/setting active header tab. Values are stored in cookies to maintain tab state on page refresh.
**/
app.controller('HeadTabCtrl', ['$scope', '$cookieStore', '$location', 'sharedProperties', function HeadTabCtrl($scope, $cookieStore, $location, sharedProperties){
		
		//set pid (project id) - will be used to determine which project to show in projects.html
		$scope.pid="";
		if (typeof $location.search().pid != 'undefined') 
		{
			$scope.pid = $location.search().pid;
			sharedProperties.setPid($scope.pid);
		}
		$scope.pid = sharedProperties.getPid();
		//
		
		if (typeof $cookieStore.get('headTab') === 'undefined') {
			$cookieStore.put('headTab', 1);
		}
		$scope.isSet=function(checkTab){
			if (typeof $cookieStore.get('headTab') === 'undefined') {
				$cookieStore.put('headTab', 1);
			}
			var retParam = $cookieStore.get('headTab');
			return retParam === checkTab;
		};
		$scope.setTab = function(activeTab){
			$cookieStore.put('headTab', activeTab);
		}
		
		this.isSet = function(item) {
		  if (item == $location.path()) {
			
			return true;
		  }  
		  return false;
		};
}]);

app.directive('pageHeader', function(){
	return {
		restrict: 'E',
		templateUrl: 'page-header.html'
		};
});

app.directive('pageHeaderBootstrap', function(){
	return {
		restrict: 'E',
		templateUrl: 'page-header-bootstrap.html'
		};
});

app.directive('contactTab', function(){
return {

	restrict: 'E',
	templateUrl: '/content-tabs/contact-tab.html',
	};
});

app.directive('homeTab', function(){
return {
	restrict: 'E',
	templateUrl: '/content-tabs/home-tab.html',
};
});

app.directive('projectTab', function(){
	return {
		restrict: 'E',
		templateUrl: '/content-tabs/project-tab.html',
	};
});

app.directive('pageFooter', function(){
	return {
		restrict: 'E',
		templateUrl: 'page-footer.html',
	};
});