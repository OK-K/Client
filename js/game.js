
$('#enemy > table td').on('click', function()
{
	var shot_id = $(this).attr('id');
	sendShot = new XMLHttpRequest();
	sendShot.open('POST', '../sendShotAI', true);
	sendShot.send('login=!' + getCook("login") + "!shot=!" + shot_id + "!");
	sendShot.onreadystatechange = function() {

			if (sendShot.readyState == 4) {
				if (sendShot.responseText == "1")
				{
					setShipsAfterShot();
					 
				}
				if(sendShot.responseText == 'same')
				{
					alert("По этой клетки уже стреляли!");
					
				}
			}
			};
});


function setShipsAfterShot()
{
	getShips=new XMLHttpRequest();
	var nameJson = "new_" + getCook('login') + ".json";
    getShips.open('GET','../json/' + nameJson,true);
    getShips.send();
	getShips.onreadystatechange=function() 
		{
			if (getShips.readyState==4)
				{ 
				    var jsonShip=eval( '('+getShips.responseText+')' );
					jsonMatrPlayer = jsonShip.game[0].ships;
					for (var i = 0; i < 10; i++)
					{
						for (var j = 0; j < 10; j++)
						{
							var deck = getDeck(i + '_' + j,jsonMatrPlayer);
							if (deck == '1' || deck == '2' || deck =='3' || deck == '4')
							{
								$('#' + i + '_' + j).addClass('hereShip')
							}
							if (deck == '-1' || deck == '-2' || deck =='-3' || deck == '-4' || deck == '0')
							{
								$('#' + i + '_' + j).addClass('hitting')
							}
							if (deck == '-5')
							{
								$('#' + i + '_' + j).addClass('missing')
							}
						}
					}
					jsonMatrPlayer = jsonShip.game[1].ships;
					for (var i = 0; i < 10; i++)
					{
						for (var j = 0; j < 10; j++)
						{
							var deck = getDeck(i + '_' + j,jsonMatrPlayer);
							if (deck == '-1' || deck == '-2' || deck =='-3' || deck == '-4' || deck == '0')
							{
								$('#' + i + '_' + j + '_E').addClass('hitting')
							}
							if (deck == '-5')
							{
								$('#' + i + '_' + j + '_E').addClass('missing')
							}
						}
					}
					}
				}
		}