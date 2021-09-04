//constants and variables
let inputDir = {x:0 , y:0};
let score=0;
const foodSound = new Audio("../food.mp3");
const gameOverSound = new Audio("../gameover.mp3");
const moveSound = new Audio("../move.mp3");
const musicSound= new Audio("../music.mp3");
let speed= 2;
let lastPaintTime= 0;
let snakeArr= [{x:13 , y:15}];
let food={x:10 , y:10};
const board= document.querySelector('#board');

//functions


//main is game loop
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000< (1/speed)){
        return;
    }
    console.log(ctime);
    lastPaintTime=ctime;
    gameEngine();

}

function isCollide(arr){
    return false;
}

function gameEngine(){
//part1: update snake array and food

     if(isCollide(snakeArr)){
        gameOverSound.play();
        moveSound.pause();
        inputDir={x: 0,y: 0};
        alert("Game Over ! Press any key to play again.");
        snakeArr= [{x:13 , y:15}];
        musicSound.play();
        score=0;
     }
    //if snake has eaten then 1) increment score 2) regenerate food 3)increase snake length
    if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y){
      //increase snake length
      snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});//unshift(); adds element to the begining of array whereas push(); adds at the end of array
      //increase score
      score+=10;
      //regenerate food: to generate a random number between a and b => Math.round(a+(b-a)*Math.random())
      let a = 2;
      let b = 16;
      food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //moving snake (update each element of snake array to preceding element ...) &(the head moves in input direction)
    for(let i=snakeArr.length-1;i>0;i--){
        // snakeArr[i]=snakeArr[i-1] will give referencing problem as in js object name are references ...in end evrything will point to one obj
        // method 1: snakeArr[i+1]={...snakeArr[i]}; this creates a new object rather than pointing to same obj
        //method 2:
        snakeArr[i].x=snakeArr[i-1].x;
        snakeArr[i].y=snakeArr[i-1].y;
    }
    //moving head in input direction
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

//part2: display/render snake and food on screen
    //display snake
    board.innerHTML="";  //board is emptied to prevent multiple snakes
    snakeArr.forEach((el,index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food
    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic 
window.requestAnimationFrame(main);//arguments require a function . in that function timestamp is passed .this function callls main once
window.addEventListener("keydown",e => {
    inputDir={x: 0, y: 1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown": 
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight": 
            inputDir.x=1;
            inputDir.y=0;
            break;
        default: break;
    }
});