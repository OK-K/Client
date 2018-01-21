choose = false;

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
	changeShipsRequest = "";
	countChangeShips = 0;
	choose = false;
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
	
	changeShips=new XMLHttpRequest();
	var name = getCook('login');
    changeShips.open('POST','../changeShipByPlayer',true);
    changeShips.send("login=!" + name + "!" + changeShipsRequest);
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


$('#pl > table td').on('dblclick', function () {
	if (!choose)
	{
		if (!($(this).hasClass('hereShip')))
			return;
		old_id = $(this).attr('id');
		deck_now = getDeck(old_id,changeShipsRequest);
		if (deck_now == '6')
			deck_now = getDeck(old_id,jsonMatrPlayer);
		
		if (deck_now == '1')
		{
			return;
		}
		changeOrientation();
	}
});
//событие нажатия кнопки
$('#pl > table td').on('click', function () {
	 
	if (!choose)
	{
		if (!($(this).hasClass('hereShip')))
		 return;
		old_id = $(this).attr('id');
		choose = true;
		firstMove = false;
		leave_id = 0;
		previous_id = old_id;
		previous_true_id = old_id;
		orient = false;
		deck_now = getDeck(old_id,changeShipsRequest);
		x_new = 0;
		x_old = 0;
		
		if (deck_now == '6')
			deck_now = getDeck(old_id,jsonMatrPlayer);
		
		if (deck_now == '1')
		{
			return;
		}
		
		else
		{
			countDifferenceExtremeCurrent = getFirstDeck(old_id,deck_now);
			return;
		}
	} else 
	{
		
		if ($('#pl > table td').hasClass('missing'))
		{
			return;
		}
		choose = false;
		countChangeShips++;
		changeShipsRequest  += 'deck=!' + deck_now + '!old!' + getPointsOfShip(old_id,5) + '!new!' + getPointsOfShip($(this).attr('id'),deck_now) + 'count!=' + countChangeShips + '!';
		return;
	}
});


//событие наведения на клетку 
$("table td").hover(function(){
			if (!choose)
				return;
			new_id = $(this).attr('id');
			var vall = findNearBorderPoint(previous_id);
			//у верхнего края
			if (vall == 0)
			{
				getCurrentPoint(previous_id);
				x_old = currentX;
				getCurrentPoint(new_id);
				x_new = currentX;
				
				if (x_new < x_old)
				{
					alert('КОРАБЛЬ ВЫШЕЛ ЗА КРАЙ ПОЛЯ!');
					choose = false;
					setNewShip(old_id,'hereShip');
					return;
				}
			}
			
			//у нижнего края
			if (vall == 2)
			{
				getCurrentPoint(previous_id);
				x_old = currentX;
				getCurrentPoint(new_id);
				x_new = currentX;
				
				if (x_new > x_old)
				{
					alert('КОРАБЛЬ ВЫШЕЛ ЗА КРАЙ ПОЛЯ!');
					choose = false;
					setNewShip(old_id,'hereShip');
					return;
				}
			}
			
			//у левого края
			if (vall == 1)
			{
				getCurrentPoint(previous_id);
				x_old = currentY;
				getCurrentPoint(new_id);
				x_new = currentY;
				
				if (x_new < x_old)
				{
					alert('КОРАБЛЬ ВЫШЕЛ ЗА КРАЙ ПОЛЯ!');
					choose = false;
					setNewShip(old_id,'hereShip');
					return;
				}
			}
			
			//у правого края
			if (vall == 3)
			{
				getCurrentPoint(previous_id);
				x_old = currentY;
				getCurrentPoint(new_id);
				x_new = currentY;
				
				if (x_new > x_old)
				{
					alert('КОРАБЛЬ ВЫШЕЛ ЗА КРАЙ ПОЛЯ!');
					choose = false;
					setNewShip(old_id,'hereShip');
					return;
				}
			}
			
			previous_id = new_id;
			
			//countDifferenceExtremeCurrent = getFirstDeck(old_id,deck_now);
			if(leave_id != 0)
			{
				if(leave_class == 'hereShip')
					$('#' + leave_id).removeClass('hereShip');
				if(leave_class == 'missing')
					$('#' + leave_id).removeClass('missing');
				leave_id = 0;
			}
			if ($(this).hasClass('hereShip') || checkAllDecks($(this).attr('id'))) 
			{
				if (deck_now == '1')
				{
					$(this).addClass('missing');
					return;
				} else 
				{
					setNewShip($(this).attr('id'),'missing');
					return;
				}
			}
			
			if (deck_now == '1')
			{
				$(this).addClass('hereShip');
				test_check = true;
				
				if (!firstMove)
				{
					$('#' + old_id).removeClass('hereShip');
					firstMove = true;
				}
			} else 
			{
				setNewShip($(this).attr('id'),'hereShip');
				
				
			}
			
		}, function(){
			if (!choose)
				return;
			//countDifferenceExtremeCurrent = getFirstDeck($(this).attr('id'),deck_now);
			if ($(this).hasClass('missing')) //добавить реализацию с палубами больше 1
			{
				if (deck_now == '1')
				{
					$(this).removeClass('missing');
					leave_id = $(this).attr('id');
					leave_class = 'missing';
					return;
				} else 
				{
					if (!gorizontal)
				{
					getCurrentPoint($(this).attr('id'));
					currentX = currentX - countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('missing');
						countCurrentDeck++;
						currentX++;
						
					}
				} else 
				{
					getCurrentPoint($(this).attr('id'));
					currentY = currentY + countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('missing');
						countCurrentDeck++;
						currentY--;
						
					}
				}
					return;
				}
				
			}
			if (deck_now == '1')
			{
				

					$(this).removeClass('hereShip');
					leave_id = $(this).attr('id');
					leave_class = 'hereShip';
					
			} else 
			{
				
				if (!gorizontal)
				{
					getCurrentPoint($(this).attr('id'));
					currentX = currentX - countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('hereShip');
						countCurrentDeck++;
						currentX++;
						
					}
				} else 
				{
					getCurrentPoint($(this).attr('id'));
					currentY = currentY + countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('hereShip');
						countCurrentDeck++;
						currentY--;
						
					}
				}
			}
			
		});


//переводим текущий выбранный id в числа
function getCurrentPoint(id)
{
	currentX = 0;
	currentY = 0;
	
	for (var i = 0; i < 10; i++)
	{
		currentX = i;
		for (var j = 0; j < 10; j++)
		{
			currentY = j;
			var str = "" + currentX + "_" + currentY;
			if (str == id)
			{
				return;
			}
		}
	}
} 
//узнаем ориентацию корабля
function getOrientation(id)
{
	x = 0;
	y  = 0;
	var checkEnd = false;
	gorizontal = false;
	for (var i = 0; i < 10; i++)
	{
		if (checkEnd)
			break;
		x = i;
		for (var j = 0; j < 10; j++)
		{
			y = j;
			var str = "" + x + "_" + y;
			if (str == id)
			{
				checkEnd = true;
				break;
			}
		}
	}
	
	if ($('#' + (x - 1) + '_' + y).hasClass('hereShip') && x != 0 || $('#' + (x + 1) + '_' + y).hasClass('hereShip'))
	{
		gorizontal = false;
		return;
	} 
	
	if ($('#' + x + '_' + (y + 1)).hasClass('hereShip') || $('#' + x + '_' + (y - 1)).hasClass('hereShip'))
	{
		gorizontal = true;
		return;
	} 
}

//узнаем количество клеток от наажатой палубы до крайней
function getFirstDeck(id,deck)
{
	getOrientation(id);
	var countDifferenceExtremeCurrent = 0;
	if (!gorizontal)
	{
		while($('#' + (x - 1) + '_' + y).hasClass('hereShip'))
		{
			x--;
			countDifferenceExtremeCurrent++;
		}
		
		
	} else 
	{
		while($('#' + x + '_' + (y + 1)).hasClass('hereShip'))
		{
			y++;
			countDifferenceExtremeCurrent++;
		}
	}
	return countDifferenceExtremeCurrent;
}

//ставим выбранный корабль в выбранное место
function setNewShip(idCurrentPoint,setClass)
{
	if (!gorizontal)
				{
					if (!firstMove)
					{
						getCurrentPoint(old_id);
						currentX = currentX - countDifferenceExtremeCurrent;
						var countCurrentDeck = 0;
						while(countCurrentDeck != deck_now)
						{
							$('#' + currentX + '_' + currentY).removeClass('hereShip');
							countCurrentDeck++;
							currentX++;
							
						}
						firstMove = true;
					}
					
					getCurrentPoint(idCurrentPoint);
					currentX = currentX - countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).addClass(setClass);
						countCurrentDeck++;
						currentX++;
						
					}
					
				} else 
				{
					if (!firstMove)
					{
						getCurrentPoint(old_id);
						currentY = currentY + countDifferenceExtremeCurrent;
						var countCurrentDeck = 0;
						while(countCurrentDeck != deck_now)
						{
							$('#' + currentX + '_' + currentY).removeClass('hereShip');
							countCurrentDeck++;
							currentY--;
							
						}
						firstMove = true;
					}
					
					getCurrentPoint(idCurrentPoint);
					currentY = currentY + countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).addClass(setClass);
						countCurrentDeck++;
						currentY--;
						
					}
					
					
				}
}

//проверка близ лежащих кораблей рядом с выбранным кораблем
function checkAllDecks(idCurrentPoint)
{
	var check = false;
	if (deck_now == '1')
	{
		getCurrentPoint(idCurrentPoint);
		
		if($('#' + currentX + '_' + currentY).hasClass('hereShip') || $('#' + (currentX-1) + '_' + currentY).hasClass('hereShip') || $('#' + (currentX+1) + '_' + currentY).hasClass('hereShip') || $('#' + currentX + '_' + (currentY-1)).hasClass('hereShip') || $('#' + currentX + '_' + (currentY+1)).hasClass('hereShip') || $('#' + (currentX -1) + '_' + (currentY - 1)).hasClass('hereShip') || $('#' + (currentX + 1) + '_' + (currentY + 1)).hasClass('hereShip') || $('#' + (currentX-1) + '_' + (currentY+1)).hasClass('hereShip') || $('#' + (currentX+1) + '_' + (currentY-1)).hasClass('hereShip'))
			{
				check = true;
				return check;
			}
		
	} else 
	if (!gorizontal)
		{
			getCurrentPoint(idCurrentPoint);
			currentX = currentX - countDifferenceExtremeCurrent;
			var countCurrentDeck = 0;
			while(countCurrentDeck != deck_now)
			{
				if($('#' + currentX + '_' + currentY).hasClass('hereShip') || $('#' + (currentX-1) + '_' + currentY).hasClass('hereShip') || $('#' + (currentX+1) + '_' + currentY).hasClass('hereShip') || $('#' + currentX + '_' + (currentY-1)).hasClass('hereShip') || $('#' + currentX + '_' + (currentY+1)).hasClass('hereShip') || $('#' + (currentX -1) + '_' + (currentY - 1)).hasClass('hereShip') || $('#' + (currentX + 1) + '_' + (currentY + 1)).hasClass('hereShip') || $('#' + (currentX-1) + '_' + (currentY+1)).hasClass('hereShip') || $('#' + (currentX+1) + '_' + (currentY-1)).hasClass('hereShip'))
				{
					check = true;
					return check;
				}
				countCurrentDeck++;
				currentX++;
						
			}
					
		} 
		else 
			{
				getCurrentPoint(idCurrentPoint);
				currentY = currentY + countDifferenceExtremeCurrent;
				var countCurrentDeck = 0;
				while(countCurrentDeck != deck_now)
				{
					if($('#' + currentX + '_' + currentY).hasClass('hereShip') || $('#' + (currentX-1) + '_' + currentY).hasClass('hereShip') || $('#' + (currentX+1) + '_' + currentY).hasClass('hereShip') || $('#' + currentX + '_' + (currentY-1)).hasClass('hereShip') || $('#' + currentX + '_' + (currentY+1)).hasClass('hereShip') || $('#' + (currentX -1) + '_' + (currentY - 1)).hasClass('hereShip') || $('#' + (currentX + 1) + '_' + (currentY + 1)).hasClass('hereShip') || $('#' + (currentX-1) + '_' + (currentY+1)).hasClass('hereShip') || $('#' + (currentX+1) + '_' + (currentY-1)).hasClass('hereShip'))
					{
						check = true;
						return check;
					}	
					countCurrentDeck++;
					currentY--;
						
				}
				
			}
			return check;
}

function checkAllDecksFromBorder(idCurrentPoint)
{
	var check = false;
	if (!gorizontal)
		{
			getCurrentPoint(idCurrentPoint);
			currentX = currentX - countDifferenceExtremeCurrent;
			var countCurrentDeck = 0;
			while(countCurrentDeck != deck_now)
			{
			if((currentX-1) < 0 || (currentX+1) > 9 || (currentY-1) < 0 || (currentY+1) > 9)
				{
					check = true;
					return check;
				}
				countCurrentDeck++;
				currentX++;
						
			}
					
		} 
		else 
			{
				getCurrentPoint(idCurrentPoint);
				currentY = currentY + countDifferenceExtremeCurrent;
				var countCurrentDeck = 0;
				while(countCurrentDeck != deck_now)
				{
					if((currentX-1) < 0 || (currentX+1) > 9 || (currentY-1) < 0 || (currentY+1) > 9)
					{
						check = true;
						return check;
					}	
					countCurrentDeck++;
					currentY--;
						
				}
				
			}
			return check;
}

//запись координат коробля в строку
function getPointsOfShip(idPoint, deck)
{
	
	var points = "";
	if (deck_now == '1')
	{
		getCurrentPoint(idPoint);
		points+= 'pX=!' + currentX + '!pY=!' + currentY + '!' + currentX + '_' + currentY + '=!' + deck + '!';
		return points;
		
		
	} else 
		getOrientation(idPoint);
	if (!gorizontal)
		{
			getCurrentPoint(idPoint);
			currentX = currentX - countDifferenceExtremeCurrent;
			var countCurrentDeck = 0;
			while(countCurrentDeck != deck_now)
			{
				points+= 'pX=!' + currentX + '!pY=!' + currentY + '!' + currentX + '_' + currentY + '=!' + deck + '!';
				countCurrentDeck++;
				currentX++;
						
			}
					
		} 
		else 
			{
				getCurrentPoint(idPoint);
				currentY = currentY + countDifferenceExtremeCurrent;
				var countCurrentDeck = 0;
				while(countCurrentDeck != deck_now)
				{
					points+= 'pX=!' + currentX + '!pY=!' + currentY + '!' + currentX + '_' + currentY + '=!' + deck + '!';
					countCurrentDeck++;
					currentY--;
						
				}
				
			}
			return points;
}

$("table").mouseleave(function(){
	if (choose)
	{
		if (deck_now == '1')
		{
			if(leave_class == 'hereShip')
				$('#' + leave_id).addClass('hereShip');
			if(leave_class == 'missing')
				$('#' + leave_id).addClass('missing');
		}
		else 
		{
			if (orient)
			{
				if (gorizontal)
					gorizontal = false;
				else gorizontal = true;
				orient = false;
			}
			choose = false;
			setNewShip(old_id,'hereShip');
			alert('КОРАБЛЬ ВЫШЕЛ ЗА КРАЙ ПОЛЯ!');
		}
	}
});

//узнаем, есть ли палубы рядом с границей - если есть, возвращаем 0 или 1 (i = 0 или j = 0)
function findNearBorderPoint(id)
{
	//getOrientation(id);
	if (!gorizontal)
		{
			getCurrentPoint(id);
			currentX = currentX - countDifferenceExtremeCurrent;
			var countCurrentDeck = 0;
			while(countCurrentDeck != deck_now && currentX != 0 && currentY != 0 && currentY != 9 && currentX != 10)
			{
				countCurrentDeck++;
				currentX++;	
			}		
		} 
		else 
			{
				getCurrentPoint(id);
				currentY = currentY + countDifferenceExtremeCurrent;
				var countCurrentDeck = 0;
				while(countCurrentDeck != deck_now && currentX != 0 && currentY != -1 && currentY != 9 && currentX != 9)
				{
					countCurrentDeck++;
					currentY--;
				}
			}
			if (currentX == 0)
				return 0;
			if (currentX == 10)
				return 2;
			if (currentY == -1)
				return 1;
			if (currentY == 9)
				return 3;
			else return 4;
	
}

function changeOrientation()
{
	getOrientation(old_id);
	firstMove = true;
	//сейчас корабль вертикальный
	if (!gorizontal)
		{
			getCurrentPoint(old_id);
			
			var place = 0;
			while (place != deck_now)
			{
				place++;
				currentY--;
			}
			//если есть место слева
			if (currentY + 1 >= 0)
			{
					getCurrentPoint(old_id);
					currentX = currentX - countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('hereShip');
						countCurrentDeck++;
						currentX++;
						
					}
					gorizontal = true;
					getCurrentPoint(old_id);
					new_y = currentY - countDifferenceExtremeCurrent;
					if ($('#' + old_id).hasClass('hereShip') || checkAllDecks(currentX + '_' + new_y)) 
					{
						getCurrentPoint(old_id);
						new_y = currentY - countDifferenceExtremeCurrent;
						choose = true;
						orient = true;
						setNewShip(currentX + '_' + new_y,'missing');
						return;
					} else 
					{
						getCurrentPoint(old_id);
						new_y = currentY - countDifferenceExtremeCurrent;
						setNewShip(currentX + '_' + new_y,'hereShip');
						return;
					}
			} else 
			{
					getCurrentPoint(old_id);
					currentX = currentX - countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('hereShip');
						countCurrentDeck++;
						currentX++;
						
					}
					getCurrentPoint(old_id);
					gorizontal = true;
					if ($('#' + old_id).hasClass('hereShip') || checkAllDecks(old_id)) 
					{
						choose = true;
						orient = true;
						getCurrentPoint(old_id);
						var new_y = currentY + place - 1;
						setNewShip(currentX + '_' + new_y,'missing');
						return;
					} else 
					{
						getCurrentPoint(old_id);
						var new_y = currentY + place - 1;
						setNewShip(currentX + '_' + new_y,'hereShip');
						return;
					}
			}
		} 
		else 
			{
				getCurrentPoint(old_id);
			
				var place = 0;
				while (place != deck_now)
				{
					place++;
					currentX--;
				}
				//если есть место сверху
			if (currentX + 1 >= 0)
			{
					getCurrentPoint(old_id);
					currentY = currentY + countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('hereShip');
						countCurrentDeck++;
						currentY--;
						
					}
					gorizontal = false;
					getCurrentPoint(old_id);
					new_x = currentX + countDifferenceExtremeCurrent;
					if ($('#' + old_id).hasClass('hereShip') || checkAllDecks(new_x + '_' + currentY)) 
					{
						getCurrentPoint(old_id);
						var new_x = currentX + place - 1;
						choose = true;
						orient = true;
						setNewShip(new_x + '_' + currentY,'missing');
						return;
					} else 
					{
						getCurrentPoint(old_id);
						var new_x = currentX + place - 1;
						setNewShip(new_x + '_' + currentY,'hereShip');
						return;
					}
			}else 
			{
					getCurrentPoint(old_id);
					currentY = currentY + countDifferenceExtremeCurrent;
					var countCurrentDeck = 0;
					while(countCurrentDeck != deck_now)
					{
						$('#' + currentX + '_' + currentY).removeClass('hereShip');
						countCurrentDeck++;
						currentY--;
						
					}
					getCurrentPoint(old_id);
					gorizontal = false;
					if ($('#' + old_id).hasClass('hereShip') || checkAllDecks(old_id)) 
					{
						choose = true;
						orient = true;
						getCurrentPoint(old_id);
						
						new_x = currentX + countDifferenceExtremeCurrent;
						setNewShip(new_x + '_' + currentY,'missing');
						return;
					} else 
					{
						getCurrentPoint(old_id);
						new_x = currentX + countDifferenceExtremeCurrent;
						setNewShip(new_x + '_' + currentY,'hereShip');
						return;
					}
			}
			}
	
}