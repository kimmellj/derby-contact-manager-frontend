'use strict';

angular.module('derbyContactManagerFrontendApp')
  .controller('ContactsCtrl', function ($scope, $routeParams, $http) {
    $scope.results = [];
    $scope.contact = {};
    $scope.organizationList = {};
    
    $scope.init = function() {    
        $http.jsonp('http://localhost/derby-contact-manager-backend/contacts.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.results = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });
    };
    
    $scope.viewInit = function() {
        $http.jsonp('http://localhost/derby-contact-manager-backend/contacts/view/'+$routeParams.contactId+'.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.contact = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });
    }
    
    $scope.addInit = function() {
        $http.jsonp('http://localhost/derby-contact-manager-backend/organizations/indexList.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.organizationList = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });        
    }
    
    $scope.add = function(contact) {
        $http({method: 'POST', url: 'http://localhost/derby-contact-manager-backend/contacts/add.json'}).
        success(function(data, status, headers, config) {
            console.log(data);
        }).
        error(function(data, status, headers, config) {
            console.log(headers);
            console.log(data);
        });
    }
});
