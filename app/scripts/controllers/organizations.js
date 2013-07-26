'use strict';

angular.module('derbyContactManagerFrontendApp')
    .controller('OrganizationsCtrl', function ($scope, $routeParams, $http) {
        $scope.results = [];
        $scope.organization = {};
        $scope.baseUrl = 'http://derbycontactmanager.dev/organizations';
        $scope.message = '';
        $scope.messageClass = '';
        
        $scope.getOrganization = function(id, isForm = false) {
            $http.jsonp($scope.baseUrl + '/view/'+id+'.json?callback=JSON_CALLBACK').success(function(data) {
                if (isForm) {
                    $scope.organization = data.Organization;
                } else {
                    $scope.organization = data;
                }
            }).error(function(error) {
            });        
        }        

        $scope.init = function () {
            $http.jsonp($scope.baseUrl + '.json?callback=JSON_CALLBACK').success(function (data) {
                $scope.results = data;
            }).error(function (error) {
            });
        };

        $scope.viewInit = function () {
            $http.jsonp($scope.baseUrl + '/view/' + $routeParams.organizationId + '.json?callback=JSON_CALLBACK').success(function (data) {
                $scope.organization = data;
            }).error(function (error) {
            });
        }
        
        $scope.editInit = function() {
            $scope.getOrganization($routeParams.organizationId, true);
        }
        
        $scope.edit = function(organization) {
            $http({
                "method": 'POST',
                "url": $scope.baseUrl + '/edit/'+organization.id+'.json',
                "data": {
                    organization: organization
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
                }
            }).
            error(function(data, status, headers, config) {
                $scope.message = "There was an issue saving this organization.";
                $scope.messageClass = "alert alert-error";
            });
        }           

        $scope.add = function (organization) {
            $http({
                "method": 'POST',
                "url": $scope.baseUrl + '/add.json',
                "data": {
                    organization: organization
                },
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            }).
            success(function (data, status, headers, config) {
                $scope.message = data.message;

                if (!data.success) {
                    $scope.messageClass = "alert alert-error";
                } else {
                    $scope.messageClass = "alert alert-success";
                    $scope.contact = {};
                }
            }).
            error(function (data, status, headers, config) {
                $scope.message = "There was an issue saving this organization.";
                $scope.messageClass = "alert alert-error";
            });
        }

        $scope.deleteOrganization = function (id) {
            if (confirm("Are you sure you want to delete this organization?")) {
                $http({
                    "method": 'DELETE',
                    "url": $scope.baseUrl + '/delete/' + id + '.json',

                }).
                success(function (data, status, headers, config) {
                    $scope.init();
                }).
                error(function (data, status, headers, config) {

                });
            }
        };
    });