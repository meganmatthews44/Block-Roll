// VARIABLES

// Create variable for canvas element in HTML

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// variable to run animation and check if animation is running 

let animation;
let running = false;

// create variable for DOM manipulation of score element from HTML

const scoreboard = document.getElementById("score")

// create variable for score which we will change when each block is hit 

let score = 0

// variables for win/lose modal

const winLoseTitle = document.getElementById("win-lose-title")
const winLoseMessage = document.getElementById("win-lose-message")
const winLoseScore = document.getElementById("win-lose-score")
const playAgainBtn = document.getElementById("play-again-btn")
const xBtn = document.getElementById("x-btn")



// variables to draw blocks 

const rowCount = 5
const columnCount = 8
const numToWin = rowCount * columnCount
let blockWidth = 54
let blockHeight = 25
const blockPadding = 20
const blockTop = 40
const blockLeft = 40
let blockX;
let blockY;


// created ball array, also holds function to draw ball in canvas when game is started 

const ball = {
    x: 450,
    y: 315,
    vx: -2,
    vy: -2,
    radius: 10,
    color: '#C40BE5',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  };

  // created paddle array, also holds function to draw paddle in canvas

   const paddle = {
       height: 10,
       width: 50,
       x: 300,
       y: 475, // does not change
       color: '#08F946',
       draw: function() {
           ctx.beginPath();
           ctx.rect(this.x, this.y, this.width, this.height);
           ctx.fillStyle = this.color;
           ctx.fill();
           ctx.closePath();
           
       }

   };

   paddle.draw();

// create blocks array based on number of columns and rows 
// block array will hold x axis, y axis, and status of each block

let blocks = [];
for(let c = 0; c < columnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        blocks[c][r] = {x: 0, y: 0, status: 1};
    }
}

// FUNCTIONS


// Function to erase blocks when hit by ball

const eraseBlocks = function() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) { 
            let b = blocks[c][r]; 
            if (b.status === 1) {
                if ((ball.y <= b.y + blockHeight + ball.radius && ball.y >= b.y - ball.radius) && ball.x >= b.x && ball.x <= b.x + blockWidth){

                    ball.vy = -ball.vy
                    b.status = 0;
                    score+=1
                    scoreboard.innerText = (`${score}`)

                    // change color of ball each time it hits a block
                
                    if (ball.color === "#C40BE5") {
                        ball.color = "#FF179F "
                    }  else {
                        ball.color = "#C40BE5"
                    }   

                    // Win alert when all blocks have been hit 
                
                    if (score == numToWin) {
                        winLoseTitle.innerText = (`You Win!`)
                        winLoseMessage.innerText = (`You hit all the blocks!`)
                        winLoseScore.innerText =(`Score: ${score}`)
                        $('#win-lose-modal').modal({ keyboard: true }) 
                        $('#win-lose-modal').modal('show')
                    }
               
                }
            }
        
        }
    }
  };

// Function to draw bricks once game is started   

const drawBlocks = function() {
    for(let c = 0; c < columnCount; c++) {
        for(let r = 0; r < rowCount; r++) {
            if(blocks[c][r].status === 1) {
                blockX = (c * (blockWidth + blockPadding)) + blockLeft;
                blockY = (r * (blockHeight + blockPadding)) + blockTop;
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "#10BAF9";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// function that is called to play game, when click event happens
// moves ball direction when hit walls, hits paddle, or ends game if ball falls to bottom screen 

  function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBlocks();
    ball.draw();
    paddle.draw();
    eraseBlocks();
    ball.x += ball.vx;
    ball.y += ball.vy;
    scoreboard.innerText = (`${score}`)

    // end game if ball falls to bottom off screen, alert of game over

    if(ball.y + ball.vy > canvas.height) {
        winLoseTitle.innerText = (`Game over! You lose!`)
        winLoseMessage.innerText = (`Uh Oh! Looks like your ball hit the ground!`)
        winLoseScore.innerText =(`Score: ${score}`)
        $('#win-lose-modal').modal({ keyboard: true }) 
        $('#win-lose-modal').modal('show') 
        
    }

    // reverses ball direction if ball hits top of screen

    if(ball.y + ball.vy < ball.radius) {
        ball.vy = -ball.vy;
    }

    // reverses ball direction if ball hits sides of screen

    if(ball.x + ball.vx > canvas.width-ball.radius || ball.x +ball.vx < ball.radius) {
        ball.vx = -ball.vx;
    } 

    // Stops paddle from leaving sides of screen

    if (paddle.x <= 0) {
        paddle.x = 0
    }
    if (paddle.x >= (canvas.width-paddle.width)) {
        paddle.x = (canvas.width-paddle.width)
    }

    // reverse direction of ball when ball hits paddle 

    if (ball.y === (paddle.y - ball.radius) && (ball.x >= paddle.x) && (ball.x <= (paddle.x + paddle.width)))  {
        ball.vy = -ball.vy
    }

    animation = window.requestAnimationFrame(draw);

    
  };

  // Function to close modal on button click

  const closeModal = function() {
    $('#win-lose-modal').remove();
    document.location.reload();
}

// EVENT LISTENERS 

    // event listener to move paddle from left to right with arrow keys *found answer on Stack Overflow
  
   window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      
      case "ArrowLeft":
        paddle.x -= 20
        break;
      case "ArrowRight":
        paddle.x += 20
        break;
      
      default:
        return;
    }
  
    event.preventDefault();
  }, true);

  // event listener to start animation and the game when clicked
  
  canvas.addEventListener('click', function() {
    if (!running) { 
    animation = window.requestAnimationFrame(draw);
    running = true;
    }
  });

  // event listener to clear win/lose modal

  playAgainBtn.addEventListener('click', closeModal)
  xBtn.addEventListener('click', closeModal)

