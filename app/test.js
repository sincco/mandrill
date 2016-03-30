angular.module('myApp', [])
  .controller('MovieController', function($scope, $http) {
    $scope.$watch('search', function() {
      fetch();
    });

    $scope.search = "Gorra";

    function fetch() {
      $http.get("http://rigan.pengostores.mx/index.php/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%" + $scope.search + "%&searchCriteria[filterGroups][0][filters][0][condition_type]=like")
        .then(function(response) {
          $scope.products = response.data;
        });
    }

    $scope.update = function(movie) {
      $scope.search = movie.Title;
    };

    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }
  });