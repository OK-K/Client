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
					jsonMatrPlayer = jsonShip.game[0].ships;
					for (var i = 0; i < 10; i++)
					{
						for (var j = 0; j < 10; j++)
						{
							$('#' + i + '_' + j).removeClass('hereShip')
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
	newMatr = "";
	count = 0;
});

function getDeck(name, inputJson)
{
	var matr = inputJson;
	var index = matr.indexOf(name);
	if (index == -1)
		return '6';
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

$('#change').on('click', function (e) {
	changeShips=new XMLHttpRequest();
	var name = getCook('login');
    changeShips.open('POST','../changeShips',true);
    changeShips.send("login=!" + name + "!");
	changeShips.onreadystatechange=function() 
		{
			if (changeShips.readyState==4)
				{ 
				    if(changeShips.responseText == '1')
					{
						setPlayerShips();
						return;
					}
				}
		}
});
$('#playGame').on('click', function (e) {
	
	runGame=new XMLHttpRequest();
	var name = getCook('login');
    runGame.open('POST','../runGame',true);
    runGame.send("login=!" + name + "!");
	runGame.onreadystatechange=function() 
		{
			if (runGame.readyState==4)
				{ 
				    if(runGame.responseText == '1')
					{
						document.location.href = "/pages/game.html";
					}
					
				}
		}
	
});

 $('#pl > table td').mousedown(function(){
	 if (!($(this).hasClass('hereShip')))
		 return;
	choose = true;
	old_id = $(this).attr('id');
	var new_id = 0;
	var x = 0;
	var y = 0;
	
	for (var i = 0; i < 10; i++)
	{
		for(var j = 0; j < 10; j++)
		{
			str = i + '_' + j;
			if (str == old_id)
			{
				x = i;
				y = j;
				break;
			}
		}
	}
	
	deck_now = getDeck(x + '_' + y,newMatr);
	if (deck_now == '6')
	deck_now = getDeck(x + '_' + y,jsonMatrPlayer);
	
	if (deck_now == '1')
	{
		
	}
	
	
		
	
	
});

$("table td").hover(function(){
			count++;
			if (!choose || deck_now != '1')
				return;
			
			if ($(this).hasClass('hereShip'))
			{
				$(this).addClass('missing');
				return;
			}
			
			if ($(this).attr('id') == old_id)
			{
				$(this).addClass('hereShip');
				return;
			}
			
			$(this).addClass('hereShip');
			$('#' + old_id).removeClass('hereShip');
			
		}, function(){
			if (choose == false || deck_now != '1')
				return;
			
			if ($(this).hasClass('missing'))
			{
				$(this).removeClass('missing');
				return;
			}
			
			$(this).removeClass('hereShip');
			
		});

 $('#pl > table td').mouseup(function(){
	if (choose)
		choose = false;
	else return;
	
	newMatr += $(this).attr('id') + '=!1!' + old_id + '=!0!';
	
	 
 });

function getOrientation()
{
	
}

function getFirstDeck()
{
	
}


