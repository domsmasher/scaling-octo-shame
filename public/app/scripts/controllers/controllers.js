app.controller('MainCtrl', ['$scope', 'Page', function($scope, Page) {
    $scope.page = Page;
}]);

app.controller('HomeCtrl', ['$scope', 'Page', function($scope, Page) {
    Page.setTitle('');
}]);

app.controller('NewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    var newsObj = newsData.getNewsList({number: 5});
    $scope.currentPage = 1;

    $scope.loading = true;
    $scope.newsList = [];
    newsObj.then(function (newsList) {

        angular.forEach(newsList.posts, function (value, key) {
            $scope.newsList.push(value);
            newsData.addNews(value);
        });
        $scope.loading = false;
    });

    $scope.moreContent = function () {
        var more;

        $scope.currentPage += 1;
        $scope.loading = true;
        more = newsData.getNewsList({number: 10, page: $scope.currentPage});

        more.then(function (newsList) {
            angular.forEach(newsList.posts, function (value, key) {
                $scope.newsList.push(value);
                newsData.addNews(value);
            });
            $scope.loading = false;
        });
    };
}]);

app.controller('DetailCtrl', ['$scope', '$routeParams', 'newsData', 'Page', function($scope, $routeParams, newsData, Page) {
    var slug = (($routeParams.slug) ? $routeParams.slug : '');
    $scope.oneNews = newsData.getNewsDetail(slug);
    $scope.oneNews.then(function (oneNews) {
        console.log(oneNews);
        Page.setTitle(oneNews.title);
    });
}]);
