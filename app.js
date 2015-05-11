var app = angular.module('galleryApp',['ngCookies', 'ngAnimate']);//'ngAnimate', 'ngTouch'

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
    
	
	/**
		Function for Scroll to appropriate position based on image index and width
	**/
    $scope.scrollTo = function(image,ind) {
        $scope.listposition = {left:(IMAGE_WIDTH * ind * -1) + "vw"};
        $scope.selected = image;
		$scope.selectedFordypning = image;
		$scope.selectedData = $scope.selectedData2 = $scope.selectedData3 = image; 
		
		
		
    };
	
	/**
		Function for navigating left or right when arrows are clicked in the Image Gallery.
	**/
	$scope.myNavigate = function(galleryid, navAction) {
	console.log('entered mynavigate');
	
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
	
**/
app.controller('ProjectTabCtrl', ['$scope', '$cookieStore', function ProjectTabCtrl($scope, $cookieStore) {
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
}]);


/**
	Controller for Header tabs. Used for checking/setting active header tab. Values are stored in cookies to maintain tab state on page refresh.
	**CURRENTLY NOT USED**
**/
app.controller('HeadTabCtrl', ['$scope', '$cookieStore', function HeadTabCtrl($scope, $cookieStore){
		if (typeof $cookieStore.get('headTab') === 'undefined') {
			$cookieStore.put('headTab', 1);
		}
		this.isSet=function(checkTab){
			var retParam = $cookieStore.get('headTab');
			console.log('checking '+retParam+ ' against '+checkTab);
			return retParam === checkTab;
		};
		this.setTab = function(activeTab){
			$cookieStore.put('headTab', activeTab);
		}
}]);

app.directive('pageHeader', function(){
	return {
		restrict: 'E',
		templateUrl: 'page-header.html'
		};
});

app.directive('contactTab', function(){
return {

	restrict: 'E',
	templateUrl: '/content-tabs/contact-tab.html'
	};
});

app.directive('homeTab', function(){
return {
	restrict: 'E',
	templateUrl: '/content-tabs/home-tab.html'
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
