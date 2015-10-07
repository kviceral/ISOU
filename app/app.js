(function() {

    var app = angular.module('ISOUApp', [])
                .constant("API", {
                    "KEY": "a5e95177da353f58113fd60296e1d250",
                    "USER_ID" : "132365033@N08",
                    "BASE_URL" : "https://api.flickr.com/services/rest/",
                    "FORMAT": "json",
                    "NO_JSON_CALLBACK": 1
                })
                .constant("API_METHODS", {
                    "GET_PUBLIC_PHOTOS" : "flickr.people.getPublicPhotos",
                    "GET_PHOTO_INFO": "flickr.photos.getInfo",
                    "GET_PHOTO_FAVORITES": "flickr.photos.getFavorites",
                    "GET_PHOTO_SIZES": "flickr.photos.getSizes",
                    "ADD_COMMENTS": "flickr.photos.comments.addComment",
                    "GET_COMMENTS": "flickr.photos.comments.getList"
                });
}());
