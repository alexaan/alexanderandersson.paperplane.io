(function(){
	var app = angular.module('store-products', [ ]);
	
	app.directive('productTitle', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'product-title.html'
	};
	});
	
	app.directive('productDescription', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'product-description.html'
	};
	});
	
	app.directive('productTabs', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'product-tabs.html',
		controller: function() {
			this.tab = 1;
			this.isSet = function(checkTab){
			return this.tab === checkTab;
			};
			this.setTab = function(activeTab){
			this.tab = activeTab;
		};
		},
		controllerAs: 'tab'
		};
	});
	
	app.directive('pictureGallery', function(){
	return {
	
		restrict: 'E',
		templateUrl: 'picture-gallery.html',
		controller: function() {
			this.current = 0;
			this.setCurrent = function(newGallery){
			this.current = newGallery || 0;
			};
		},
		controllerAs: 'gallery'
		};
	});
	
})();