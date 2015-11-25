(function() {

   var app = angular.module('login', []);
   app.config(function($stateProvider, $urlRouterProvider,  $httpProvider) {
       $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   });

    app.directive('loginForm', function() {
        return {
            restrict : 'E',
            templateUrl : 'login.html',
            controller: function($rootScope, $scope, $http) {

                var authenticate = function(credentials, callback) {

                    var headers = credentials ? {
                        authorization : "Basic "
                        + btoa(credentials.username + ":"
                            + credentials.password)
                    } : {};

                    $http.get('logged', {
                        headers : headers
                    }).success(function(data) {
                        if (data.name) {
                            $rootScope.authenticated = true;
                            $scope.username = data.name;
                            $scope.getRoles();
                        } else {
                            $rootScope.authenticated = false;
                        }
                        callback && callback($rootScope.authenticated);
                    }).error(function() {
                        $rootScope.authenticated = false;
                        callback && callback(false);
                    });

                }

                $scope.getRoles = function(){
                    $http.get('roles').success(function(data) {
                        $rootScope.roles = data;
                        $scope.roleAdmin =  $scope.isRole('ROLE_ADMIN');
                        $scope.roleCustomer =  $scope.isRole('ROLE_CUSTOMER');
                        $scope.roleTechnician =  $scope.isRole('ROLE_TECHNICIAN');
                    }).error(function() {
                        $rootScope.roles = [];
                    });
                }

                $scope.isRole = function(role){
                    var index =  $rootScope.roles.map(function (d) {
                            return d['authority'];
                        }).indexOf(role);
                    return index > -1;
                }

                authenticate();

                $scope.credentials = {};
                $scope.login = function() {
                    authenticate($scope.credentials, function(authenticated) {
                        if (authenticated) {
                            console.log("Login succeeded")
                            $scope.error = false;
                            $rootScope.authenticated = true;
                        } else {
                            console.log("Login failed")
                            $scope.error = true;
                            $rootScope.authenticated = false;
                        }
                    })
                };

                $scope.logout = function() {
                    $http.post('logout', {}).success(function() {
                        $rootScope.authenticated = false;
                    }).error(function(data) {
                        $rootScope.authenticated = false;
                    });
                }

            },
            controllerAs : 'loginCtl'
        };

    });
})();