jQuery(document).ready(function($) {
	initPlayer();
	getSongs();
});
var audio = document.getElementById("player")
var music;

function initPlayer()
{
	$('#shuffle').click(function() {
		$("#playlist").empty();
		console.log(shuffle(music.songs));
		genList(music);
		playsong(0);
	});
}

function getSongs()
{
	$.getJSON('js/app.json',function(mjson){
		music = mjson;
		genList(music);
	});
}

function playsong(id)
{
	var long = music.songs;
	if (id >= long.length)
	{
		audio.pause();
	}
	else
	{
		$("#img-albun").attr("src", music.songs[id].image);
		$("#player").attr("src", music.songs[id].song);
		audio.play();
		scheduleSong(id);
		$("ul li#"+id).addClass('Active');
	}
}

function genList(music)
{
	$.each(music.songs, function(i, song)
	{
		$("#playlist").append("<li class='list-group-item' id='"+i+"'>"+song.name+"</li>")
	});
	$("#playlist li").click(function()
	{
		var selectedsong = $(this).attr("id");
		if ($("#playlist li").hasClass('Active'))
		{
			$("#playlist li.Active").removeClass('Active');
		}
		playsong(selectedsong);
		
	});
}

function scheduleSong(id)
{
	audio.onended = function()
	{
		$("ul li#"+id).removeClass('Active');
		playsong(parseInt(id)+1);
	}
}

function shuffle(array)
{
	for (var random, temp, position = array.length; position; random= Math.floor(Math.random()*position, temp = array[--position], array[position] = array[random], array[random] = temp));
	return array;
}