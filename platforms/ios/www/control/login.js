var loginControl = angular.module('loginPage',[]);

loginControl.controller('loginController', loginController);


function loginController($scope, $http, $window) {
  $scope.email = '';
  $scope.password = '';
  $scope.isDisabled = false;

  $scope.loginSubmit = function() {

    $scope.isDisabled = true;

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'POST',
        data: {
            'email' : $scope.email,
            'password' : $scope.password,
        },
        url: 'https://unsurfaced-cross.000webhostapp.com/PGLogin.php'
     }).then(function (response){

        if(response.data[0]!="GG"){
          localStorage.setItem("login", JSON.stringify(response.data[0]));

          var go = JSON.parse(localStorage.getItem("login"));
          alert("Successful Login"+"\n\nWelcome, "+go.UserName);

          $window.location.href = 'viewRecipe.html';

        }else{
          alert("Login Failed. Incorrect Email or Password.");
          $scope.isDisabled = false;
        }



     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;
     });

  };


}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener('backbutton', function (evt) {


        }, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    }

};
