var app = angular.module('flickrApp', []);

app.controller('flickrCtrl', function($scope, $http) {

    var getProperties = function(object) {
        var properties = [];
        for (var property in object) {
           properties.push(property);
        }
        return properties;
    }

    $scope.setLevel2 = function() {
        $scope.level2 = getProperties($scope.configObject[$scope.level1Selected]);
        if (typeof $scope.level2 != "undefined") {
            $scope.level2Selected = $scope.level2[0];
            $scope.setLevel3($scope.level2Selected);
            return true;
        }
        else return false;
    }

    $scope.setLevel3 = function() {
        $scope.level3 = $scope.configObject[$scope.level1Selected][$scope.level2Selected];
        if (typeof $scope.level3 != "undefined") {
            $scope.level3Selected = $scope.level3[0];
            return true;
        }
        else return false;
    }

	var apikey = '57f694132e4714c29a64c9af890b124e';
    var initTerm = '&user_id=peziza';
	var output = null;
    var hovered = false;

    var configArray = [];
    $scope.level1 =  [];
    $scope.level2 = [];
    $scope.level3 = [];
    $http.get('./config/config.json')
    .then(function(configResponse) {
        $scope.configObject = configResponse.data;

        if (typeof $scope.configObject !== "undefined") {

            $scope.level1 = getProperties($scope.configObject);
            if (typeof $scope.level1[0] != "undefined") {
                $scope.level1Selected = $scope.level1[0];
            }
                      
            $scope.level2 = getProperties($scope.configObject[$scope.level1[0]]);
            if (typeof $scope.level2[0] != "undefined") {
                $scope.level2Selected = $scope.level2[0];
            }
            
            $scope.level3 = $scope.configObject[$scope.level1[0]][$scope.level2[0]];
            if (typeof $scope.level3[0] != "undefined") {
                $scope.level3Selected = $scope.level3[0]; 
            }
        }
    })

    $scope.submit = function(searchTerm) {
        var searchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
        searchUrl += '&' + 'api_key=' + apikey + searchTerm + '&format=json&nojsoncallback=1';
        $http.get(searchUrl)
        .then(function(searchResponse) {
            $scope.output = searchResponse.data;
            if (typeof $scope.output != "undefined" && typeof $scope.output.photos.photo != "undefined") {
                angular.forEach($scope.output.photos.photo, function (photoItem, key) {
                //photoItem.url = 'https://farm' + photoItem.farm + '.staticflickr.com/' + photoItem.server + '/' + photoItem.id + '_' + photoItem.secret + '.jpg';
                var sizeUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes';
                sizeUrl += '&' + 'api_key=' + apikey + '&photo_id=' + photoItem.id + '&format=json&nojsoncallback=1';
                $http.get(sizeUrl)
                .then(function(sizeResponse) {
                    if (typeof sizeResponse.data.sizes.size != "undefined") {
                        photoItem.sizes = sizeResponse.data.sizes.size;
                    }
                    if (typeof sizeResponse.data.sizes.size[1].source != "undefined") {
                        photoItem.url = sizeResponse.data.sizes.size[1].source; 
                    }
                    $scope.output.photos.photo[key] = photoItem;
                })
            });
            }
        });
    }

    $scope.submit(initTerm);

});
