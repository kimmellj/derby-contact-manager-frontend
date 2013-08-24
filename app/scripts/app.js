'use strict';

var globalRouterProvider;

angular.module('derbyContactManagerFrontendApp', [])
  .config(function ($routeProvider, $httpProvider) {

    globalRouterProvider = $routeProvider;
    
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];



  }).run(function ($rootScope, $window, $route, $location, LoginService) {
        // Load the SDK asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

        async.series([
            function(callback){
                $window.fbAsyncInit = function() {
                    FB.init({
                        appId      : '219072834918247', // App ID
                        channelUrl : '//localhost:9000/channel.html', // Channel File
                        status     : true, // check login status
                        cookie     : true, // enable cookies to allow the server to access the session
                        xfbml      : true  // parse XFBML
                    });

                    console.log("fb");

                    FB.Event.subscribe('auth.authResponseChange', function(response) {
                        if (response.status === 'connected') {
                            LoginService.login(callback);
                        } else if (response.status === 'not_authorized') {
                            FB.login();
                        } else {
                            FB.login();
                        }
                    });
                }
            },
            function(callback){
                globalRouterProvider
                    .when('/', {
                        templateUrl: 'views/contacts/index.html',
                        controller: 'ContactsCtrl'
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

                    if (!LoginService.user.local_user) {
                        $location.path("/contacts/add");
                    } else {
                        $location.path("/");
                    }

                    $route.reload();
                    callback(null, 'two');
            }
        ],
            function(err, results){
                console.log(results);
            });

});