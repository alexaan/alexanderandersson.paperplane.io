

var app = angular.module('galleryApp',[]);//'ngAnimate', 'ngTouch'
app.value('user', {
    firstName: '',
    lastName: '',
    email: ''
});

app.value('project', {
	projectId: '',
	projectName: ''
});

app.value('htab', {
	id: '3'
});
//angular.module('galleryApp',[]).
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
	
app.factory('myService' ,function(){
	console.log('tens', 'esr'); 
	var project = {projectId: '5', projectName: 'Naaim'};
	console.log('tens', project);
       return {
		
			getData: function () {
				return project;
			},
			setData: function (newProject) {
			project = newProject;
			},
			resetData: function () {
				project = {};
			}
       };
	   console.log('tens', 'esr'); 
    });

//var GalleryController = function($scope,DataSource, myService) {
//console.log('testenns', 'er'); 
app.controller('GalleryController', ['$scope', 'DataSource', 'myService', 'htab', function($scope, DataSource, myService, htab){
    //var IMAGE_WIDTH = 405;
	//var IMAGE_WIDTH = 66.15;
	var IMAGE_WIDTH = 70.75;
	var PROJECT_COUNT = 3;
    //$scope.IMAGE_LOCATION = "http://rabidgadfly.com/assets/angular/gallery1/";
	$scope.IMAGE_LOCATION = "/img/projects/";
	$scope.IMAGE_INFO_LOCATION = "/img/projects/";
    
	var project = myService.getData();
	
	//$scope.imageToken = 1;
	//$scope.setImageToken = function(value) {
	//console.log('yooo', value);
	//$scope.imageToken = value;
	//console.log('eeeh', $scope.imageToken);
	//};
	
	console.log('testenns', project); 
	//var imageString = "images"+project.projectId+".json";
	//console.log('tes', imageString); 
	
    // Retrieve and set data 
    DataSource.get("images.json",function(data) {
        $scope.galleryData = data;
        $scope.selected = data[0];
    });
	
	$scope.galleryDataArray = [];
	$scope.selectedDataArray = [];
	console.log('kakefjes', $scope.galleryDataArray+'hehe'+PROJECT_COUNT);
	
	
//	for (i = 0; i < PROJECT_COUNT+1; i++) { 
//    console.log('loopy', i+"se her: "+"images"+(i+1)+".json"); 
//	DataSource.get("images"+(i+1)+".json",function(data) {
//	console.log('loop', i); 
//	console.log('loopdat', data); 
//		$scope.galleryDataArray[i]=data;
//		$scope.galleryDataSelectedArray[i]=data[0];
//       //$scope.galleryDatanew = data;
//        //$scope.selectednew = data[0];
//		console.log('fjernsyn'+i, $scope.galleryDataArray);
//		console.log('hesten'+i, $scope.galleryDataSelectedArray);
//		console.log('this'+i, $scope.galleryDataArray[4][0].image);
//   });
//}

	DataSource.get($scope.IMAGE_INFO_LOCATION+1+"/images"+1+".json",function(data) {
			$scope.galleryData1 = data;
			$scope.selectedData = data[0];
			console.log('henry', $scope.selectedData.image+"KAPPACLAPA");
		});
	
	DataSource.get($scope.IMAGE_INFO_LOCATION+2+"/images"+2+".json",function(data) {
			$scope.galleryData2 = data;
			$scope.selectedData2 = data[0];
	});
	
	DataSource.get($scope.IMAGE_INFO_LOCATION+3+"/images"+3+".json",function(data) {
	console.log('HENTER FRA', $scope.IMAGE_INFO_LOCATION+3+"/images"+3+".json");
			$scope.galleryData3 = data;
			$scope.selectedData3 = data[0];
	});
	
	DataSource.get("fordypningImages.json", function(data) {
	
		$scope.galleryDataFordypning = data;
		$scope.selectedFordypning = data[0];
	
	});
    
    // Scroll to appropriate position based on image index and width
    $scope.scrollTo = function(image,ind) {
        $scope.listposition = {left:(IMAGE_WIDTH * ind * -1) + "vw"};
        $scope.selected = image;
		$scope.selectedFordypning = image;
		$scope.selectedData = $scope.selectedData2 = $scope.selectedData3 = image; 
		console.log('newselect', $scope.selectedData2);
		
		
		
    };
	
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
	else if(galleryid==3){
		tempGalleryData = $scope.galleryData3;
		tempSelectedData = $scope.selectedData3;
	}
	console.log('mamma', tempGalleryData);
	
	
	var tempId = 0;
	
	for (i = 0; i < tempGalleryData.length; i++) { 
		console.log('forloop', i);
		if(tempGalleryData[i] == tempSelectedData){
			console.log('SKYTMEG', i);
			tempId = i;
			break;
		}
		else{
			console.log('skyt', i);
		}
	}
	
	console.log('navaction', navAction);
	if(navAction=="next")
	{
		if(i >= tempGalleryData.length-1){
			$scope.scrollTo(tempGalleryData[0],(0));	
		}
		else
		{
			console.log('calling scroll2 with', tempGalleryData[i+1]+""+(i+1));
			$scope.scrollTo(tempGalleryData[i+1],(i+1));	
		}
	
	}
	else if(navAction=="prev")
	{
		if(i == 0){
			$scope.scrollTo(tempGalleryData[tempGalleryData.length-1],tempGalleryData.length-1);	
		}
		else
		{
			console.log('calling scroll2 with', tempGalleryData[i+1]+""+(i+1));
			$scope.scrollTo(tempGalleryData[i-1],(i-1));	
		}
		
	}
	
	
	
		
	}
	// initial image index
	    $scope._Index = 0;
	// show prev image
	    $scope.showPrev = function () {
		console.log('petter', 'smart');
	        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.galleryData2.length - 1;
			console.log('petter', 'smart2');
	    };
	 
	    // show next image
	    $scope.showNext = function () {
		console.log('petter', 'kuk');
	        $scope._Index = ($scope._Index < $scope.galleryData2.length - 1) ? ++$scope._Index : 0;
			console.log('petter', 'kuk2');
	    };


}]);

app.controller('TestCtrl', ['$scope', 'user', function TestCtrl($scope, user) {
console.log('henny1'); 
    user.firstName = 'Dwayne';
    user.lastName = 'Charrington';
    user.email = 'dwayne@ilikekillnerds.com';

    console.log(user); 
    console.log('First name: ', user.firstName); 
    console.log('Last name: ', user.lastName); 
    console.log('Email: ', user.email); 

    // Pass the user values through to the view 
    $scope.user = user;
}]);

app.controller('ProjectCtrl', ['$scope', 'project', function ProjectCtrl($scope, project) {
	console.log('henny2'); 
	console.log('testen', $scope.project); 
	project.projectId = 1;
	project.projectName = 'Master';
	$scope.project = project; 
	console.log('testen', $scope.project); 
	$scope.setProjectId= function(value) {
		console.log('hehe', 'inside');
		project.projectId = value;
		project.projectName = 'newname';
		$scope.project = project; 	
		console.log('testen', $scope.project); 
	};
	}]);

//function MyCtrl(clientId){
//	this.clientId = clientId;
//	this.change = function(value) {
//		clientId.value = 'something else';
//	}
//}

app.controller('CustomHeaderCtrl', ['$scope', 'htab', function CustomHeaderCtrl($scope, htab) {
	$scope.tab = 1;
	htab.id= 1;
	console.log('keke2', htab); 
	this.tab = $scope.tab;
	this.isSet = function(checkTab){
		return $scope.tab === checkTab;
	};
	this.setTab = function(activeTab){
	$scope.tab = activeTab;
	htab.id = activeTab;
	console.log('keke3', htab); 
	this.tab = $scope.tab;
	};
}]);




////
app.directive('customHeader', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'custom-header.html',
		controller: function() {
		this.tab = 1;
		this.isSet = function(checkTab){
		return this.tab === checkTab;
		};
		this.setTab = function(activeTab){
		this.tab = activeTab;
	};
		},
		controllerAs: 'header'
		};
});
////
	
	
app.directive('customHeaderTabs', function(){
return {

	restrict: 'E',
	templateUrl: 'custom-header-tabs.html',
	controller: function() {
		$scope.tab = 1;
		$scope.isSet = function(checkTab){
		return $scope.tab === checkTab;
		};
		$scope.setTab = function(activeTab){
		$scope.tab = activeTab;
	};
	},
	controllerAs: 'headerTabs'
	};
});

app.directive('infoTab', function(){
return {

	restrict: 'E',
	templateUrl: 'info-tab.html'
};
});

app.directive('homeTab', function(){
return {

	restrict: 'E',
	templateUrl: 'home-tab.html'
};
});

app.directive('projectTabs', ['myService', function(myService){
return {

	restrict: 'E',
	templateUrl: 'project-tabs.html',
	controller: function() {
		this.tab = 1;
		this.isSet = function(checkTab){
		return this.tab === checkTab;
		};
		this.setTab = function(activeTab){ //$scope, UserService
		console.log('faen', 'ta');
		this.tab = activeTab;
		//$scope.name = UserService.name;
	};
		
		this.handleClick = function(activeTab){
		this.tab = activeTab;
		console.log('heiaaa', 'hei');
		console.log('reset', 'hei');
		var tempdata = myService.getData();
		
		console.log('tjaa', tempdata);
		var newData = {projectId: '2', projectName: 'Eeek'};
		myService.setData(newData);
		tempdata = myService.getData();
		console.log('aoo', tempdata);
		};
		//this.someDetail = myService.getData();
	},
	controllerAs: 'projectTabs'
	};
}]);
