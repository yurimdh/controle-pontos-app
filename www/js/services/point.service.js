(function() {
  angular
    .module("app.services")
    .factory("pointService", pointService);

  pointService.$inject = ["$q", "$http", "$cordovaGeolocation", "config"];

  function pointService($q, $http, $cordovaGeolocation, config) {
    var service = {
      setPoint: setPoint
    };

    return service;

    function setPoint(period) {
      return getUserPosition(period);
    };

    function getUserPosition(period) {
      var options = { timeout: 10000, enableHighAccuracy: true };

      return $cordovaGeolocation.getCurrentPosition(options)
        .then(onSuccess, onFail);

      function onSuccess(position) {
        return savePoint(position, period);
      };

      function onFail(error) {
        return error;
      };
    };

    function savePoint(position, period) {
      var point = {
        'kind':      period.index,
        'latitude':  position.coords.latitude,
        'longitude': position.coords.longitude
      };

      return $http.post(config.apiBase + "/points", { 'point': point })
        .then(onSuccess)
        .catch(onFail);

      function onSuccess(response) {
        return response;
      };

      function onFail(error) {
        return $q.reject(error);
      };
    };
  };
})();
