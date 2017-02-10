describe("createtodo ", function() {
  it("creates new post", function() {
    expect($http.post).toEqual(" ");
  });
});

describe("createtodo ", function() {
  it("creates new post", function() {
    expect($http.post).toEqual(" ");
  });
});

angular.module('scotchTodo').controller('mainController', function mainController($scope) {
  $scope.z = 0;
  $scope.sum = function() {
    $scope.z = $scope.x + $scope.y;
  };
});

describe('TodoApp', function () {
		
	beforeEach(angular.mock.module('scotchTodo'));

	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));

	describe('createTodo', function () {
		it('creates new Todo task', function () {
			var $scope = {};

			var controller = $controller('mainController', { $scope: $scope });
			$scope.formData.text = "";
		    $scope.sum();
			expect($scope.z).toBe();
		});	
	});

});