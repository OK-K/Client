
$('#enemy > table td').on('click', function()
{
	var shot_id = $('#enemy > table td').attr('id');
	sendShot = new XMLHttpRequest();
	sendShot.open('POST', '../sendShotAI', true);
	sendShot.send('login=!' + getCook("login") + "!shot=!" + shot_id + "!");
	sendShot.onreadystatechange = function() {

			if (sendShot.readyState == 4) {
				if (sendShot.responseText == "1")
				{
					
					 
				}
			}
			};
});