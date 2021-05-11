# Block and Roll - Project #1

## Play the Game

[Block and Roll](https://meganmatthews44.github.io/Block-Roll/)

## Technologies Used

- HTML
- CSS
- Javascript

## User Story

Player clicks in game screen to start the game. The blocks will be created and ball will start moving.

Player will need to place the paddle in the correct position by using the left and right arrow keys on their keyboard to make sure they 1) do not allow the ball to fall to the bottom of the game screen and 2) angle it correctly to hit the existing blocks in the game screen.

Any blocks that are hit will disappear and the player's score will go up by one point. Once there are no blocks left, the winner has won the game. 

If the ball falls to the bottom of the game screen, the game is over. 

## Approach Taken

- Created ball, paddle and blocks elements via HTML Canvas
- Used window.requestAnimationFrame() method to create ball movement
- Created variables for game elements that can be easily changed to make game larger or smaller, as well as more difficult (i.e. number of brick columns/rows, speed of ball, speed paddle moves, etc.)
- Used functions to start game play, draw the blocks, detect ball collision with walls, paddle and blocks, and alert customer of game won or lost 
- Used event listeners to start game play, move paddle left and right, and exit game won/lost modal and refresh game
- Used DOM manipulation to show adjusted score each time a block is hit and when game has ended
- Created game instruction modal and won/lost modal using Bootstrap
- Used CSS to style game

## Unsolved Problems

- Ball seems to go the same direction no matter what part of the paddle it hits. Would love to add logic that adjusts the angle of the ball depending on where on the paddle it hits.
- Speed up the ball as the number of existing blocks gets lower, making the game more challenging for the player. 
- Create a mobile friendly version.

## Resources

### HTML Canvas:

- [Mozilla - CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

- [Mozilla - Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

### Animations:

- [Mozilla - Advanced Animations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations)

- [Mozilla - requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

### Rendering the blocks:

- [Mozilla - Build the Brick Field](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Build_the_brick_field)

### Collision Detection:

- [Mozilla - 2D Collision Detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#circle_collision)
