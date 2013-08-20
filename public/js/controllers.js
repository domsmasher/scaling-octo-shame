app.controller('MainCtrl', ['$scope', 'Page', function($scope, Page) {
    $scope.page = Page;
}]);

app.controller('HomeCtrl', ['$scope', 'Page', function($scope, Page) {
    Page.setTitle('');
}]);

app.controller('TopNewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    $scope.loading = true;
    $scope.topNews = newsData.getTopNews();
    $scope.topNews.then(function () {
        $scope.loading = false;
    });
}]);

app.controller('NewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    var newsObj = newsData.getNews();
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
        var more = newsData.getPageNews($scope.currentPage);

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
    $scope.oneNews = newsData.getOneNews(slug);
    $scope.oneNews.then(function (oneNews) {
        Page.setTitle(oneNews.title);
    });
}]);
