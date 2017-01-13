require.config({
    baseUrl: "scripts/",
    paths: {
        jquery: "thirdparty/jquery.min",
        angular: "thirdparty/angular.min",
        angularAnimate: "thirdparty/angular-animate.min",
        angularResource: "thirdparty/angular-resource.min",
        uiRoute: "thirdparty/angular-ui-router.min",
        bootstrap: "thirdparty/bootstrap.min",
        //uiBootstrapTpls: "thirdparty/ui-bootstrap-tpls.min"
        // dxAll: "thirdparty/dx.all",
        // globalize: "thirdparty/globalize",
        // globalizeCultures: "thirdparty/cultures/globalize.cultures",
        // sanitize: "thirdparty/angular-sanitize.min"
        uiBootstrapTpls: "thirdparty/ui-bootstrap-tpls.min",
        uiGrid: "thirdparty/ui-grid.min",
        lodash: "thirdparty/lodash",
        ngStorage: "thirdparty/ngStorage.min",
        ActivityMonitor: "thirdparty/activity-monitor.min",
        uiSelect: "thirdparty/select.min"
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'uiRoute': {
            deps: ['angular'],
            exports: 'uiRoute'
        },
        'angularAnimate': {
            deps: ['angular'],
            exports: 'angularAnimate'
        },
        'angularResource': {
            deps: ['angular'],
            exports: 'angularResource'
        },
        'bootstrap': {
            deps: ['angular'],
            exports: 'bootstrap'
        },
        'uiBootstrapTpls': {
            deps: ['angular'],
            exports: 'uiBootstrapTpls'
        },
        'uiGrid': {
            deps: ['angular'],
            exports: 'uiGrid'
        },
        'uiSelect': {
            deps: ['angular'],
            exports: 'uiSelect'
        },
        'lodash': {
            exports: 'lodash'
        }
    }
});

require(["main"], function () {
    angular.bootstrap(document, ['webapp']);
});