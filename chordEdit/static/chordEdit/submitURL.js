var player;
var beatsList;  
var videoId;
var numBeats;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '480',
        events: {
            'onReady': onPlayerReady,
        },
    });

    $('#submit').click(function() {                    
        $("#submit").html("<i class='icon-refresh icon-spin'></i> Submit");
        $.ajax({
            url: "/chordEdit/download",
            type: 'GET',
            data: {'YTurl': $('#YTurl').val()},
            dataType: 'json',
            success: function(data) {
                $("#submit").html(" Submit");      

                videoId = data['id'];
                numBeats = data['beats'].length;
                beatsList = data['beats'];

                // drawing tab
                $("#tab").html(DrawingTab(numBeats/16+1,4,4));
                $('.beat-button').click(function() {
                    var button = $(this).attr('id');
                    alert(button);    
                });
                $('#tab').slideUp("slow", function() {
                    $("#tab").slideDown("slow");       
                });
                player.loadVideoById(videoId);
            } 
        
        });
    });
}
   


var previousBeat = -1;
var beatId = 0;
function onPlayerReady(event) {

    setInterval(function() {
        var seconds = player.getCurrentTime();
        // matching time to beat

        previousBeat = beatId;
        var startBeating = false;
        for (var i=0;i<numBeats-1;i++){
            if (seconds >= beatsList[i] && seconds < beatsList[i+1]) { 
                beatId = i;
                startBeating = true;
                break;
            } 
        }

        $('#clock').html("sec : " + seconds + "   beat ID : " + beatId);
        if (startBeating){
            $('#grid' + previousBeat.toString()).css("background-color", "#ddd");
            $('#grid'+ beatId.toString()).css("background-color","#bbb");
        }
    }, 10); 
}


function DrawingTab(numRows, beatsPerMeasure, measuresPerRow) { 
    var context = ""; 
    var gridId;
    for (var i=0;i < numRows;i++){
        context  = context + "<div class='row-fluid grid-show'>";
        for (var j=0;j < measuresPerRow; j++ ){
            context = context + "<div class='span3'><div class='row-fluid grid-show'>";
            for (var k=0;k < beatsPerMeasure; k++){
                gridId = i*measuresPerRow*beatsPerMeasure + j*beatsPerMeasure + k + 1;
                context = context + "<div class='span3 beat-button' id='grid" + gridId.toString() + "'>" + gridId.toString() + "</div>";
            }
            context = context + "</div></div>";
        }
    context = context + "</div>";
    }   
    return context;
}



