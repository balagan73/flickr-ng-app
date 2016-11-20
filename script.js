var apikey = '06978083e5080079f06986a732851025';
var searchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
searchUrl += '&' + 'api_key=' + apikey + '&tags=truffle&format=json&nojsoncallback=1';
var app = angular.module('flickrApp', []);
var output = null;

app.controller('flickrCtrl', function($scope, $http) {
    $http.get(searchUrl)
    .then(function(searchResponse) {
        $scope.output = searchResponse.data;
        angular.forEach($scope.output.photos.photo, function (value, key) {
        	value.url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg';
        	var sizeUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes';
        	sizeUrl += '&' + 'api_key=' + apikey + '&photo_id=' + value.id + '&format=json&nojsoncallback=1';
        	$http.get(sizeUrl)
        	.then(function(sizeResponse) {
        		value.sizes = sizeResponse.data.sizes.size;
        		$scope.output.photos.photo[key] = value;
        	})
        });
    });
});
