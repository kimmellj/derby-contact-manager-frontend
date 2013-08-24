'use strict';

angular.module('derbyContactManagerFrontendApp')
    .controller('LoginCtrl', function ($scope, $window, $http, $location, $rootScope ) {

        $scope.init = function() {
            if (typeof FB === 'undefined') {
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
                            console.log("1");
                            $scope.login();
                        } else if (response.status === 'not_authorized') {
                            console.log("2");
                            FB.login();
                        } else {
                            console.log("3");
                            FB.login();
                        }
                    });
                };
            } else {
                FB.init({
                    appId      : '219072834918247', // App ID
                    channelUrl : '//localhost:9000/channel.html', // Channel File
                    status     : true, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : true  // parse XFBML
                });
                FB.login();
            }
        };

        $scope.login = function() {
            FB.api('/me', function(response) {
                $rootScope.user = response;

                $http.jsonp('http://derbycontactmanager.dev/contacts/user_exists/'+response.id+'.json?callback=JSON_CALLBACK').success(function(data) {
                    if (!data.Contact) {
                        $rootScope.user.local_user = false;
                        $location.path("/contacts/add");
                        return;
                    } else {
                        $rootScope.user.local_user = true;
                        $location.path("/contacts");
                        return;
                    }
                });
            });
        };
    });