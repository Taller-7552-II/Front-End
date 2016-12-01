'use strict';

/**
 * @ngdoc overview
 * @name Jobify
 * @description Jobify de chile
 * 
 * Main module of the application.
 */

var app = angular.module('jobifyApp', [ 'ui.bootstrap', 'angular.filter',
		'ngMessages', 'ngRoute', 'ngCookies', 'infinite-scroll',
		'jobifyApp.services', 'jobifyApp.controllers',
		'jobifyApp.directives' ]);

app
		.config(function($routeProvider, $locationProvider, $httpProvider) {
			
	
		    var $http,
			interceptor = ['$q', '$injector', function ($q, $injector) {

			    function success(response) {
				return response;
			    }

			    function error(response) {
				if (response.status === 404 && response.config.url.indexOf(".html")) {

				    // get $http via $injector because of circular dependency problem
				    $http = $http || $injector.get('$http');

				    var defer = $q.defer();
				    $http.get('404.html')
					.then(function (result) {
					    response.status = 200;
					    response.data = result.data;
					    defer.resolve(response);
					}, function () {
					    defer.reject(response);
					});

				    return defer.promise;// response;
				} else {
				    return $q.reject(response);
				}
			    }

			    return function (promise) {
				return promise.then(success, error);
			    }
			}];

		    $httpProvider.responseInterceptors.push(interceptor);
	
	
			$routeProvider.when('/login', {
				templateUrl : 'partials/login.html',
				controller : 'LoginController'
			});
		
			$routeProvider.when('/trabajos', {
				templateUrl : 'partials/trabajos.html',
				controller : 'TrabajosController'
			});

			$routeProvider.when('/skills', {
				templateUrl : 'partials/skills.html',
				controller : 'SkillsController'
			});

			$routeProvider.when('/categorias', {
				templateUrl : 'partials/categorias.html',
				controller : 'CategoriasController'
			});
			
			$routeProvider.otherwise({
				redirectTo : '/trabajos'
			});
			
			$httpProvider.interceptors
					.push(function($q, $rootScope, $location, $timeout) {
						return {
							'responseError' : function(rejection) {
								var status = rejection.status;
								var config = rejection.config;
								var method = config.method;
								var url = config.url;

								if ($rootScope.success != null) {
									$rootScope.success = null;
								}

								if ($rootScope.error != null) {
									$rootScope.error = null;
								}

								if (status == 401) {
									$location.path("/login");
									$timeout(function() {
										$rootScope.error = "Ha ingresado un Usuario o ContraseÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±a incorrecto.";
									});
								} else {
									var generalError = method + " on " + url
											+ " failed with status " + status;
									console.log(generalError);

									if (error == 1) {
										$timeout(function() {
											$rootScope.error = generalError;
										});
									} else {
										$timeout(function() {
											$rootScope.error = error;
										});

									}
								}

								return $q.reject(rejection);
							}
						};
					});
			
			$httpProvider.interceptors
					.push(function($q, $rootScope, $location) {
						return {
							'request' : function(config) {
//									var authToken = $rootScope.authToken;
//									
//									//TODO: Revisar
//									if (jobifyAppConfig.useAuthTokenHeader) {
//										config.headers['X-Auth-Token'] = authToken;
//									} else {
//										config.url = config.url + "?token="
//												+ authToken;
//									}
//								
								return config || $q.when(config);
							}
						};
					});
		});

app.run(function($rootScope, $location, $cookieStore, $timeout) {
	
	/* Reset error when a new view is loaded */
	$rootScope.$on('$viewContentLoaded', function() {
		delete $rootScope.success;
		delete $rootScope.error;
	});

	$rootScope.isActive = function(viewLocation) {
		return ($location.path().indexOf(viewLocation) > -1);
	};

	$rootScope.go = function(path) {
		$location.path(path);
	};

	$rootScope.logout = function() {
		delete $rootScope.user;
	};

	var user = $rootScope.user;
	
    if (user === undefined) {
    	 $location.path("/login"); 
    }


	$rootScope.initialized = true;
});

// Modulo controllers
angular.module('jobifyApp.controllers', []);
