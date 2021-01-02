const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let animation;

ctx.beginPath();
ctx.rect(20, 40, 50, 25);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 10,
    color: 'blue',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };

  function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if(ball.y + ball.vy > canvas.height || ball.y +ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if(ball.x + ball.vx > canvas.width || ball.x +ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    animation = window.requestAnimationFrame(draw);
  }
  
  canvas.addEventListener('click', function(e) {
    animation = window.requestAnimationFrame(draw);
  });

  
  ball.draw();