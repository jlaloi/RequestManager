(function() {

    var app = angular.module('requestManager', ['ui.router','login','user']);

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

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('userList', {
                url: "/userList",
                templateUrl: "/templates/user-list.html",
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
                templateUrl: "/templates/user-create.html",
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
                templateUrl: "/templates/user-modify.html",
                controller: function ($stateParams, userService) {
                    this.user = {};
                    this.modifyInfo = '';
                    var modifyUserCtrl = this;
                    this.idUpdated = function () {
                        userService.getUser(this.user.id).then(function (response) {
                            if (response.data != "") {
                                modifyUserCtrl.user = response.data;
                                modifyUserCtrl.user.password = '';
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

})();