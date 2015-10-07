/*
	A "Business" or Orchestration Layer on top of the API caller
    */
(function() {
    var PhotoService = function($http, $log, $q, $timeout, PhotoFactory) {

        this.getPhotoDetails = function (id, secret) {
            
            var deferred = $q.defer();
            
            setTimeout(function() {                
                var details = {};
                var favorites = {};
                var download = {};
                
                var getPhotoDetailsPromise = PhotoFactory.getPhotoDetails(id,secret)
                    .success(function(photo) {      
                        details = photo;
                    })
                    .error(function(data, status, headers, config) {
                        $log.error(data.error + ' ' + status);
                    });
                var getPhotoFavoritesPromise = PhotoFactory.getPhotoFavorites(id)
                    .success(function(photo) {      
                        favorites = photo;
                    })
                    .error(function(data, status, headers, config) {
                        $log.error(data.error + ' ' + status);
                    });
                var getPhotoSizesPromise = PhotoFactory.getPhotoSizes(id)
                    .success(function(photo) {      
                        download = photo.sizes.size;
                    })
                    .error(function(data, status, headers, config) {
                        $log.error(data.error + ' ' + status);
                    });    
                    
                
                $q.all([getPhotoDetailsPromise,getPhotoFavoritesPromise,getPhotoSizesPromise])
                    .then(function(string) {
                        var ret= {};
                        ret.details = details;
                        ret.favorites = favorites;
                        ret.download = download;
                        
                        deferred.resolve(ret);
                        return deferred.promise; 
                    });
            }, 10);
            
            return deferred.promise;
        };
        
        this.getPhoto = function(id, photos) {
            for(var i=0; i < photos.length; i++){
                if(photos[i].id === id){
                    return photos[i];
                }
            }
        };
        
    };

    //PhotoService.$inject = ['$http', '$log', 'PhotoFactory'];
    angular.module('ISOUApp').service('PhotoService', PhotoService);
}());
