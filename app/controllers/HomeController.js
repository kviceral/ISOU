(function() {

    var HomeController = function ($scope, $log, PhotoFactory) {
        $scope.photos = [];
        
        function init(){
            $log.info("Initializing...");
            PhotoFactory.getPhotos()
                .success(function(photos) {
                    $scope.photos = photos;
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    //TODO: throw something to UI
                });
        }

        init();
    };

    HomeController.$inject = ['$scope', '$log', 'PhotoFactory'];
    angular.module('ISOUApp').controller('HomeController', HomeController);

}());