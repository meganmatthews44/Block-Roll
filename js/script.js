const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let animation;
let running = false;
const scoreboard = document.getElementById("score")
let score = 0
const rowCount = 4
const columnCount = 6
let blockWidth = 55
let blockHeight = 25
const blockPadding = 20
const blockTop = 40
const blockLeft = 40
let blockX;
let blockY;

let blocks = [];
for(let c = 0; c < columnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        blocks[c][r] = {x: 0, y: 0, status: 1};
    }
}

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

                if (ball.color === "pink") {
                    ball.color = "blue"
                }  else {
                    ball.color = "pink"
                }    
               
                }
            }
            if (b.status === 0) {
                b.blockY = 0;
                b.blockX = 0;
            }
        }
    }
  };

const drawBricks = function() {
    for(let c = 0; c < columnCount; c++) {
        for(let r = 0; r < rowCount; r++) {
            if(blocks[c][r].status === 1) {
                blockX = (c * (blockWidth + blockPadding)) +blockLeft;
                blockY = (r * (blockHeight + blockPadding)) +blockTop;
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "lightblue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



const ball = {
    x: 350,
    y: 315,
    vx: -1,
    vy: -2,
    radius: 10,
    color: 'pink',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  };

   const paddle = {
       height: 10,
       width: 50,
       x: 350,
       y: 325, // does not change
       color: 'lightgreen',
       draw: function() {
           ctx.beginPath();
           ctx.rect(this.x, this.y, this.width, this.height);
           ctx.fillStyle = this.color;
           ctx.fill();
           ctx.closePath();
           
       }

   };

   paddle.draw();


  function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
    ball.draw();
    paddle.draw();
    eraseBlocks();
    ball.x += ball.vx;
    ball.y += ball.vy;
    scoreboard.innerText = (`${score}`)


    if(ball.y + ball.vy > canvas.height) {
        alert('You lose!')
        document.location.reload();
        clearInterval(interval);
    }

    //To do: add a box that pops up with the message, not the alert, allow to clear and start over

    if(ball.y + ball.vy < ball.radius) {
        ball.vy = -ball.vy;
    }
    if(ball.x + ball.vx > canvas.width-ball.radius || ball.x +ball.vx < ball.radius) {
        ball.vx = -ball.vx;
    } 

    if (paddle.x <= 0) {
        paddle.x = 0
    }
    if (paddle.x >= (canvas.width-paddle.width)) {
        paddle.x = (canvas.width-paddle.width)
    }

    if (ball.y === (paddle.y - ball.radius) && (ball.x >= paddle.x) && (ball.x <= (paddle.x + paddle.width)))  {
        ball.vy = -ball.vy
    }

    animation = window.requestAnimationFrame(draw);

    
  };



  
   window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      
      case "ArrowLeft":
        paddle.x -= 10
        break;
      case "ArrowRight":
        paddle.x += 10
        break;
      
      default:
        return;
    }
  
    event.preventDefault();
  }, true);

  
  canvas.addEventListener('click', function() {
    if (!running) { 
    animation = window.requestAnimationFrame(draw);
    running = true;
    }
  });