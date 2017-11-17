//The Game - Computer
var computerModule = (function(){

	//Changes sign from player to computer and vice versa
	function changeSign(sign) {
		var compSign;
		(sign === "X") ? compSign = "O" : compSign = "X";
		return compSign;
	}

	//Computer to prevent player from winning
	function putSign(direction,pos,arr,flag) {
		if(direction === "down")					//case 1
		{
			console.log(pos);
			for(var i=0;i<3;i++)
			{
				if(!arr[i][pos])
				{
					flag[i][pos] = 1;
					return `${i}${pos}`;
				}
			}
		}
		else if(direction === "side")				//case 2
		{
			for(let j=0;j<3;j++)
			{
				if(!arr[pos][j])
				{
					flag[pos][j] = 1;
					return `${pos}${j}`;
				}
			}
		}
		else if(direction === "diag")			
		{

			let i=0;
			if(pos===0)								//case 3
			{
				while(i<3)
				{
					if(!arr[i][pos])
					{
						flag[i][pos] = 1;
						return `${i}${pos}`;
					}
					i++;
					pos++;
				}
			}
			else     								//case 4 
			{
				i=0;
				while(i<2)
				{
					if(!arr[i][pos])
					{
						flag[i][pos] = 1;
						return `${i}${pos}`;
					}
					i++;
					pos--;
				}
			}
		}
	}

	//Generating position to insert for computer
	function generateRandomPos(flag,arr,sign,method) {
		var count=0,countFlag=0;
		var randomNumber1,randomNumber2;
		flag.forEach(function(el){
			el.forEach(function(el2){
				if(el2===1)
					countFlag++;
			})
		});
		if(countFlag < 9)
		{
			(sign === "X") ? playSign = "O" : playSign = "X";
			for(let i=0;i<3;i++)						//case 1 - down
			{
				
				if(i===0)
				{
					for(let j=0;j<3;j++)
					{
						let count = 0,countAll=0,countWin=0;
						for(let iEq=0;iEq<3;iEq++)
						{
							if(arr[iEq][j] === playSign)
								count++;
							if(arr[iEq][j])
								countAll++;
							if(arr[iEq][j] === sign)
							{
								console.log(i,j);
								countWin++;
							}
						}
						if(!method)
						{
							if(count===2 && countAll!=3)
								return putSign("down",j,arr,flag);
						}
						else if(method === "check")
						{
							if(countWin === 3)
								return "You Won";
						}
						else if(method === "toWin")
						{
							if(countWin === 2 && countAll!=3)
							{
								console.log(j);
								return putSign("down",j,arr,flag);
							}
						}
					}
				}
			}
			for(let j=0;j<3;j++)						//case 2 - side
			{
				
				if(j===0)
				{
					for(let i=0;i<3;i++)
					{
						let count = 0,countAll = 0,countWin=0;
						for(let jEq=0;jEq<3;jEq++)
						{
							if(arr[i][jEq] === playSign)
								count++;
							if(arr[i][jEq])
								countAll++;
							if(arr[i][jEq] === sign)
							{
								console.log(i,j);
								countWin++;
							}
						}
						if(!method)
						{
							if(count===2 && countAll!=3)
								return putSign("side",i,arr,flag);
						}
						else if (method === "check")
						{
							if(countWin==3)
								return "You Won";
						}
						else if(method === "toWin")
						{
							if(countWin === 2 && countAll!=3)
							{
								console.log(j);
								return putSign("side",i,arr,flag);
							}
						}
					}
				}
			}
			for(let jEq=0;jEq<3;jEq++)
			{
				let i=0;
				if(jEq===0)								//case 3 - diagRight
				{
					let count = 0,countAll = 0,countWin=0;
					let j =0;
					while(i<3)
					{
						console.log(i);
						
						if(arr[i][j] === playSign)	
							count++;
						if(arr[i][j])
							countAll++;
						if(arr[i][j] === sign)	
						{
							console.log(i,j);
							countWin++;
						}
						i++;
						j++;

					}
					if(!method)
					{
						if(count===2 && countAll!=3)
							return putSign("diag",jEq,arr,flag);
					}
					else if(method === "check")
					{
						if(countWin===3)
							return "You Won";
					}
					else if(method === "toWin")
					{
						if(countWin === 2 && countAll!=3)
						{
							console.log(jEq);
							return putSign("diag",jEq,arr,flag);
						}
					}
				}
				if(jEq===2)								//case 4 - diagLeft
				{
					let count = 0,countAll = 0,countWin = 0;
					let j =2;
					while(i<3)
					{
						if(arr[i][j] === playSign)	
							count++;
						if(arr[i][j])
							countAll++;
						if(arr[i][j] === sign)	
						{
							console.log(i,j);
							countWin++;
						}
						i++;
						j--;

					}
					if(!method)
					{
						if(count===2 && countAll!=3)
							return putSign("diag",jEq,arr,flag);
					}
					else if(method === "check")
					{
						if(countWin==3)
							return "You Won";
					}
					else if(method === "toWin")
					{
						if(countWin === 2 && countAll!=3)
						{
							console.log(jEq);
							return putSign("diag",jEq,arr,flag);
						}
					}
				}
			}
			console.log(!method);
			if(!method)
			{
				while(count === 0) {				//if none - generateRandomNumber
						randomNumber1 = Math.floor((Math.random() * 3));
						randomNumber2 = Math.floor((Math.random() * 3));
						if(flag[randomNumber1][randomNumber2] === 0)
						{
							flag[randomNumber1][randomNumber2] = 1;
							count = 1;
						}
					}
				return `${randomNumber1}${randomNumber2}`;	
			}	
		}
		else
			return null;
	}

	return {
		changeSign : changeSign,
		generateRandomPos : generateRandomPos
	}

})();

var startGame = function() {
	var playerSign;
	var sign = document.querySelectorAll(".sign");
	var arr= [[ , , ],[ , , ],[ , , ]];
    var flagArr= [[0,0,0],[0,0,0],[0,0,0]];

	function getTheSign(s){						// Getting the initial sign
		var playSign=s.id;
		var getSignDiv = document.getElementById("playAs");
		getSignDiv.style.display = "none";
		var getPlayDiv = document.getElementById("playDiv");
		playDiv.style.display = "inline-block";
		return playSign;
	}

	function updateSign(id,sign) {				//Updating the sign
		arr[id.split('')[0]][id.split('')[1]] = sign;
		flagArr[id.split('')[0]][id.split('')[1]] = 1;
		console.log(arr,flagArr);
	}


	sign.forEach(function(s){					//Event Listener for assigning the sign
		s.addEventListener("click",function(){
			playerSign = getTheSign(s);
		})
	});

	var tiles = document.querySelectorAll("td");

	tiles.forEach(function(tile){				//Event Listener for all tiles
		tile.addEventListener("click",function(){
			var id = tile.id;	
			if(flagArr[id.split('')[0]][id.split('')[1]] === 0)					// ID of the clicked tile
				proceedGame(id,tile);
		});
	});

	function proceedGame(id,tile) {				//Start the game
		let computerWon;
		let computerMightWin;
		updateSign(id,playerSign);
		tile.innerHTML = playerSign;

		//check if won
		playerWon = computerModule.generateRandomPos(flagArr,arr,playerSign,"check");
		console.log(playerWon);
		if(playerWon === "You Won")
		{
			console.log("Player Won");
		}
		else
		{
			playerSign = computerModule.changeSign(playerSign); 	//change Sign for computer
			console.log(playerSign);

			//check if it can win
			computerMightWin = computerModule.generateRandomPos(flagArr,arr,playerSign,"toWin");
			console.log(computerMightWin);

			if(!computerMightWin)
			{
				var pos = computerModule.generateRandomPos(flagArr,arr,playerSign,null);	//generate random position
				console.log(pos);
			}
			else
				pos = computerMightWin;

			if(pos)
			{
				var getTD = document.getElementById(pos);
				console.log(getTD);
				getTD.innerHTML = playerSign;							//update the document
				arr[pos[0]][pos[1]] = playerSign;

				//check if won

				computerWon = computerModule.generateRandomPos(flagArr,arr,playerSign,"check");
				console.log(computerWon);

				if(computerWon === "You Won")
				{
					console.log("Computer Won");
					pos=null;
				}
				playerSign = computerModule.changeSign(playerSign); 	//change the sign again
			}
		}

	} 	

};

startGame();