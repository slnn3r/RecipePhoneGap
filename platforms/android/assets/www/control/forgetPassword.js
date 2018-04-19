var forgetPasswordControl = angular.module('forgetPasswordPage',[]);

forgetPasswordControl.controller('forgetPasswordController', forgetPasswordController);


function forgetPasswordController($scope, $http,$window) {
  $scope.mobileno = '';
  $scope.email = '';
  $scope.isDisabled = false;

  $scope.forgetPasswordSubmit = function() {

    $scope.isDisabled = true;

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'POST',
        data: {
            'email' : $scope.email,
            'mobileno' : $scope.mobileno,
        },
        url: 'https://unsurfaced-cross.000webhostapp.com/PGForgetPassword.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Successful Recover Password. Your Account Password have sent to your Email.");
          $window.location.href = './login.html';

        }else if(response.data[0]=="GG"){
          alert("Recover Password Failed. Incorrect Email or Mobile Number.");
          $scope.isDisabled = false;

        }else if(response.data[0]=="MSGGG"){
          alert("Recover Password Failed. Failed to Send Email, Please Try Again.");
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
