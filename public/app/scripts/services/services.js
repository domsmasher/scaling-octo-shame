app.factory('newsData', ['$http', '$resource', '$log', '$q', function ($http, $resource, $log, $q) {
    return {
        newsList: [],
        getNewsList: function (params) {
            var deferred = $q.defer(),
                $res,
                defaultParams,
                baseUrl = 'https://public-api.wordpress.com/rest/v1/sites/:site/posts/',
                attrs = params || {};


            defaultParams = {
                site : 'metrouk2.wordpress.com',
                number : attrs.number || 5,
                page : attrs.page || 1,
                callback: 'JSON_CALLBACK'
            };

            $res = $resource(baseUrl, {'_': new Date().getTime()}, {
                get: {'method': 'JSONP', 'params': defaultParams, isArray: false}
            });

            $res.get({},
                function (response) {
                    var success = parseInt(response.found, 10) > 0;
                    if (success) {
                        deferred.resolve( response);
                    } else {
                        deferred.reject(response);
                    }
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;

        },
        getNewsDetail: function (slug) {
            var recipe ={};

            recipe = _.where(this.newsList, {slug: slug});

            if (_.isEmpty(recipe)) {
                console.log('ssssss');
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

            return recipe[0];
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
            title = (newTitle ? newTitle + ' - ': '') + defaultTitle;
        }
    };
});