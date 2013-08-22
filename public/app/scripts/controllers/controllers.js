app.controller('MainCtrl', ['$scope', 'Page', function($scope, Page) {
    $scope.page = Page;
}]);

app.controller('HomeCtrl', ['$scope', 'Page', function($scope, Page) {
    Page.setTitle('');
}]);

app.controller('TopNewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    $scope.loading = true;
    $scope.topNews = newsData.getNewsList();
    $scope.topNews.then(function () {
        $scope.loading = false;
    });
}]);

app.controller('NewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    var newsObj = newsData.getNewsList({number: 10});
    $scope.currentPage = 1;

    $scope.loading = true;
    $scope.newsLista = [];
    newsObj.then(function (newsList) {

        angular.forEach(newsList.posts, function (value, key) {
            $scope.newsLista.push(value);
        });
        $scope.loading = false;
    });

    $scope.moreContent = function () {
        $scope.loading = true;
        var more = newsData.getNewsList({number: 10, page: $scope.currentPage});

        more.then(function (newsList) {
            angular.forEach(newsList.posts, function (value, key) {
                $scope.newsLista.push(value);
            });
            $scope.currentPage += 1;
            $scope.loading = false;
        });
    };
}]);

app.controller('DetailCtrl', ['$scope', '$routeParams', 'newsData', 'Page', function($scope, $routeParams, newsData, Page) {
    var slug = (($routeParams.slug) ? $routeParams.slug : '');
    $scope.oneNews = newsData.getNewsDetail(slug);
    $scope.oneNews.then(function (oneNews) {
        Page.setTitle(oneNews.title);
    });
}]);
