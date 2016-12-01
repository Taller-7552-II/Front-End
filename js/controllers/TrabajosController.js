'use strict';
var app = angular.module('jobifyApp.controllers');

app.controller(
				'TrabajosController',
				[
						'$scope',
						'$rootScope',
						'TrabajosService',
						function($scope, $rootScope, TrabajosService) {

							$scope.trabajos = [];

							$scope.fetchAllTrabajos = function() {
								TrabajosService
										.getJobPositions()
										.then(
												function(d) {
													$scope.trabajos = d;
												},
												function(errResponse) {
													console
															.error('Error obteniendo trabajos');
												});
							};
							
							$scope.fetchTrabajosByCategory = function() {
								var category = $scope.queryResultados;
									
								if (category != "") {
								
									TrabajosService
											.getJobPositionByCategory(category)
											.then(
													function(d) {
														$scope.trabajos = d;
													},
													function(errResponse) {
														console
																.error('Error obteniendo trabajos por categoria');
													});
								} else {
									$scope.fetchAllTrabajos();
								}
							};
							
							$scope.reload = function() {
								
							};



							$scope.fetchAllTrabajos();

						} ]);