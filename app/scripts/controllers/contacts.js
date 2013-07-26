'use strict';

angular.module('derbyContactManagerFrontendApp')
  .controller('ContactsCtrl', function ($scope, $routeParams, $http) {
    $scope.results = [];
    $scope.contact = {};
    $scope.organizationList = {};
    
    $scope.baseUrl = 'http://derbycontactmanager.dev/contacts';
    $scope.orgBaseUrl = 'http://derbycontactmanager.dev/organizations';
    $scope.roleBaseUrl = 'http://derbycontactmanager.dev/roles';
    $scope.message = '';
    $scope.messageClass = '';
    
    $scope.getContact = function(id, isForm = false) {
        $http.jsonp($scope.baseUrl + '/view/'+id+'.json?callback=JSON_CALLBACK').success(function(data) {
            if (isForm) {
                $scope.contact = data.Contact;
            } else {
                $scope.contact = data;
            }
            
            console.log($scope.contact);
        }).error(function(error) {
            console.log(error);
        });        
    }
    
    $scope.init = function() {    
        $http.jsonp($scope.baseUrl + '.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.results = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });
    };
    
    $scope.viewInit = function() {
        $scope.getContact($routeParams.contactId);
    }
    
    $scope.addInit = function() {
        $http.jsonp($scope.orgBaseUrl + '/indexList.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.organizationList = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });
        
        $http.jsonp($scope.roleBaseUrl + '/indexList.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.roleList = data;
            console.log(data);
        }).error(function(error) {
            console.log(error);
        });          
    }
    
    $scope.editInit = function() {
        $scope.addInit();
        $scope.getContact($routeParams.contactId, true);
    }
    
    $scope.edit = function(contact) {
        $http({
            "method": 'POST',
            "url": $scope.baseUrl + '/edit/'+contact.id+'.json',
            "data": {
                contact: contact
            },
            "headers": {
                "Content-Type": "multipart/form-data"
            }
        }).
        success(function(data, status, headers, config) {
            $scope.message = data.message;
            console.log(data);
            
            if (!data.success) {
                $scope.messageClass = "alert alert-error";
            } else {
                $scope.messageClass = "alert alert-success";
            }
        }).
        error(function(data, status, headers, config) {
            console.log(data);
            $scope.message = "There was an issue saving this contact.";
            $scope.messageClass = "alert alert-error";
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
            console.log(data);
            
            if (!data.success) {
                $scope.messageClass = "alert alert-error";
            } else {
                $scope.messageClass = "alert alert-success";
                $scope.contact = {};
            }
        }).
        error(function(data, status, headers, config) {
            $scope.message = "There was an issue saving this contact.";
            $scope.messageClass = "alert alert-error";
        });
    }
    
    $scope.deleteContact = function (contactId) {
        if (confirm("Are you sure you want to delete this contact?")) {
            $http({
                "method": 'DELETE',
                "url": $scope.baseUrl + '/delete/'+contactId+'.json',
                
            }).
            success(function(data, status, headers, config) {
                $scope.init();
            }).
            error(function(data, status, headers, config) {
    
            });
        }
    };    
});
