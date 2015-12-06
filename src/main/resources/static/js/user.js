(function () {

    var app = angular.module('user', []);

    app.directive('userRoles', function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.roles = [{"authority": "ROLE_ADMIN"}, {"authority": "ROLE_CUSTOMER"}, {"authority": "ROLE_TECHNICIAN"}];
                scope.selected = {};
                scope.userRoles = [];
                scope.roleChange = function (role) {
                    var index = ngModel.$modelValue.map(function (d) {
                        return d['authority'];
                    }).indexOf(role.authority);
                    if (scope.selected[role.authority]) {
                        if (index = -1) {
                            ngModel.$modelValue.push(role);
                        }
                    } else {
                        if (index > -1) {
                            ngModel.$modelValue.splice(index, 1);
                        }
                    }
                }
                function revalidate(_val) {
                    if (!angular.isUndefined(ngModel.$modelValue) && angular.isArray(ngModel.$modelValue)) {
                        for (var i = 0; i < scope.roles.length; i++) {
                            var role = scope.roles[i];
                            var index = ngModel.$modelValue.map(function (d) {
                                return d['authority'];
                            }).indexOf(role.authority);
                            if (index > -1) {
                                scope.selected[role.authority] = true;
                            }
                        }
                    }
                    return _val;
                }

                ngModel.$formatters.unshift(revalidate);
                ngModel.$parsers.unshift(revalidate);
            },
            templateUrl: '/templates/user-roles.html'
        };
    });
})();