(function() {
	var app = angular.module('requestManager', ['ui.router']);
	
	app.service('userService', function($http) {
		var baseUrl = '/user/';
		this.getUsers = function() {
			  return $http.get(baseUrl);
		 };
		 this.getUser = function(id) {
			  return $http.get( baseUrl + id);
		 };
		this.modifyUser = function(user) {
			return $http.put(baseUrl + user.id, user);
		};
		this.createUser = function(user) {
			return $http.post(baseUrl, user);
		};
        this.deleteUser = function(userID) {
            return $http.delete(baseUrl + userID);
        };
	});

})();
