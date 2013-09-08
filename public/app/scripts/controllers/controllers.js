app.controller('MainCtrl', ['$scope', 'Page', function($scope, Page) {
    $scope.$on('title:changed', function (){
        $scope.page = Page.title();
    });
}]);

app.controller('HomeCtrl', ['$scope', 'Page', function($scope, Page) {
    Page.setTitle('');
    $scope.$emit('title:changed');
}]);

app.controller('NewsCtrl', ['$scope', 'newsData', function($scope, newsData) {
    var newsObj = newsData.getNewsList({number: 10});
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
        Page.setTitle(oneNews.title);
        $scope.$emit('title:changed');
    });
}]);
