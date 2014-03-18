var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '480',
        events: {
            'onReady': onPlayerReady,
        },
    });
}

$('#submit').click(function() {                    
    document.getElementById("submit").innerHTML = "<i class='icon-refresh icon-spin'></i> Submit";        
    $.ajax({
        url: "/chordEdit/download",
        type: 'GET',
        data: {'YTurl': $('#YTurl').val()},

        success: function(data) {
            document.getElementById("submit").innerHTML = " Submit";      
            console.log(data);
            player.loadVideoById(data);
            document.getElementById("tab").innerHTML = DrawingTab(8,4,4);
            $('#tab').hide(500);
            $("#tab").show("slow");
        } 
        
    });
});
   


var clock = document.getElementById('clock'); 
function onPlayerReady(event) {
	console.log(clock);
        setInterval(function() {
                var seconds = Math.floor(player.getCurrentTime());
                var mm = Math.floor(seconds / 60);
                var ss = Math.floor(seconds % 60);
                mm = (mm < 10) ? ('0' + String(mm)) : String(mm);
                ss = (ss < 10) ? ('0' + String(ss)) : String(ss);
                clock.innerHTML = mm + ':' + ss;
        }, 100); 
}


function DrawingTab(numRows, beatsPerMeasure, measuresPerRow) { 
    var context = ""; 
    for (var i=0;i < numRows;i++){
        context  = context + "<div class='row-fluid grid-show'>";
        for (var j=0;j < measuresPerRow; j++ ){
            context = context + "<div class='span3'><div class='row-fluid grid-show'>";
            for (var k=1;k <= beatsPerMeasure; k++)
                context = context + "<div class='span3'>" + k.toString() + "</div>";
        
            context = context + "</div></div>";
        }
        context = context + "</div>"
    }   
    return context;
}
