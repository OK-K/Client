
$(document).ready(function(){
	var mode = getCook('mode');
	error = false;
	
	if (mode == 'playerwithplayer' && !error)
	{
		checkTurn = new XMLHttpRequest();
		checkTurn.open('POST', '../getTurn', true);
		checkTurn.send('login=!' + getCook("login") + "!");
		checkTurn.onreadystatechange = function() {

			if (checkTurn.readyState == 4) {
				if (checkTurn.responseText == "1")
				{
					$('#message').html('<p >Ожидайте выстрела противника!</p> <br>');
				}
					
				if (checkTurn.responseText == "0")
				{
					$('#message').html('<p >Ваш ход!</p> <br>');
					setShipsAfterShot();
				}
			}
	}
	}
	
	
	/*if (turn2)
	{
		$('#message').html('<p >Ваш ход!</p> <br>');
	} else $('#message').html('<p >Ожидайте выстрела противника!</p> <br>'); */
	
	setInterval(function(){
		if (mode == 'playerwithplayer' && !error)
	{
		checkTurn = new XMLHttpRequest();
		checkTurn.open('POST', '../getTurn', true);
		checkTurn.send('login=!' + getCook("login") + "!");
		checkTurn.onreadystatechange = function() {

			if (checkTurn.readyState == 4) {
				if (checkTurn.responseText == "1")
				{
					setShipsAfterShot();
					$('#message').html('<p >Ожидайте выстрела противника!</p> <br>');
				}
					
				if (checkTurn.responseText == "0")
				{
					$('#message').html('<p >Ваш ход!</p> <br>');
					setShipsAfterShot();
				}
			}
	}
	}
		
	},1500);
	if (mode == 'playerwithplayer')
	{
		/*sendStopWait = new XMLHttpRequest();
		sendStopWait.open('POST', '../clearWaiting', true);
		sendStopWait.send('login=!' + getCook("login") + "!");
		sendStopWait.onreadystatechange = function() {

			if (sendStopWait.readyState == 4) {
				if (sendStopWait.responseText == "1")
				{
					error = false;
				}
			}
		} */
	}
});


$('#saveButt').on('click', function()
{
	saveGame = new XMLHttpRequest();
	saveGame.open('POST', '../saveGame', true);
	saveGame.send('login=!' + getCook("login") + "!");
	saveGame.onreadystatechange = function() {

			if (saveGame.readyState == 4) {
				if (saveGame.responseText == "1")
				{
					alert('Игра сохранена успешно!');
					return;
				}
			}
	}
});

/*function getMyTurn()
{
	turn2 = false;
	var mode = getCook('mode');
	if (mode == 'playerwithplayer' && !error)
	{
		checkTurn = new XMLHttpRequest();
		checkTurn.open('POST', '../getTurn', true);
		checkTurn.send('login=!' + getCook("login") + "!");
		checkTurn.onreadystatechange = function() {

			if (checkTurn.readyState == 4) {
				if (checkTurn.responseText == "1")
				{
					text1 = checkTurn.responseText;
					turn2 = false;
					return;
				}
					
				if (checkTurn.responseText == "0")
				{
					turn2 = true;
					text1 = checkTurn.responseText;
					return;
				}
				return;
			}
			return;
	}
	return;
	}
	return;
} */

$('#enemy > table td').on('click', function()
{
	var mode = getCook('mode');
	var shot_id = $(this).attr('id');
	
	if (mode == 'playerwithplayer')
	{
		
		checkTurn = new XMLHttpRequest();
		checkTurn.open('POST', '../getTurn', true);
		checkTurn.send('login=!' + getCook("login") + "!");
		checkTurn.onreadystatechange = function() {

			if (checkTurn.readyState == 4) {
				if (checkTurn.responseText == "1")
				{
					alert('Сейчас не ваш ход!');
				}
					
				if (checkTurn.responseText == "0")
				{
					setShipsAfterShot();
					//var shot_id = $(this).attr('id');
					sendShot = new XMLHttpRequest();
					sendShot.open('POST', '../sendShotPlayer', true);
					sendShot.send('login=!' + getCook("login") + "!shot=!" + shot_id + "!");
					sendShot.onreadystatechange = function() {
					if (sendShot.readyState == 4) {
					if (sendShot.responseText == "1")
					{
						setShipsAfterShot();
					}
					if (sendShot.responseText == "2")
					{
						setShipsAfterShot();
						$('#message').html('<p >Ожидайте выстрела противника!</p> <br>');
						//getMyTurn();
					}
					if(sendShot.responseText == 'same')
					{
						alert("По этой клетки уже стреляли!");
						
					}
					}
				}
				}
			}
	}
		
		
		
		
		
			
			
		 
	} else  {
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
				if(sendShot.responseText == 'lose=!one!')
				{

					var newLogin = getCook('login');
					document.cookie = "login=!" + newLogin + "!mode=!none!save=!none!lose=!one!; path=/; expires="
					document.location.href = "/pages/endOfGame.html";
					
				}
				if(sendShot.responseText == 'lose=!two!')
				{
					var newLogin = getCook('login');
					document.cookie = "login=!" + newLogin + "!mode=!none!save=!none!lose=!two!; path=/; expires="
					document.location.href = "/pages/endOfGame.html";
					
				}
			}
			};
}
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
							if (deck == '-1' || deck == '-2' || deck =='-3' || deck == '-4')
							{
								$('#' + i + '_' + j).addClass('hitting')
							}
							if( deck == '0')
							{
								$('#' + i + '_' + j).addClass('deadShip');
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
							if (deck == '-1' || deck == '-2' || deck =='-3' || deck == '-4')
							{
								$('#' + i + '_' + j + '_E').addClass('hitting')
							}
							if( deck == '0')
							{
								$('#' + i + '_' + j + '_E').addClass('deadShip');
							}
							if (deck == '-5')
							{
								$('#' + i + '_' + j + '_E').addClass('missing')
							}
						}
					}
					}
				}
				
	/*getTurn = new XMLHttpRequest();
	getTurn.open('POST', '../getTurn', true);
	getTurn.send('login=!' + getCook("login"));
	getTurn.onreadystatechange = function() {

			if (sendShot.readyState == 4) {
				if (sendShot.responseText == "1")
			}
	} */
		}