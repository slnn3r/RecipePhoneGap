var createControl = angular.module('createRecipePage',[]);

createControl.controller('createController', createController);


function createController($scope, $http, $window) {

  $scope.recipeName ='';
  $scope.recipeIngredient='';
  $scope.recipeStep='';
  $scope.isDisabled=false;

  $scope.data = {
   availableOptions: [
     {id: '1', name: 'Vegetarian'},
     {id: '2', name: 'Fast Food'},
     {id: '3', name: 'Healthy'},
     {id: '4', name: 'No-Cook'},
     {id: '5', name: 'Make Ahead'}

   ],
   selectedOption: {id: '1', name: 'Vegetarian'}
   };

   $scope.createSubmit = function(){

     var go = JSON.parse(localStorage.getItem("login"));

     $scope.isDisabled=true;

     $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

     $http({
         method: 'POST',
         data: {
             'RecipeName': $scope.recipeName,
             'RecipeType' : $scope.data.selectedOption.name,
             'RecipeIngredient' : $scope.recipeIngredient,
             'RecipeStep' : $scope.recipeStep,
             'UserID' : go.UserID
         },
         url: 'https://unsurfaced-cross.000webhostapp.com/PGCreate.php'
      }).then(function (response){

         if(response.data[0]=="DONE"){
           alert("Create Recipe Successful.");
           $window.location.href = 'createRecipe.html';

         }else{
           alert("Create Recipe Failed. Please Try Again.");
           $scope.isDisabled = false;

         }


      },function (error){
           alert("Please ensure You are connected to Internet.");
           $scope.isDisabled = false;

      });



   }

    $scope.resetSubmit = function(){
      $scope.recipeName ='';
      $scope.recipeIngredient='';
      $scope.recipeStep='';
      $scope.data = {
       availableOptions: [
         {id: '1', name: 'Vegetarian'},
         {id: '2', name: 'Fast Food'},
         {id: '3', name: 'Healthy'},
         {id: '4', name: 'No-Cook'},
         {id: '5', name: 'Make Ahead'}

       ],
       selectedOption: {id: '1', name: 'Vegetarian'}
       };
      $scope.isDisabled=false;
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
