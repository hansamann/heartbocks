$(document).ready(function () {
	console.log("ready. go change the world.");

	ui();
	sparkSSE();

	$('#heart').click(function(evt){
		console.log("heartclick.");

		$.ajax({
  			type: 'POST',
  			url: "https://api.spark.io/v1/devices/53ff70066667574852492367/heart",
  			data : {'access_token': localStorage.spark_token, 'args' : 'r'},
  			context: $('#heart'),
  			success: function(data, textStatus, jqXHR ) {
  				console.log(data);
  				$(this).css('opacity', '1');
  			}
		});

	});
});

function ui(){
	$('#heart').css('opacity', '0.25');
	$('#heartbeat').css('opacity', '0');
}

function sparkSSE()
{
	if (!localStorage.spark_token)
	{
		var spark_token = prompt("Please enter the Spark Core Access Token: ","");
		if (spark_token == null) //user canceled
		{
			alert("I cannot connect without an access token!");
		}
		else
		{
			localStorage.spark_token = spark_token;
		}
	}

	var url = 'https://api.spark.io/v1/events/?access_token=' + localStorage.spark_token;

	var source = new EventSource(url);

	source.addEventListener('swipe', function(e) {
	  console.log(e.data);
	  $('#heart').css('opacity', '0.25');
	}, false);

	source.addEventListener('heartbeat', function(e) {
	  console.log(e.data);
	  $('#heartbeat').css('opacity', '1');
	  $( "#heartbeat" ).animate({ opacity: 0 }, 5000);	  
	}, false);	

	source.addEventListener('open', function(e) {
	  console.log("SSE channel open.");
	}, false);

	source.addEventListener('error', function(e) {
	  if (e.readyState == EventSource.CLOSED) {
	    console.log("SSE channel broken.");
	  }
	}, false);	
}