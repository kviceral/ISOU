(function() {

    var HomeController = function ($scope, $log, PhotoFactory) {
        $scope.photos = [];
        
        function init(){
            $log.info("Initializing...");
            
            PhotoFactory.getPhotos()
                .success(function(photos) {
                    //TODO: put the metadata in another variable
                    $scope.photos = photos.photos.photo;
                    
                    for(var i=0; i < $scope.photos.length; i++){
                        $scope.photos[i].urlDefault = $scope.constructDefaultImgLinks($scope.photos[i].farm, $scope.photos[i].server,
                            $scope.photos[i].id, $scope.photos[i].secret);
                    }
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    //TODO: throw something to UI
                });
            
        }

        $scope.initGrid = function(){
            PhotoFactory.getPhotos()
                .success(function(photos) {
                    $scope.photos = photos;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    //TODO: throw something to UI
                });
        };

        $scope.constructDefaultImgLinks = function(farm, server, id, secret){
            return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
        };

        init();
    };

    HomeController.$inject = ['$scope', '$log', 'PhotoFactory'];
    angular.module('ISOUApp').controller('HomeController', HomeController);

}());