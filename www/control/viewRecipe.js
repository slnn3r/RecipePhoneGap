var viewControl = angular.module('viewRecipePage',[]);

viewControl.controller('viewController', viewController);

function viewController($scope, $http, $window) {

  var go = JSON.parse(localStorage.getItem("login"));

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = false;

  $scope.data = {
   availableOptions: [
     {name: 'Vegetarian'},
     {name: 'Fast Food'},
     {name: 'Healthy'},
     {name: 'No-Cook'},
     {name: 'Make Ahead'}

   ],
   selectedOption: {name: 'Vegetarian'}
   };

   $scope.change = function(){

     document.getElementById("noInt").innerHTML = "Loading...";

     $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
             'type' : $scope.data.selectedOption.name,
             'user' : go.UserID
         },
         url: 'https://unsurfaced-cross.000webhostapp.com/PGGetList.php'
      }).then(function (response){


         $scope.testing=response.data;
         document.getElementById("noInt").innerHTML = "(Click on List to View Details)";
         $scope.isDisabled = false;


      },function (error){
           alert("Please ensure You are connected to Internet.");
           document.getElementById("noInt").innerHTML = "(No Internet Connection - Choose Other Recipe Type to Refresh)";
           $scope.isDisabled = false;
      });

   }


    $scope.viewDetails = function(yourSharedData){

      localStorage.setItem("recipeDetails", JSON.stringify(yourSharedData));
      window.location.href='detailRecipe.html';

    }



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

function logOut(){
  window.localStorage.removeItem('login');
  window.localStorage.removeItem('recipeDetails');
  alert("You have Logged Out.");
  window.location.href='../index.html';

}

function exitFromApp(){

  navigator.app.exitApp();

}

function myFunction() {
    var go = JSON.parse(localStorage.getItem("login"));
    document.getElementById("myText").innerHTML = go.UserName;
}
