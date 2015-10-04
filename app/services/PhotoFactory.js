(function() {
    var PhotoFactory = function($http) {
        var API_KEY = "a5e95177da353f58113fd60296e1d250";
        var USER_ID = "132365033@N08";
        var BASE_URL = "https://api.flickr.com/services/rest/";
        var GET_PUBLIC_PHOTOS_METHOD = "flickr.people.getPublicPhotos";
        var FORMAT = "json";
        var NO_JSON_CALLBACK = 1;
        
        var factory = {};

        factory.getPhotos = function() {
            return $http.get(BASE_URL, {
                params: { 
                        method: GET_PUBLIC_PHOTOS_METHOD,
                        api_key: API_KEY,
                        user_id: USER_ID,
                        format: FORMAT,
                        nojsoncallback: NO_JSON_CALLBACK 
                    }
            });
        };

        return factory;
    };

    PhotoFactory.$inject = ['$http'];
    angular.module('ISOUApp').factory('PhotoFactory', PhotoFactory);
}());