// Enemies our player must avoid
var Enemy = function(x,y,speed) {

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.yposition = [60,145,225];
    this.x = x;
    this.y = this.yposition[Math.floor(Math.random() * this.yposition.length)];
    this.speed = Math.floor(Math.random() * (400-100)+100);

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    //bounding box of enemy
    spriteWidth = 55;
    this.bodyleft = this.x;
    this.bodyright = this.x + spriteWidth;
    this.bodytop = this.y;
    this.bodybottom = this.y + spriteWidth;

    // keep enemy on canvas
    if (this.x > 505) {
        this.x = -150;
        this.y = this.y = this.yposition[Math.floor(Math.random() * this.yposition.length)];
        this.speed = Math.floor(Math.random() * (400-100)+100);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

}

Player.prototype.update = function() {

    //bounding box of player
    this.bodyleft = this.x;
    this.bodyright = this.x + spriteWidth;
    this.bodytop = this.y;
    this.bodybottom = this.y + spriteWidth;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player movement & keep from leaving canvas
Player.prototype.handleInput = function(keypressed) {

    if (keypressed === 'left' && this.x > 0) {
        this.x -= 100;
    };

    if (keypressed === 'right' && this.x < 400) {
        this.x += 100;
    };

    if (keypressed === 'up' && this.y > -15) {
        this.y -= 83;
    };

    if (keypressed === 'down' && this.y < 400) {
        this.y += 83;
    };

};

// Place all enemy objects
// in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(-150,60,150);
var bug2 = new Enemy(-150,145,300);
var bug3 = new Enemy(-150,225,50);
var allEnemies = [bug1,bug2,bug3];
var player = new Player(200,400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

   player.handleInput(allowedKeys[e.keyCode]);
});