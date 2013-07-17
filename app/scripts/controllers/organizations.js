'use strict';

angular.module('derbyContactManagerFrontendApp')
  .controller('OrganizationsCtrl', function ($scope, $routeParams, $http) {
    $scope.results = [];
    $scope.organization = {};
    
    $scope.init = function() {    
        $http.jsonp('http://localhost/derby-contact-manager-backend/organizations.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.results = data;
        }).error(function(error) {
            console.log(error);
        });
    };
    
    $scope.viewInit = function() {
        console.log($routeParams);
        $http.jsonp('http://localhost/derby-contact-manager-backend/organizations/view/'+$routeParams.organizationId+'.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.organization = data;
        }).error(function(error) {
            console.log(error);
        });
    }
});
