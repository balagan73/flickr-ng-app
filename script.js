var apikey = 'bdfeb595210d01c6ea35d53a44557f8e';
var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
url += '&' + 'api_key=' + apikey;
var app = angular.module('flickrApp', []);
var output = null;

app.controller('flickrCtrl', function($scope, $http) {
    $http.get(url)
    .then(function(response) {
        $scope.output = response.data;
    });
});
