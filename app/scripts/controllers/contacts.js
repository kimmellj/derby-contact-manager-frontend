'use strict';

angular.module('derbyContactManagerFrontendApp')
  .controller('ContactsCtrl', function ($scope, $routeParams, $http) {
    $scope.results = [];
    $scope.contact = {};
    $scope.organizationList = {};
    
    $scope.baseUrl = 'http://derbycontactmanager.dev/contacts';
    $scope.orgBaseUrl = 'http://derbycontactmanager.dev/organizations';
    $scope.message = '';
    $scope.messageClass = '';
    
    $scope.init = function() {    
        $http.jsonp($scope.baseUrl + '.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.results = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });
    };
    
    $scope.viewInit = function() {
        $http.jsonp($scope.baseUrl + '/view/'+$routeParams.contactId+'.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.contact = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });
    }
    
    $scope.addInit = function() {
        $http.jsonp($scope.orgBaseUrl + '/indexList.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.organizationList = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });        
    }
    
    $scope.add = function(contact) {
        $http({
            "method": 'POST',
            "url": $scope.baseUrl + '/add.json',
            "data": {
                contact: contact
            },
            "headers": {
                "Content-Type": "multipart/form-data"
            }
        }).
        success(function(data, status, headers, config) {
            $scope.message = data.message;
            if (!data.success) {
                $scope.messageClass = "alert alert-error";
            } else {
                $scope.messageClass = "alert alert-success";
                $scope.contact = {};
            }
        }).
        error(function(data, status, headers, config) {
            $scope.message = "There was an issue saving this contact.";
            $scope.messageClass = "alert alert-success";
        });
    }
    
    /**
     * @todo confirmation needed
     */
    $scope.deleteContact = function (contactId) {
        $http({
            "method": 'DELETE',
            "url": $scope.baseUrl + '/delete/'+contactId+'.json',
            
        }).
        success(function(data, status, headers, config) {
            $scope.init();
        }).
        error(function(data, status, headers, config) {

        });       
    };    
});
