/**
 * Created by raniys on 4/27/17.
 */

var mainApp = angular.module('mainApp', [])
    .filter('trustAsResourceUrl', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsResourceUrl(val);
        };
    }]);

//Controller间通信的服务
mainApp.factory('Service', function () {
    return {
        //网络状态
        networkReady: false,
        isLogin: false
    }
});

mainApp.controller('mainController', function ($scope, Service, $http) {
    $scope.service = Service;

    console.log("load page success");

    $scope.onPostClick = function () {
        const url = "/user/register";
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data'},
            timeout: 5 * 1000,
            params: {
                _csrf: csrf
            }
        }).then(function successCallback(response) {
            if (response.status == 200) {
                console.log("POST==> " + response.data);
            } else {
                console.error("POST error: " + response.status + " description: " + response.statusText);
            }
        }, function errorCallback(error) {
            if (error.status === -1) {
                console.error("POST 请求超时");
            } else {
                console.error("POST 服务器网络连接错误");
            }
        });
    };

    $scope.onGetClick = function () {
        const url = "/user/login";
        $http({
            method: 'GET',
            url: url,
            timeout: 5 * 1000,
            params: {
                _csrf: csrf,
                username: "admin"
            }
        }).then(function successCallback(response) {
            if (response.status == 200) {
                console.log("GET==> " + response.data);
            } else {
                console.error("GET error: " + response.status + " description: " + response.statusText);
            }
        }, function errorCallback(error) {
            if (error.status === -1) {
                console.error("GET 请求超时");
            } else {
                console.error("GET 服务器网络连接错误");
            }
        });
    };

    /** http request **/
    $scope.testPOST = function () {
        const url = "https://wapi.shrise.cn/promotion/diagnosis_stock.json";
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'multipart/form-data'},
            timeout: 5 * 1000,
            params: {
                content: "124235"
            }
        }).then(function successCallback(response) {
            if (response.status == 200) {
                console.log("POST==> " + response.data);
            } else {
                console.error("POST error: " + response.status + " description: " + response.statusText);
            }
        }, function errorCallback(error) {
            if (error.status === -1) {
                console.error("POST 请求超时");
            } else {
                console.error("POST 服务器网络连接错误");
            }
        });
    };

    $scope.testGET = function () {
        const url = "https://wapi.shrise.cn/promotion/diagnosis_stock.json";
        $http({
            method: 'GET',
            url: url,
            timeout: 5 * 1000,
            params: {
                content: "124235"
            }
        }).then(function successCallback(response) {
            if (response.status == 200) {
                console.log("GET==> " + response.data);
            } else {
                console.error("GET error: " + response.status + " description: " + response.statusText);
            }
        }, function errorCallback(error) {
            if (error.status === -1) {
                console.error("GET 请求超时");
            } else {
                console.error("GET 服务器网络连接错误");
            }
        });
    };
});