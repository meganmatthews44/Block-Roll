const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let animation;
let running = false;

const block = {
    x: 20,
    y: 40,
    width: 50,
    height: 25,
    color: "lightblue",
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

block.draw();




const ball = {
    x: 260,
    y: 300,
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
       x: 250,
       y: 325,
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
    block.draw();
    ball.draw();
    paddle.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;


    if(ball.y + ball.vy > canvas.height) {
        alert('You lose!')
        document.location.reload();
        clearInterval(interval);
    }

    //To do: add a box that pops up with the message, not the alert, allow to clear and start over

    if(ball.y +ball.vy < ball.radius) {
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

  
  canvas.addEventListener('click', function(e) {
    if (!running) { 
    animation = window.requestAnimationFrame(draw);
    running = true;
    }
  });

  

  
  ball.draw();