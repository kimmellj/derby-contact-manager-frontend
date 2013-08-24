'use strict';

angular.module('derbyContactManagerFrontendApp')
    .factory('LoginService', function ($http, $location) {
    var loginService = {
        user: {},
        loginComplete: false,
        login: function(callback) {
            FB.api('/me', function(response) {
                loginService.user = response;

                $http.jsonp('http://derbycontact.com/contacts/user_exists/'+response.id+'.json?callback=JSON_CALLBACK').success(function(data) {
                    console.log(data);
                    if (!data.Contact) {
                        loginService.user.local_user = false;
                    } else {
                        loginService.user.local_user_id = data.Contact.id;
                        loginService.user.local_user = true;
                    }

                    loginService.loginComplete = true;
                    console.log("Logged");
                    callback(null, "Logged In");

                });
            });
        }
    };

    return loginService;
});