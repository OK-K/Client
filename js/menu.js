$('#logBut').on('click', function (e) {
			login = $('#login').val();
			
			if ($('#login').val() == '')
			{
				$('#labelLogin').html("Введите логин!");
				return;
			}
			superLogin = login;
			//var login = $('#login').val();
			sendLogin = new XMLHttpRequest();
			sendLogin.open('POST', 'sendLogin', true);
			sendLogin.send('login=!' + login + "!");
			sendLogin.onreadystatechange = function() {

			if (sendLogin.readyState == 4) {
				if (sendLogin.responseText == "1")
				{
					 document.location.href = "../pages/mainMenu.html";
					
					 document.cookie = "login=!" + $('#login').val() + "!mode=!none!save=!none!lose=!none!; path=/; expires="
					 return;
				} if (sendLogin.responseText == "wrong")
				{
					$('#labelLogin').html("В системе уже есть игрок с таким логином!");
					return;
				}
			}
			};
			//document.location.href = "mainMenu.html";
});
$('#reestablishButt').on('click', function (e) {
	//document.location.href = "../pages/chooseSave.html";
});
$('#mainMenuButt').on('click', function (e) {
	
	document.location.href = "../pages/mainMenu.html";
		
	
});

$('#playAgain').on('click', function (e) {
	var newLogin = getCook('login');
	var mode = getCook('mode');
		if (mode == 'playerwithplayer' && !error)
		{
			document.cookie = "login=!" + newLogin + "!mode=!none!save=!none!lose=!none!; path=/; expires=";
			document.location.href = "../pages/playMenu.html";
			return;
		}
	var nameJson = "new_" + getCook('login') + ".json";
	document.cookie = "login=!" + newLogin + "!mode=!none!save=!none!lose=!you!; path=/; expires=";
	getShips=new XMLHttpRequest();
	
    getShips.open('GET','../json/' + nameJson,true);
    getShips.send();
	getShips.onreadystatechange=function() 
		{
			if (getShips.readyState==4)
				{ 
				    //var jsonShip=eval( '('+getShips.responseText+')' );
					var lvl = getDeck('lvl',getShips.responseText);
					
					deleteGame = new XMLHttpRequest();
					deleteGame.open('POST', '../deleteGame', true);
					deleteGame.send('login=!' + getCook('login') + "!");
					deleteGame.onreadystatechange = function() {

					if (deleteGame.readyState == 4) {
						if (deleteGame.responseText == "1")
						{
							sendComplexity = new XMLHttpRequest();
							sendComplexity.open('POST', '../sendComplexity', true);
							sendComplexity.send('level=!' + lvl + '!' + 'login=!' + getCook("login") + "!");
							sendComplexity.onreadystatechange = function() {

							if (sendComplexity.readyState == 4) {
								if (sendComplexity.responseText == "1")
								{
									 document.location.href = "../pages/playerShip.html";
								}
							}
							};
						}
					}
					}
				}
		}

});
$('#endGame').on('click', function (e) {
	
	var newLogin = getCook('login');
	document.cookie = "login=!" + newLogin + "!mode=!none!save=!none!lose=!you!; path=/; expires=";
	document.location.href = "../pages/endOfGame.html";
	
});
$('#playButt').on('click', function (e) {
	
	document.location.href = "../pages/playMenu.html";
	
});
$('#returnMainMenuButt').on('click', function (e) {
	document.location.href = "../pages/mainMenu.html";
});
$('#newGameButt').on('click', function (e) {
	deleteGame = new XMLHttpRequest();
	deleteGame.open('POST', '../deleteGameSave', true);
	deleteGame.send('login=!' + getCook('login') + "!");
	deleteGame.onreadystatechange = function() {

	if (deleteGame.readyState == 4) {
		if (deleteGame.responseText == "1")
		{
			var newLogin = getCook('login');
			document.cookie = "login=!" + newLogin + "!mode=!none!save=!none!lose=!none!; path=/; expires=";
			document.location.href = "../pages/chooseGameMode.html";
		}
	}
	}
	
});
$('#returnPlayMenu').on('click', function (e) {
	document.location.href = "../pages/playMenu.html";
});
$('#developersButt').on('click', function (e) {
	document.location.href = "../pages/Creators.html";
});
$('#rulesButt').on('click', function (e) {
	document.location.href = "../pages/Rules.html";
});
$('#aboutButt').on('click', function (e) {
	document.location.href = "../pages/AboutSystem.html";
});
$('#compGame').on('click', function (e) {
	document.location.href = "../pages/chooseComplexity.html";
});
$('#returnChooseGameMode').on('click', function (e) {
	document.location.href = "../pages/chooseGameMode.html";
});


$('#playerGame').on('click', function (e) {
	$('#forWaiting').html('Ожидание другого игрока...');
	sendPlayerGame = new XMLHttpRequest();
	sendPlayerGame.open('POST', '../startWaitGame', true);
	sendPlayerGame.send('login=!' + getCook("login") + "!");
	sendPlayerGame.onreadystatechange = function() {

	if (sendPlayerGame.readyState == 4) {
		if (sendPlayerGame.responseText == "1")
		{
			 setInterval(function(){
				 sendPlayerGame1 = new XMLHttpRequest();
				sendPlayerGame1.open('POST', '../startPlayerGame', true);
				sendPlayerGame1.send('login=!' + getCook("login") + "!");
				sendPlayerGame1.onreadystatechange = function() {

				if (sendPlayerGame1.readyState == 4) {
					if (sendPlayerGame1.responseText == "1")
					{
						var newLogin = getCook('login');
						document.cookie = "login=!" + newLogin + "!mode=!playerwithplayer!save=!none!lose=!none!; path=/; expires=";
						document.location.href = "../pages/playerShip.html";
					}
				}
				}
			 },5000);
		}
	}
	};
});
$('#middleComplexity').on('click', function (e) {
			sendComplexity = new XMLHttpRequest();
			sendComplexity.open('POST', '../sendComplexity', true);
			sendComplexity.send('level=!1!' + 'login=!' + getCook("login") + "!");
			sendComplexity.onreadystatechange = function() {

			if (sendComplexity.readyState == 4) {
				if (sendComplexity.responseText == "1")
				{
					 document.location.href = "../pages/playerShip.html";
				}
			}
			};
});

$('#hardComplexity').on('click', function (e) {
			sendComplexity = new XMLHttpRequest();
			sendComplexity.open('POST', '../sendComplexity', true);
			sendComplexity.send('level=!2!' + 'login=!' + getCook("login") + "!");
			sendComplexity.onreadystatechange = function() {

			if (sendComplexity.readyState == 4) {
				if (sendComplexity.responseText == "1")
				{
					 document.location.href = "../pages/playerShip.html";
				}
			}
			};
});

$('#goBack').on('click', function (e) {
	document.location.href = "../pages/playMenu.html";
});
$('#impossibleComplexity').on('click', function (e) {
			sendComplexity = new XMLHttpRequest();
			sendComplexity.open('POST', '../sendComplexity', true);
			sendComplexity.send('level=!3!' + 'login=!' + getCook("login") + "!");
			sendComplexity.onreadystatechange = function() {

			if (sendComplexity.readyState == 4) {
				if (sendComplexity.responseText == "1")
				{
					 document.location.href = "../pages/playerShip.html";
				}
			}
			};
});



$('#reestablishButt').on('click', function (e) {
	checkSave = new XMLHttpRequest();
	var login = getCook('login');
	checkSave.open('POST', '../checkSave', true);
	checkSave.send('login=!' + login + "!");
	checkSave.onreadystatechange = function() {

	if (checkSave.readyState == 4) {
		if (checkSave.responseText == "1")
		{
			var login = getCook('login');
			//document.cookie = "login=!" + login + "!save=!yes!";
			
			document.cookie = "login=!" + login + "!mode=!none!save=!yes!lose=!none!; path=/; expires="
			document.location.href = "../pages/game.html";
		}  else alert('Сохраненного файла на сервере нет!');
		}
	}
	
});


function getDeck(name, inputJson)
{
	var matr = inputJson;
	var index = matr.lastIndexOf(name);
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

function getCook (name)
{
	var cook = document.cookie;
	var index = cook.indexOf(name);
	var ch = "";
	var indBegin
	for (var i = index; i < cook.length; i++)
	{
		ch = cook[i];
		if (ch === "!")
		{
			indBegin = i + 1;
			break;
		}
	}
	if (cook === "")
		return cook;
	var cookie = "";
	ch = "";
	ch = cook[indBegin];
	while (ch != "!")
	{
		cookie += cook[indBegin];
		indBegin++;
		ch = cook[indBegin];
	}
	return cookie;
}