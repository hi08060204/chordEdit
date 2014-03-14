var player;

function onYouTubeIframeAPIReady() {
    $('#submit').click(function() {                    
        document.getElementById("submit").innerHTML = "<i class='icon-refresh icon-spin'></i> Submit";        
        $.ajax({
            url: "/chordEdit/download",
            type: 'GET',
            data: {'YTurl': $('#YTurl').val()},

            success: function(data) {
                document.getElementById("submit").innerHTML = " Submit";      
                console.log(data);
                player = new YT.Player('player', {
                    height: '300',
                    width: '480',
                    videoId: data,
                    events: {
                    'onReady': onPlayerReady,
                    },
                });
            } 
        
        });
    });
}   


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
