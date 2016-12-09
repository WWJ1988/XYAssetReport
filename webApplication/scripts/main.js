define(["angular", "angularAnimate","uiRoute", 'bootstrap', "uiBootstrapTpls"], function () {
		
    var mainModule = angular.module("webapp", ['ui.router', 'ngAnimate', 'ui.bootstrap']);

	mainModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('data', {
				url:'/',
				templateUrl: '../views/templates/data.html',
				controller: 'dataController as dataCtrl'
			})
			.state('detail', {
				url:'/detail',
				templateUrl: '../views/templates/detail.html',
				controller: 'detailController as detailCtrl'
			})
			.state('report',{
				url: '/report',
				templateUrl: '../views/templates/report.html',
				controller: 'reportController as reportCtrl'
			})
	}]);
	
    mainModule.controller("mainCtr", ["$scope", function ($scope) {
        var vm = this;

        vm.title = "Hello World!!!";
        vm.name = "hello";
    }]);
	
	mainModule.controller("detailController", ["$scope", function ($scope) {
	}]);

	mainModule.controller('dataController', function ($scope) {
		var vm = this;
    });
	
	mainModule.controller('reportController', function ($scope) {
		var vm = this;
    });
	
	mainModule.directive("preventDefaultAction",function(){
		return {
			restrict:"A",
			link:function(scope, element, attrs){
				element.on("click", function(event){
					event.preventDefault();
				});
			}
		};
	});
    return mainModule;
});