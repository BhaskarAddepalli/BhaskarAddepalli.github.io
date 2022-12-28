const wallArray=[{}];
for(let i=0;i<5;i++)
{
    const maxX=23;
    const maxY=23;
    let wallX=Math.ceil(Math.random()*maxX);
    let wallY=Math.ceil(Math.random()*maxY);
    wallArray.push({wallX,wallY});
}


// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 

let speed = 5;
let lastPaintTime = 0;
let SnakeArray = [
    {x: 10, y: 10}
];

food = {x: 16, y: 8};

function isCollide(snake) {
    console.log(wallArray);
    for (let i = 1; i < SnakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 25 || snake[0].x <=0 || snake[0].y >= 25 || snake[0].y <=0){
        return true;
    }
    for(let i=0;i<5;i++)
    {
        if(snake[0].x==wallArray[i].wallX&&snake[0].y==wallArray[i].wallY) return true;
    }
        
    return false;
}


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
    speed=value;
  }
  
  function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
    speed =value;
  }
function gameEngine(){
    if(c===0){
    if(isCollide(SnakeArray)){
      
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press play to play again!");
        SnakeArray = [{x: 13, y: 15}];
    }

    if(SnakeArray[0].y === food.y && SnakeArray[0].x ===food.x){
        SnakeArray.unshift({x: SnakeArray[0].x + inputDir.x, y: SnakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = SnakeArray.length - 2; i>=0; i--) { 
        SnakeArray[i+1] = {...SnakeArray[i]};
    }
    

    SnakeArray[0].x += inputDir.x;
    SnakeArray[0].y += inputDir.y;

    board.innerHTML = "";
    SnakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    for(let i=0;i<5;i++)
    {
        console.log(wallArray[i]);
        if(wallArray[i].wallX!=food.x && wallArray[i].wallY!=food.y)
        {
            wallEle = document.createElement('div');
            wallEle.style.gridRowStart =wallArray[i].wallY;
            wallEle.style.gridColumnStart = wallArray[i].wallX;
            wallEle.classList.add('wall');
            wallEle.innerHTML="Wall";
        
            board.appendChild(wallEle);
        }
    }
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food')
    board.appendChild(foodElement);
}
else{

}

}


let c=0;
function Play(){
    inputDir = {x: 1, y: 0} // Start the game
    c=0;
}

function Pause(){
   c=1;
   alert("you paused the game,Press Play to continue");
   SnakeArray.forEach((e, index)=>{
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;

       if(index === 0){
           snakeElement.classList.add('head');
       }
       else{
           snakeElement.classList.add('snake');
       }
       board.appendChild(snakeElement);
   });
   // Display the food
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food')
   board.appendChild(foodElement);
  
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    // inputDir = {x: 0, y: 1} // Start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
