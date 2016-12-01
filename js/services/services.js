'use strict';
var services = angular.module('jobifyApp.services', []);
var url = 'https://jobify-professional.herokuapp.com/';

services.factory('TrabajosService', ['$http', '$q', function($http, $q){

	return {

		getJobPositions: function() {
			return $http.get(url+'job_positions/')
				.then(
					function(response){
						return response.data.job_positions;
					},
					function(errResponse){
						console.error('Error al obtener job positions');
						return $q.reject(errResponse);
					}
				);
		},

		getJobPositionByCategory: function(category) {
			return $http.get(url+'job_positions/categories/'+category)
				.then(
					function(response){
						return response.data.job_positions;
					},
					function(errResponse){
						console.error('Error al obtener job positions de categoria ' + category);
						return $q.reject(errResponse);
					}
				);
		},

		createJobPosition: function(category, data){
			return $http.post(url+'job_positions/categories/'+category, data)
				.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error al crear job position de categoria '+category);
						return $q.reject(errResponse);
					}
				);
		},

		updateJobPosition: function(name,category,dataObject){			
			var data =JSON.stringify(dataObject);
			
			data = '{"job_position": '+data+'}';
			
			return $http.put(url+'job_positions/categories/'+category+'/'+name, data)
				.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error al actualizar job position');
						return $q.reject(errResponse);
					}
				);
		},

		deleteJobPosition: function(developer,category){
			return $http.delete(url+'/job_positions/categories/'+category+'/'+developer)
				.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error al eliminar job position con categoria '+category + ' y developer '+ developer);
						return $q.reject(errResponse);
					}
				);
		}

	};

}]);

services.factory('LoginService', ['$http', '$q', function($http, $q){

	return {

		authenticate: function(username,password) {
			if ( username == 'admin' && password == 'admin') {
//				$http.defaults.headers.common['Access-Control-Request-Method'] = '*';
//				$http.defaults.headers.common['Access-Control-Request-Headers'] = '*';
				return 'OK';
			} else {
				console.error('Error al querer autenticar con user '+ username + ' y password '+password );
				return $q.reject("Usuario o contraseÃ±a invalido");
			}
		}
	};

}]);