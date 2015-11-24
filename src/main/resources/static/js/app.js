(function() {

    var app = angular.module('requestManager', ['ui.router']);

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
                        } else {
                            $rootScope.authenticated = false;
                        }
                        callback && callback($rootScope.authenticated);
                    }).error(function() {
                        $rootScope.authenticated = false;
                        callback && callback(false);
                    });

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

    app.config(function($stateProvider, $urlRouterProvider,  $httpProvider) {

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        //$urlRouterProvider.otherwise("usersList");

        $stateProvider
            .state('userList', {
                url: "/userList",
                templateUrl: "user-list.html",
                controller :  function(userService) {
                    var userController = this;
                    this.users = [];
                    userService.getUsers().then(function (response) {
                        userController.users = response.data._embedded.user;
                    });
                } ,
                controllerAs : 'usersCtrl'
            })

            .state('userCreate', {
                url: "/userCreate",
                templateUrl: "user-create.html",
                controller :  function(userService) {
                    this.user = {};
                    this.user.authorities =[];
                    this.createInfo = '';
                    var createUserCtrl = this;
                    this.createUser =  function() {
                        userService.createUser(this.user).then(function(response) {
                            createUserCtrl.createInfo = 'User #' + response.data.id + ' created!';
                            createUserCtrl.user = {};
                            createUserCtrl.user.authorities =[];
                        });
                    };
                },
                controllerAs : 'createUserCtrl'
            })

            .state('userModify', {
                url: "/userModify/:id",
                templateUrl: "user-modify.html",
                controller: function ($stateParams, userService) {
                    this.user = {};
                    this.modifyInfo = '';
                    var modifyUserCtrl = this;
                    this.idUpdated = function () {
                        userService.getUser(this.user.id).then(function (response) {
                            if (response.data != "") {
                                modifyUserCtrl.user = response.data;
                                modifyUserCtrl.modifyInfo = '';
                            } else {
                                modifyUserCtrl.modifyInfo = 'User #' + modifyUserCtrl.user.id + ' not found!';
                            };
                        });
                    };
                    this.modifyUser = function () {
                        userService.modifyUser(this.user).then(function (response) {
                            modifyUserCtrl.modifyInfo = 'User #' + response.data.id + ' Modified!';
                            modifyUserCtrl.user = {};
                        });
                    };
                    if($stateParams.id != ''){
                        this.user.id = $stateParams.id;
                        modifyUserCtrl.idUpdated();
                    };
                },
                controllerAs: 'modifyUserCtrl'
            });
    });

    app.directive('userRoles', function() {
        return {
            restrict : 'E',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                console.log(ngModel.$viewValue);
                console.log(ngModel);
                scope.roles = [ {"authority":"ADMIN"}, {"authority":"CUSTOMER"}, {"authority":"TECHNICIAN"} ];
                scope.selected = {};
                scope.userRoles = [];
                scope.forceArray = function(){
                    if(angular.isUndefined(ngModel.$modelValue) || !angular.isArray(ngModel.$modelValue) ){
                        console.log('force array');
                        ngModel.$modelValue = [];
                    }
                }
                scope.roleChange = function(role){
                    console.log(role + ' updated');
                    scope.forceArray();
                    var index = ngModel.$modelValue.indexOf(role);
                    if(scope.selected[role.authority]){
                        if(index = -1){
                            ngModel.$modelValue.push(role);
                        }
                    }else{
                        if(index > -1){
                            ngModel.$modelValue.splice(index, 1);
                        }
                    }
                }
                scope.forceArray();
                for (var i = 0; i < scope.roles.length; i++) {
                    var role = scope.roles[i];
                    if(ngModel.$modelValue.indexOf(role) > -1){
                        scope.selected[role.authority] = true;
                    }
                }
             },
            templateUrl : 'user-roles.html'
        };
    });

})();