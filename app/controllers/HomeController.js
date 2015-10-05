(function() {

    var HomeController = function ($scope, $log, PhotoFactory) {
        $scope.photos = [];
        $scope.page = {};
        
        function init(){
            PhotoFactory.getPhotos()
                .success(function(photos) {
                    $scope.photos = photos.photos.photo;
                    $scope.page.page = photos.photos.page;
                    $scope.page.pages = photos.photos.pages;
                    $scope.page.perPage = photos.photos.perpage;
                    $scope.page.total = photos.photos.total;
                                       
                    for(var i=0; i < $scope.photos.length; i++){
                        var photo = $scope.photos[i];
                        photo.urlDefault = $scope.constructDefaultImgLinks(photo.farm, photo.server,
                            photo.id, photo.secret);
                    }
                    
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    //TODO: throw something to UI
                });
            
        }

        $scope.getPhotoDetails = function(id, secret){
            PhotoFactory.getPhotoDetails(id,secret)
                .success(function(photo) {      
                    $scope.getPhoto(id).details = photo;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
            PhotoFactory.getPhotoFavorites(id)
                .success(function(photo) {      
                    $scope.getPhoto(id).favorites = photo;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });                      
        };

        $scope.constructDefaultImgLinks = function(farm, server, id, secret){
            return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
        };
        
        $scope.getPhoto = function(id){
            for(var i=0; i < $scope.photos.length; i++){
                if($scope.photos[i].id === id){
                    return $scope.photos[i];
                }
            }
        };

        init();
    };

    HomeController.$inject = ['$scope', '$log', 'PhotoFactory'];
    angular.module('ISOUApp').controller('HomeController', HomeController);

}());