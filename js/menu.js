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
$('#playButt').on('click', function (e) {
	document.location.href = "../pages/playMenu.html";
});
$('#returnMainMenuButt').on('click', function (e) {
	document.location.href = "../pages/mainMenu.html";
});
$('#newGameButt').on('click', function (e) {
	document.location.href = "../pages/chooseGameMode.html";
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