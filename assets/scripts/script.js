$('#p1-selection').change(function() {
    var p1Selection = $('select').val();
    var queryURL1 = 'http://api.giphy.com/v1/gifs/search?q=' + p1Selection + '&api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee';

    $.get(queryURL1).then(function(response) {
        var rNum = Math.floor(Math.random()*25);
        $('#p1-pic').html('<img src="' + response.data[rNum].url + '">');
        // console.log(response.data[rNum].url);
    });
    // console.log($('select').val());
});

// var p2Selection = $('#p2-selection').val().trim();
// console.log(p1Selection);
// var queryURL1 = 'http://api.giphy.com/v1/gifs/search?q=' + p1Selection + '&api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee';
// var queryURL2 = 'http://api.giphy.com/v1/gifs/search?q=' + p2Selection + '&api_key=aORSyh3OYX52nRTFnKFPMTC6ijlqSOee';

