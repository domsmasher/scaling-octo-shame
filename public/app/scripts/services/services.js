app.factory('newsData', ['$http', '$log', '$q', function ($http, $log, $q) {
    return {
        getNewsList: function (params) {
            var deferred = $q.defer(),
                attrs = params || {},
                number = attrs.number || 5,
                page = attrs.page || 1;

            $http({
                method:'JSONP',
                url: 'https://public-api.wordpress.com/rest/v1/sites/metrouk2.wordpress.com/posts/?number=' + number + '&page=' + page + '&callback=JSON_CALLBACK'
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve( data );
                })
                .error(function (data, status, headers, config) {
                    deferred.reject( status );
                });

            return deferred.promise;

        },
        getNewsDetail: function (slug) {
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