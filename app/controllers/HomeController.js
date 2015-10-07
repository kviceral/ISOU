(function() {

    var HomeController = function ($scope, $log, PhotoFactory, PhotoService) {
        $scope.photos = [];
        $scope.page = {};
        $scope.user = {};
        $scope.isErrorOnComment = false;
        $scope.isErrorOnSearch = false;
        $scope.isSuccessOnComment = false;
        
        $scope.initializePhotoData = function(photos){
            $scope.photos = photos.photos.photo;
            $scope.page.page = photos.photos.page;
            $scope.page.pages = photos.photos.pages;
            $scope.page.perPage = photos.photos.perpage;
            $scope.page.total = photos.photos.total;
                                
            for(var i=0; i < $scope.photos.length; i++){
                var photo = $scope.photos[i];
                photo.urlDefault = $scope.constructDefaultImgLinks(photo.farm, photo.server,
                    photo.id, photo.secret);
                photo.isPhotoDetailsAvailable = false;    
            }
        };
             
        $scope.loadDefaultPhotos = function(){
            PhotoFactory.getPhotos()
                .success(function(photos) {
                    $scope.initializePhotoData(photos);
                })
                .error(function(data, status, headers, config) {
                    $log.error(data.error + ' ' + status);
                    //TODO: throw something to UI
                });
        };
        
        //Angular already pre-filters with data-binding. So this is in the case when no results show up.
        //Probably should make that more clear to user.
        $scope.search = function(){
            PhotoFactory.searchPhoto($scope.user.search)
                .success(function(photos) {
                    if(photos.stat === "fail"){
                        $scope.isErrorOnSearch = true;
                    }else{
                        $scope.initializePhotoData(photos);    
                    }      
                    
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    //todo
                });  
        };

        $scope.getPhotoDetails = function(id, secret){   
            var promise = PhotoService.getPhotoDetails(id, secret);
            promise.then(function(data) {               
                var photo = PhotoService.getPhoto(id, $scope.photos);
                photo.details = data;
                photo.isPhotoDetailsAvailable = true;    
                $log.info(photo);
            }, function(reason) {
                //failed flow
            }, function(update) {
                //todo
            });                                               
        };
        
        
        $scope.postComment = function(id){
            PhotoFactory.addComment(id, $scope.user.comment)
                .success(function(photo) {      
                    $scope.isSuccessOnComment = true;
                    $scope.user.comment = "";
                })
                .error(function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                    $scope.isErrorOnComment = true;
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
     
        function init(){
            $scope.loadDefaultPhotos();                      
        }

        init();
    };

    HomeController.$inject = ['$scope', '$log', 'PhotoFactory', 'PhotoService'];
    angular.module('ISOUApp').controller('HomeController', HomeController);

}());
