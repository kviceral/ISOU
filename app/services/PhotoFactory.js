(function() {
    var PhotoFactory = function($http) {
        var API_KEY = "a5e95177da353f58113fd60296e1d250";
        var USER_ID = "132365033@N08";
        var BASE_URL = "https://api.flickr.com/services/rest/";
        var GET_PUBLIC_PHOTOS_METHOD = "flickr.people.getPublicPhotos";
        var GET_PHOTO_INFO_METHOD = "flickr.photos.getInfo";
        var GET_PHOTO_FAVORITES = "flickr.photos.getFavorites";
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
        factory.getPhotoDetails = function(id, secret) {
            return $http.get(BASE_URL, {
                params: { 
                        method: GET_PHOTO_INFO_METHOD,
                        api_key: API_KEY,
                        photo_id: id,
                        secret: secret,
                        format: FORMAT,
                        nojsoncallback: NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoFavorites = function(id) {
            return $http.get(BASE_URL, {
                params: { 
                        method: GET_PHOTO_FAVORITES,
                        api_key: API_KEY,
                        photo_id: id,
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