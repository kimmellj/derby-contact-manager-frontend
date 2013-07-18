'use strict';

angular.module('derbyContactManagerFrontendApp', [])
  .config(function ($routeProvider, $httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];    
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/contacts/index.html',
        controller: 'ContactsCtrl'
      })
      .when('/contacts/add', {
        templateUrl: 'views/contacts/add.html',
        controller: 'ContactsCtrl'
      })      
      .when('/contacts/view/:contactId', {
        controller: 'ContactsCtrl',
        templateUrl: 'views/contacts/view.html'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations/index.html',
        controller: 'OrganizationsCtrl'
      })      
      .otherwise({
        redirectTo: '/'
      });
  });
