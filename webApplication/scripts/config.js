require.config({
    baseUrl: "scripts/",
    paths: {
        jquery: "thirdparty/jquery.min",
        angular: "thirdparty/angular.min",
		angularAnimate: "thirdparty/angular-animate.min",
        uiRoute: "thirdparty/angular-ui-router.min",
        bootstrap: "thirdparty/bootstrap.min",
		//uiBootstrapTpls: "thirdparty/ui-bootstrap-tpls.min"
		// dxAll: "thirdparty/dx.all",
		// globalize: "thirdparty/globalize",
		// globalizeCultures: "thirdparty/cultures/globalize.cultures",
		// sanitize: "thirdparty/angular-sanitize.min"
        uiBootstrapTpls: "thirdparty/ui-bootstrap-tpls.min",
        uiGrid: "thirdparty/ui-grid.min"
    },
    shim: {
        'angular': {
			deps:['jquery'],
            exports: 'angular'
        },
        'uiRoute': {
            deps: ['angular'],
            exports: 'uiRoute'
        },
		'angularAnimate':{
			deps: ['angular'],
			exports: 'angularAnimate'
		},
		'bootstrap':{
			deps: ['angular'],
			exports: 'bootstrap'
		},
		// 'sanitize':{
			// deps:['angular'],
			// exports:'sanitize'
		// },
		// 'dxAll':{
			// deps:['jquery','angular','sanitize', 'globalize', 'globalizeCultures'],
			// exports: 'dxAll'
		// }
        'uiBootstrapTpls': {
            deps: ['angular'],
            exports: 'uiBootstrapTpls'
        },
        'uiGrid': {
            deps: ['angular'],
            exports: 'uiGrid'
        }
    }
});

require(["main"], function () {
    angular.bootstrap(document, ['webapp']);
});