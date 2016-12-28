define(function (require, factory) {
    'use strict';
    var interceptorService = ['$q', '$localStorage', '$injector', function ($q, $localStorage, $injector) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401) {
                    $injector.get('$state').transitionTo('login');
                }
                return $q.reject(response);
            }
        };
    }];

    return interceptorService;
});