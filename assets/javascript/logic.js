 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyBhtn_wh03D9qw3R2dnzY3iOZ-WMaS9xww",
     authDomain: "multiplayer-rps-a5463.firebaseapp.com",
     databaseURL: "https://multiplayer-rps-a5463.firebaseio.com",
     storageBucket: "multiplayer-rps-a5463.appspot.com",
     messagingSenderId: "812423863950"
 };
 firebase.initializeApp(config);

 var database = firebase.database();
 var name = "";
 var player1 = false;
 var player2 = false;
 var player1Choice = "";
 var player2Choice = "";



 $("#add-user").on("click", function() {
     // Don't refresh the page!

     //set Player 1
     event.preventDefault();
     if (player1 === false && player2 === false) {
         player1 = true;
         name = $("#name-input").val().trim();
         console.log(name);
         console.log(player1);
         database.ref().set({
             player1Select: true
         });
         database.ref().set({
             player1: {
                 name: name,
                 wins: 0,
                 losses: 0
             }
         });
         console.log(database.ref().snapshot)
         //set Player 2 if Player 1 is true
     } else if (player1 === true && player2 === false ) {
         player2 = true;
         name = $("#name-input").val().trim();
         console.log(name);
         console.log(player1);
         console.log(database.ref().player1);
         database.ref().push({

             player2: {
                 name: name,
                 wins: 0,
                 losses: 0
             }
         });

     }
 });
   // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      
      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);
      // ["askjfdshbcbkn", "sduhfudisgvbjco"]

      // Finding the last user's key
      var lastIndex = svArr.length - 1;

      var lastKey = svArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey];

      // Console.loging the last user's data
      console.log(lastObj.name);
 

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });