'use strict';

angular.module('derbyContactManagerFrontendApp')
  .controller('ContactsCtrl', function ($scope, $http) {
    $scope.results = [];
    $scope.init = function() {    
        console.log("here");
        console.log("2");
        $http.jsonp('http://localhost/derby-contact-manager-backend/contacts.json?callback=JSON_CALLBACK').success(function(data) {
            $scope.results = data;
        }).error(function(error) {
            console.log(error);
        });
    };
});
