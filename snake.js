/**@constructor Snake
 * Constructs a new snake object
 */
function Snake(){
    this.cellSize = 10;
    this.width = 15;
    this.height = 15;
    this.snake = [{x: 6, y: 6}, {x: 5, y:6}, {x: 4, y: 6}];
    this.direction = 'right';
    this.food = [];

    //Create game canvas and context
    var canvas = document.createElement('canvas');
    canvas.width = this.width * this.cellSize;
    canvas.height = this.height * this.cellSize;
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext('2d');

    // canvas.onkeydown = this.handleKeyDown;
    canvas.addEventListener('keydown', this.handleKeyDown, true);

    setInterval(()=>this.loop(), 1000);
}

Snake.prototype.handleKeyDown = function(event){
    console.log(event.keyCode);
    switch(event.keyCode){
        case 'w':
            this.direction = 'up';
            break;
        case 'a':
            this.direction = 'left';
            break;
        case 's':
            this.direction = 'down';
            break;
        case 'd':
            this.direction = 'right';
            break;
    }
};

Snake.prototype.render = function(){
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);
    this.ctx.fillStyle = '#fff';
    //Draw Snake
    this.snake.forEach((segment) => {
        this.ctx.fillRect(
            segment.x * this.cellSize,
            segment.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    });
    //Draw Fruit
    this.ctx.fillStyle = 'gold';
    this.food.forEach((food) => {
        this.ctx.fillRect(
            food.x * this.cellSize,
            food.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    });
};

/** @method update
 * Updates the snake, moving it forward
 */
Snake.prototype.update = function(){
    var x = this.snake[0].x;
    var y = this.snake[0].y;
    switch(this.direction){
        case 'right':
            x++;
            break;
        case 'left':
            x--;
            break;
        case 'up':
            y--;
            break;
        case 'down':
            y++;
    }
    //If we move off-board, game is over
    if(x < 0 || x > this.width || y < 0 || y > this.height){
        return;
    }
    this.snake.pop();
    this.snake.unshift({x: x, y: y});
};

Snake.prototype.loop = function(){
    this.update();
    this.render();
};

new Snake();