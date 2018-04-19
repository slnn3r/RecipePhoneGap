var registerControl = angular.module('registerPage',[]);

registerControl.controller('registerController', registerController);


function registerController($scope, $http, $window) {



  $scope.name= '';
  $scope.gender= 'Male';
  $scope.birthdate= '';
  $scope.mobileno= '';
  $scope.email = '';
  $scope.password = '';
  $scope.retypepassword ='';
  $scope.isDisabled = false;

  $scope.registerSubmit = function() {

    $scope.isDisabled = true;

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'POST',
        data: {
            'name' : $scope.name,
            'gender': $scope.gender,
            'birthdate' : $scope.birthdate,
            'mobileno' : $scope.mobileno,
            'email' : $scope.email,
            'password' : $scope.password
        },
        url: 'https://unsurfaced-cross.000webhostapp.com/PGRegister.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Registration Successful. Go to Login Page to Login your Account.");
          $window.location.href = './login.html';

        }else if(response.data[0]=="MOBILE"){
          alert("Mobile Number is already Registered. Please use another Mobile Number and Try Again.");
          $scope.isDisabled = false;

        }else if(response.data[0]=="EMAIL"){
          alert("Email is already Registered. Please use another Email and Try Again.");
          $scope.isDisabled = false;

        }else{
          alert("Registration Failed. Please Try Again.");
          $scope.isDisabled = false;

        }



     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });


  };


}


registerControl.directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget);
        return value;
      }

      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);

      // This is to force validator when the original password gets changed
      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });

    }
  };
}]);


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
