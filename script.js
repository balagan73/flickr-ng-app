var apikey = '06978083e5080079f06986a732851025';
var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
url += '&' + 'api_key=' + apikey + '&tags=truffle&format=json&nojsoncallback=1';
var app = angular.module('flickrApp', []);
var output = null;

app.controller('flickrCtrl', function($scope, $http) {
    $http.get(url)
    .then(function(response) {
        $scope.output = response.data;
        angular.forEach($scope.output.photos.photo, function (value, key) {
        	value.url = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg';
        	$scope.output.photos.photo[key] = value;
        });
    });
});
