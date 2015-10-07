/*
    Interface to FlickerAPI. Uses Angular Constants (angular.config)
*/
(function() {
    var PhotoFactory = function($http, API, API_METHODS) {
        
        var factory = {};

        factory.getPhotos = function() {
            return $http.get(API.BASE_URL, {
                params: { 
                        method: API_METHODS.GET_PUBLIC_PHOTOS,
                        api_key: API.KEY,
                        user_id: API.USER_ID,
                        format: API.FORMAT,
                        nojsoncallback: API.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoDetails = function(id, secret) {
            return $http.get(API.BASE_URL, {
                params: { 
                        method: API_METHODS.GET_PHOTO_INFO,
                        api_key: API.KEY,
                        photo_id: id,
                        secret: secret,
                        format: API.FORMAT,
                        nojsoncallback: API.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoFavorites = function(id) {
            return $http.get(API.BASE_URL, {
                params: { 
                        method: API_METHODS.GET_PHOTO_FAVORITES,
                        api_key: API.KEY,
                        photo_id: id,
                        format: API.FORMAT,
                        nojsoncallback: API.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoSizes = function(id) {
            return $http.get(API.BASE_URL, {
                params: { 
                        method: API_METHODS.GET_PHOTO_SIZES,
                        api_key: API.KEY,
                        photo_id: id,
                        format: API.FORMAT,
                        nojsoncallback: API.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.searchPhoto = function(text) {
            return $http.get(API.BASE_URL, {
                params: { 
                        method: API_METHODS.GET_PHOTO_SIZES,
                        api_key: API.KEY,
                        user_id: API.USER_ID,
                        text: text,
                        format: API.FORMAT,
                        nojsoncallback: API.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.addComment = function(id, comment) {
            return $http.get(API.BASE_URL, {
                params: { 
                        method: API_METHODS.ADD_COMMENTS,
                        api_key: API.KEY,
                        photo_id: id,
                        comment_text: comment,
                        format: API.FORMAT,
                        nojsoncallback: API.NO_JSON_CALLBACK 
                    }
            });
        };

        return factory;
    };

    PhotoFactory.$inject = ['$http', 'API', 'API_METHODS'];
    angular.module('ISOUApp').factory('PhotoFactory', PhotoFactory);
}());
