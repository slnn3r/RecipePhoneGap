var detailControl = angular.module('detailRecipePage',[]);

detailControl.controller('detailController', detailController);


function detailController($scope, $http, $window) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  var go = JSON.parse(localStorage.getItem("recipeDetails"));
  var gogo = JSON.parse(localStorage.getItem("login"));

  $scope.isDisabled = false;

  $scope.recipeName = go.RecipeName;

  $scope.data = {
   availableOptions: [
     {name: 'Vegetarian'},
     {name: 'Fast Food'},
     {name: 'Healthy'},
     {name: 'No-Cook'},
     {name: 'Make Ahead'}

   ],
   selectedOption: { name: go.RecipeType}
   };


  $scope.recipeIngredient = go.RecipeIngredient;
  $scope.recipeStep = go.RecipeStep;


  $scope.updateSubmit = function(){

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
            'RecipeName': $scope.recipeName,
            'RecipeType' : $scope.data.selectedOption.name,
            'RecipeIngredient' : $scope.recipeIngredient,
            'RecipeStep' : $scope.recipeStep,
            'RecipeID' : go.RecipeID,
            'UserID' : gogo.UserID
        },
        url: 'https://unsurfaced-cross.000webhostapp.com/PGUpdate.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Update Recipe Successful.");
          $window.location.href = 'viewRecipe.html';

        }else{
          alert("Update Recipe Failed. Please Try Again.");
          $scope.isDisabled = false;

        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });


  }

  $scope.resetSubmit = function(){
    $scope.recipeID = go.RecipeID;
    $scope.recipeName = go.RecipeName;
    $scope.data = {
     availableOptions: [
       {name: 'Vegetarian'},
       {name: 'Fast Food'},
       {name: 'Healthy'},
       {name: 'No-Cook'},
       {name: 'Make Ahead'}

     ],
     selectedOption: { name: go.RecipeType}
     };
    $scope.recipeIngredient = go.RecipeIngredient;
    $scope.recipeStep = go.RecipeStep;

  }

  $scope.deleteSubmit = function(){

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
            'RecipeID' : go.RecipeID,
            'UserID' : gogo.UserID
        },
        url: 'https://unsurfaced-cross.000webhostapp.com/PGDelete.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Delete Recipe Successful.");
          $window.location.href = 'viewRecipe.html';

        }else{
          alert("Delete Recipe Failed. Please Try Again.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });


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

function back(){
  window.localStorage.removeItem('recipeDetails');
  window.location.href='viewRecipe.html';

}

function exitFromApp(){

  navigator.app.exitApp();

}

function myFunction() {
    var go = JSON.parse(localStorage.getItem("login"));
    document.getElementById("myText").innerHTML = go.UserName;
}
