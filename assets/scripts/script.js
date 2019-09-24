

var firebaseConfig = {
    apiKey: "AIzaSyAtzdbfrJPqA8aDo5SMn2h04QrIkTzqzOo",
    authDomain: "fbase-1-51b39.firebaseapp.com",
    databaseURL: "https://fbase-1-51b39.firebaseio.com",
    projectId: "fbase-1-51b39",
    storageBucket: "fbase-1-51b39.appspot.com",
    messagingSenderId: "70684971929",
    appId: "1:70684971929:web:e5d126162a503bad873908"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
  
var p1Wins = 0;
var p2Wins = 0;
var p1Losses = 0;
var p2Losses = 0;
var p1Ties = 0;
var p2Ties = 0;
var p1Per = 0;
var p2Per = 0;

// var update = function() {
//     $('#p1-wins').text(p1Wins);
//     $('#p2-wins').text(p2Wins);
//     $('#p1-losses').text(p1Losses);
//     $('#p2-losses').text(p2Losses);
//     $('#p1-ties').text(p1Ties);
//     $('#p2-ties').text(p2Ties);
//     p1Per = Math.floor(p1Wins/(p1Losses+p1Wins))*100;
//     p2Per = Math.floor(p2Wins/(p2Losses+p2Wins))*100;
//     $('#p1-per').text(p1Per);
//     $('#p2-per').text(p2Per);
// }
    $('#p1-selection').change(function() {
        var p1Selection = $('#p1-select').val();
        var queryURL1 = 'http://api.giphy.com/v1/gifs/search?q=' + p1Selection + '&api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee';
        $('#battle-area').css('display', 'flex');
    
        $.get(queryURL1).then(function(response) {
            var rNum = Math.floor(Math.random()*25);
            var url = response.data[rNum].images.original.url;
            $('#p1-pic').html('<img src="' + url + '">');
        });
    });
    
    $('#p2-selection').change(function() {
        var p2Selection = $('#p2-select').val();
        var queryURL2 = 'http://api.giphy.com/v1/gifs/search?q=' + p2Selection + '&api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee';
        $('#battle-area').css('display', 'flex');
        
        $.get(queryURL2).then(function(response) {
            var rNum = Math.floor(Math.random()*25);
            var url = response.data[rNum].images.original.url;
            $('#p2-pic').html('<img src="' + url + '">');
        });
    });


console.log(p1Wins);

$('#submit-button').on('click', function() {
    var p1Selection = $('#p1-select').val();
    var p2Selection = $('#p2-select').val();
    if (((p1Selection !== "Rock") && (p2Selection === "Scissors")) || ((p1Selection !== "Scissors") && (p2Selection === "Paper")) || ((p1Selection !== "Paper") && (p2Selection === "Rock"))) {
        $('#battle-area').html('<h1>Player Two Wins!</h1>');
        p2Wins++;
        p1Losses++;
        p1Per = Math.floor((p1Wins/(p1Losses+p1Wins))*100);
        p2Per = Math.floor((p2Wins/(p2Losses+p2Wins))*100);
    } else if (p1Selection === p2Selection) {
        p1Ties++;
        p2Ties++;
    } else {
        $('#battle-area').html('<h1>Player One Wins!</h1>');
        p1Wins++;
        p2Losses++;
        p1Per = Math.floor((p1Wins/(p1Losses+p1Wins))*100);
        p2Per = Math.floor((p2Wins/(p2Losses+p2Wins))*100);
    }
        database.ref().set({
            p1W: p1Wins,
            p2W: p2Wins,
            p1L: p1Losses,
            p2L: p2Losses,
            p1T: p1Ties,
            p2T: p2Ties,
            p1P: p1Per,
            p2P: p2Per
        });
    $('#player-row').css('display', 'none');
    $('#selection-row').css('display', 'none');
    $('#submit-row').css('display', 'none');
    $('#reset-row').css('display', 'flex');
});

database.ref().on("value", function(snapshot) {
    p1Wins = snapshot.val().p1W;
    p2Wins = snapshot.val().p2W;
    p1Losses = snapshot.val().p1L;
    p2Losses = snapshot.val().p2L;
    p1Ties = snapshot.val().p1T;
    p2Ties = snapshot.val().p2T;
    p1Per = snapshot.val().p1P;
    p2Per = snapshot.val().p2P;
    $("#p1-wins").text(snapshot.val().p1W);
    $("#p2-wins").text(snapshot.val().p2W);
    $("#p1-losses").text(snapshot.val().p1L);
    $("#p2-losses").text(snapshot.val().p2L);
    $('#p1-ties').text(snapshot.val().p1T);
    $('#p2-ties').text(snapshot.val().p1T);
    $('#p1-per').text(snapshot.val().p1P);
    $('#p2-per').text(snapshot.val().p2P);
  });

$('#reset-button').on('click', function() {
    location.reload();
});