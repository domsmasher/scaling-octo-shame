app.factory('newsData', ['$http', '$log', '$q', function ($http, $log, $q) {
    return {
        getTopNews: function () {
            var deferred = $q.defer();

            $http({
                method:'JSONP',
                url: "https://public-api.wordpress.com/rest/v1/sites/metrouk2.wordpress.com/posts/?number=5&callback=JSON_CALLBACK"
            })
            .success(function (data, status, headers, config) {
                deferred.resolve( data );
            })
            .error(function (data, status, headers, config) {
                deferred.reject( status );
            });

            return deferred.promise;

        },
        getNews: function () {
            var deferred = $q.defer();

            $http({
                method:'JSONP',
                url: "https://public-api.wordpress.com/rest/v1/sites/metrouk2.wordpress.com/posts/?number=10&page=1&callback=JSON_CALLBACK"
            })
            .success(function (data, status, headers, config) {
                deferred.resolve( data );
            })
            .error(function (data, status, headers, config) {
                deferred.reject( status );
            });

            return deferred.promise;

        },
        getOneNews: function (slug) {
            var deferred = $q.defer();

            $http({
                method:'JSONP',
                url: "https://public-api.wordpress.com/rest/v1/sites/metrouk2.wordpress.com/posts/slug:" + slug + "?callback=JSON_CALLBACK"
            })
            .success(function (data, status, headers, config) {
                deferred.resolve( data );
            })
            .error(function (data, status, headers, config) {
                deferred.reject( status );
            });

            return deferred.promise;

        },
        getPageNews: function (page) {
            var deferred = $q.defer();

            $http({
                method:'JSONP',
                url: "https://public-api.wordpress.com/rest/v1/sites/metrouk2.wordpress.com/posts/?number=10&page=" + (page +=1) + "&callback=JSON_CALLBACK"
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve( data );
                })
                .error(function (data, status, headers, config) {
                    deferred.reject( status );
                });

            return deferred.promise;

        }

    };
}]);

app.factory('Page', function(){
    var defaultTitle = 'Scaling Octo Shame',
        title = defaultTitle;
    return {
        title: function() { return title; },
        setTitle: function(newTitle) {
            title = (newTitle ? newTitle + ' - ': '') + defaultTitle;
        }
    };
});