$('#logBut').on('click', function (e) {

			if ($('#login').val() == '')
			{
				$('#labelLogin').html("Введите логин!");
				return;
			}
			var login = $('#login').val();
			sendLogin = new XMLHttpRequest();
			sendLogin.open('POST', 'sendLogin', true);
			sendLogin.send('login=!' + login + "!");
			sendLogin.onreadystatechange = function() {

			if (sendLogin.readyState == 4) {
				if (sendLogin.responseText == "1")
				{
					 document.location.href = "../pages/mainMenu.html";
					  document.cookie = "login=!" + $('#login').val() + "!";
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