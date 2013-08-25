var services = angular.module('SOSApp.services', ['ngResource']);

services.factory('News', ['$resource', function($resource) {
    return $resource('https://public-api.wordpress.com/rest/v1/sites/:site/posts/slug\::slug', {site: '@site', slug: '@slug'});
}]);

app.factory('newsData', ['News', '$http', '$resource', '$q', function (News, $http, $resource, $q) {
    return {
        newsList: [],
        getNewsList: function (params) {
            var deferred = $q.defer(),
                attrs = params || {},
                defaultParams = {
                    site : 'metrouk2.wordpress.com',
                    number : attrs.number || 5,
                    page : attrs.page || 1,
                    callback: 'JSON_CALLBACK'
                };

            News.get({'method': 'JSONP', 'params': defaultParams, isArray: false},
                function (response) {
                    var success = parseInt( response.found, 10 ) > 0;

                    if (success) {
                        deferred.resolve( response );
                    } else {
                        deferred.reject( response );
                    }
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;

        },
        getNewsDetail: function (slug) {
            var recipe = _.where(this.newsList, {slug: slug}),
                deferred = $q.defer();

            if (_.isEmpty(recipe)) {

                var deferred = $q.defer(),
                    attrs = params || {},
                    defaultParams = {
                        site: 'metrouk2.wordpress.com',
                        slug: slug,
                        callback: 'JSON_CALLBACK'
                    };

                News.get({'method': 'JSONP', 'params': defaultParams, isArray: false},
                    function (response) {
                        var success = parseInt( response.found, 10 ) > 0;

                        if (success) {
                            deferred.resolve( response );
                        } else {
                            deferred.reject( response );
                        }
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                );

                return deferred.promise;

            } else {
                deferred.resolve( recipe[0] );
            }

            return deferred.promise;
        },
        addNews: function (news) {
             this.newsList.push(news);
        }
    };
}]);

app.factory('Page', function(){
    var defaultTitle = 'Scaling Octo Shame',
        title = defaultTitle;
    return {
        title: function() { return title; },
        setTitle: function(newTitle) {
            console.log(newTitle)
            title = (newTitle ? newTitle + ' - ': '') + defaultTitle;
        }
    };
});