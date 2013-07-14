'use strict';

angular.module('derbyContactManagerFrontendApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/contacts/index.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
