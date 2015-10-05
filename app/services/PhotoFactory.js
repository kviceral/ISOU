(function() {
    var PhotoFactory = function($http) {
        
        //Todo: Refactor to use Angular Constants
        var API_CONSTANTS = {
            API_KEY : "a5e95177da353f58113fd60296e1d250",
            USER_ID : "132365033@N08",
            BASE_URL : "https://api.flickr.com/services/rest/",
            FORMAT: "json",
            NO_JSON_CALLBACK: 1,
            METHODS : {
                GET_PUBLIC_PHOTOS : "flickr.people.getPublicPhotos",
                GET_PHOTO_INFO: "flickr.photos.getInfo",
                GET_PHOTO_FAVORITES: "flickr.photos.getFavorites",
                GET_PHOTO_SIZES: "flickr.photos.getSizes",
                ADD_COMMENTS: "flickr.photos.comments.addComment",
                GET_COMMENTS: "flickr.photos.comments.getList"
            }
        };
        
        var factory = {};

        factory.getPhotos = function() {
            return $http.get(API_CONSTANTS.BASE_URL, {
                params: { 
                        method: API_CONSTANTS.METHODS.GET_PUBLIC_PHOTOS,
                        api_key: API_CONSTANTS.API_KEY,
                        user_id: API_CONSTANTS.USER_ID,
                        format: API_CONSTANTS.FORMAT,
                        nojsoncallback: API_CONSTANTS.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoDetails = function(id, secret) {
            return $http.get(API_CONSTANTS.BASE_URL, {
                params: { 
                        method: API_CONSTANTS.METHODS.GET_PHOTO_INFO,
                        api_key: API_CONSTANTS.API_KEY,
                        photo_id: id,
                        secret: secret,
                        format: API_CONSTANTS.FORMAT,
                        nojsoncallback: API_CONSTANTS.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoFavorites = function(id) {
            return $http.get(API_CONSTANTS.BASE_URL, {
                params: { 
                        method: API_CONSTANTS.METHODS.GET_PHOTO_FAVORITES,
                        api_key: API_CONSTANTS.API_KEY,
                        photo_id: id,
                        format: API_CONSTANTS.FORMAT,
                        nojsoncallback: API_CONSTANTS.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getPhotoSizes = function(id) {
            return $http.get(API_CONSTANTS.BASE_URL, {
                params: { 
                        method: API_CONSTANTS.METHODS.GET_PHOTO_SIZES,
                        api_key: API_CONSTANTS.API_KEY,
                        photo_id: id,
                        format: API_CONSTANTS.FORMAT,
                        nojsoncallback: API_CONSTANTS.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.addComment = function(id, comment) {
            return $http.get(API_CONSTANTS.BASE_URL, {
                params: { 
                        method: API_CONSTANTS.METHODS.ADD_COMMENTS,
                        api_key: API_CONSTANTS.API_KEY,
                        photo_id: id,
                        comment_text: comment,
                        format: API_CONSTANTS.FORMAT,
                        nojsoncallback: API_CONSTANTS.NO_JSON_CALLBACK 
                    }
            });
        };
        factory.getComment = function(id) {
            return $http.get(API_CONSTANTS.BASE_URL, {
                params: { 
                        method: API_CONSTANTS.METHODS.GET_COMMENTS,
                        api_key: API_CONSTANTS.API_KEY,
                        photo_id: id,
                        format: API_CONSTANTS.FORMAT,
                        nojsoncallback: API_CONSTANTS.NO_JSON_CALLBACK 
                    }
            });
        };

        return factory;
    };

    PhotoFactory.$inject = ['$http'];
    angular.module('ISOUApp').factory('PhotoFactory', PhotoFactory);
}());