function setPlayerShips()
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
					var jsonMatrPlayer = jsonShip.game[0].ships;
					for (var i = 0; i < 10; i++)
					{
						for (var j = 0; j < 10; j++)
						{
							var deck = getDeck(i + '_' + j,jsonMatrPlayer);
							if (deck == '1' || deck == '2' || deck =='3' || deck == '4')
							{
								$('#' + i + '_' + j).addClass('hereShip')
							}
						}
					}
				}
		}
}
$(document).ready(function(){
	setPlayerShips();
});

function getDeck(name, inputJson)
{
	var matr = inputJson;
	var index = matr.indexOf(name);
	var ch = "";
	var indBegin
	for (var i = index; i < matr.length; i++)
	{
		ch = matr[i];
		if (ch === "!")
		{
			indBegin = i + 1;
			break;
		}
	}
	if (matr === "")
		return matr;
	var deck = "";
	ch = "";
	ch = matr[indBegin];
	while (ch != "!")
	{
		deck += matr[indBegin];
		indBegin++;
		ch = matr[indBegin];
	}
	return deck;
}
