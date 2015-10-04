(function() {
    var PhotoFactory = function($http) {

        var factory = {};

        factory.getPhotos = function() {
            //return $http.get('/api/requests/access');
			return null;
        };

        return factory;
    };

    PhotoFactory.$inject = ['$http'];
    angular.module('ISOUApp').factory('PhotoFactory', PhotoFactory);
}());