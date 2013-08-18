app.controller('MainCtrl', ['$scope', 'Page', function($scope, Page) {
    $scope.page = Page;
}]);

app.controller('HomeCtrl', ['$scope', 'newsData', function($scope, newsData) {
    //$scope.topNews = newsData.getTopNews();
}]);

app.controller('TopNewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    $scope.loading = true;
    $scope.topNews = newsData.getTopNews();
    $scope.topNews.then(function () {
        $scope.loading = false;
    });
}]);

app.controller('NewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    $scope.loading = true;
    $scope.news = newsData.getNews();
    $scope.news.then(function () {
        $scope.loading = false;
    });
}]);

app.controller('DetailCtrl', ['$scope', '$routeParams', 'newsData', 'Page', function($scope, $routeParams, newsData, Page) {
    var slug = (($routeParams.slug) ? $routeParams.slug : '');
    $scope.oneNews = newsData.getOneNews(slug);
    $scope.oneNews.then(function (oneNews) {
        Page.setTitle(oneNews.title);
    });
}]);
