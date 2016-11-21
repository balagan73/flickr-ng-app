var app = angular.module('flickrApp', []);
app.controller('flickrCtrl', function($scope, $http) {
	var apikey = '57f694132e4714c29a64c9af890b124e';
	var searchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
	searchUrl += '&' + 'api_key=' + apikey + '&tags=colors&format=json&nojsoncallback=1';
	var output = null;
    var hovered = false;
    $http.get(searchUrl)
    .then(function(searchResponse) {
        $scope.output = searchResponse.data;
        angular.forEach($scope.output.photos.photo, function (photoItem, key) {
        	//photoItem.url = 'https://farm' + photoItem.farm + '.staticflickr.com/' + photoItem.server + '/' + photoItem.id + '_' + photoItem.secret + '.jpg';
        	var sizeUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes';
        	sizeUrl += '&' + 'api_key=' + apikey + '&photo_id=' + photoItem.id + '&format=json&nojsoncallback=1';
        	$http.get(sizeUrl)
        	.then(function(sizeResponse) {
        		photoItem.sizes = sizeResponse.data.sizes.size;
                photoItem.url = sizeResponse.data.sizes.size[1].source;
        		$scope.output.photos.photo[key] = photoItem;
        	})
        });
    });
});
