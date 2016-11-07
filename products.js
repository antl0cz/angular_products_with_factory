// create module
var appModule = angular.module('app', []);

// create factory
appModule.factory('productFactory', [ '$http', function ($http) {
    // the factory is a function that returns an object

    var products = [
        {name: 'Keyboard', price: 149.99},
        {name: 'Mouse', price: 59.99},
        {name: 'Basketball', price: 59.99}
    ];

    var factory = {};

    // getProducts key to the factory object with a value of a function
    factory.getProducts = function (callback) {
        // pass the products to a callback to be used by whoever calls the method
        callback(products);
    }

    factory.create = function (product, callback) {
        if(product.price && Number(parseFloat(product.price)) == product.price){
            products.push(product);
            callback(products);
        }
    }

    factory.delete = function (id, callback) {
        products.splice(id, 1);
        callback(products);
    }

    return factory

}]);

appModule.controller('productController', ['$scope', 'productFactory', function ($scope, productFactory) {
    function setProducts(data) {
        $scope.products = data;
        $scope.product = {};
    }

    $scope.getProducts = function () {
        productFactory.getProducts(setProducts);
    }

    $scope.getProducts();
    $scope.create = function () {
        productFactory.create($scope.product, setProducts);
    }

    $scope.delete = function (id) {
        productFactory.delete(id, setProducts)
    }
}])
