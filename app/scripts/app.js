'use strict';

angular.module('derbyContactManagerFrontendApp', [])
  .config(function ($routeProvider, $httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/contacts', {
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
      .when('/contacts/edit/:contactId', {
        controller: 'ContactsCtrl',
        templateUrl: 'views/contacts/edit.html'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations/index.html',
        controller: 'OrganizationsCtrl'
      })
      .when('/organizations/add', {
        templateUrl: 'views/organizations/add.html',
        controller: 'OrganizationsCtrl'
      })
      .when('/organizations/edit/:organizationId', {
        controller: 'OrganizationsCtrl',
        templateUrl: 'views/organizations/edit.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  }).run(function ($rootScope, $window) {
        // Load the SDK asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

});