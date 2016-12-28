
Game.Level1 = function(game) {};


var tileset;
var layer;
var jumpTimer;
var pauseScreen;
var attacked;
var attackKey;
var leftKey;
var rightKey;
var upKey;
var downKey;
var xx;
var yy;
var hp;
var camera;
var nonThreat;
var cursors;
var jumpButton;
var initX;
var sprite;
var coins;
var door;
var doors;
var layer2;
var tiles;
var map;
var walkDown;
var walkUp;
var walkLeft;
var walkRight;
var dir;
var damage;
var emitter0;
var emitter1;
var emitter2;



Game.Level1.prototype = {
    create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.createTileMap();
    this.setUpKeys();

    //initialize player
    player = this.game.add.existing(
    new Player(this.game, this.game.width/2, this.game.height/2, 'player', 6)
    );
    //initialize enemies
    enemy1 = this.game.add.existing(
    new Enemy(this.game, this.game.width/2 + 15, this.game.height/2, 'bug', 4)
    );
    enemy2 = this.game.add.existing(
    new Enemy(this.game, this.game.width/2 + 450, this.game.height/2, 'bug', 4)
    );
    
    //set up the camera
   camera = {x:0, y:0, direction:'', isMoving:false};
    //initialize audio
   playerSwordAudio = this.add.audio('playerSword', 0.5);
   playerWalkAudio = this.add.audio('playerWalk', 0.5);
   playerHitAudio = this.add.audio('playerHit', 0.5);
   playerDieAudio = this.add.audio('playerDie', 0.5);
   enemy1HitAudio = this.add.audio('enemy1', 0.5);
   enemy2HitAudio = this.add.audio('enemy2', 0.5);
   enemy1BurstAudio = this.add.audio('enemy1Burst', 0.5);
   music = this.add.audio('music', true);
    music.play();
    music.loopFull();

    //create the heads up display
    this.createHUD();
    pauseScreen = this.add.image(0, 0, 'background');
    pauseScreen.fixedToCamera = true;
    
   
    },
   
    setUpKeys: function () {
        
        attackKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
        upKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        downKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
    }, 

    createTileMap: function() {
       map = this.add.tilemap('tilemap1');
       tiles = map.addTilesetImage('tiles');
       layer = map.createLayer('Tile Layer 1');
       layer.resizeWorld();
       map.setCollisionBetween(1, 7);
       layer2 = map.createLayer('Tile Layer 2');      
    },
    
    moveCamera: function(){
        if (camera.isMoving)
            return;

        camera.isMoving = true;
        var mustMove = false;

        if (player.y > this.game.camera.y + this.game.height) {
            camera.y += 1;
            mustMove = true;
        }
        else if (player.y < this.game.camera.y) {
            camera.y -= 1;
            mustMove = true;
        }
        else if (player.x > this.game.camera.x + this.game.width) {
            camera.x += 1;
            mustMove = true;
        }
        else if (player.x < this.game.camera.x) {
            camera.x -= 1;
            mustMove = true;
        }

        if (mustMove) {
            var t = this.add.tween(this.game.camera).to({x:camera.x*this.game.width, y:camera.y*this.game.height}, 400);
            t.start();
            t.onComplete.add(function(){camera.isMoving = false;}, this);
        }
        else {
            camera.isMoving = false;
        }
    },

    shake: function() {
      this.camera.shake(.05, 100);
    },
   
    createHUD: function() {
        heartBar = this.add.group();
        heartBar.fixedToCamera = true;
        //make three hearts
        for (var i = 0; i < 3; i++) {
            heart = heartBar.create(18 * i, 16, 'heart', i);
           
            heart.animations.add('fullGlow', [0, 1, 2, 3, 2, 1], 9, true);
            heart.animations.add('halfGlow', [4, 5, 6, 7, 6, 5], 9, true);  
        }     
        emitter = this.game.add.emitter(0, 0, 100);
        emitter.makeParticles('pixel');
        emitter.gravity = 200;
        heartBar.children[2].addChild(emitter);  
        emitter.x = heartBar.children[2].x;
        emitter.y = heartBar.children[2].y;
        yenHUD = this.add.sprite(82, 16, 'yenHUD');
        yenHUD.anchor.setTo(0.5, 0.5);
        yenHUD.fixedToCamera = true;  
        
},

updateHealth: function() {
if (player.hp === 6) {
        heartBar.callAll('animations.play', 'animations', 'fullGlow');
        
    } else if (player.hp === 5) {
        emitter.x = heartBar.children[2].x;
        emitter.y = heartBar.children[2].y;
        heartBar.children[2].animations.play('halfGlow');
        
    } else if (player.hp === 4) {
        emitter.x = heartBar.children[1].x;
        emitter.y = heartBar.children[1].y;
        heartBar.children[2].kill();
        
    } else if (player.hp === 3) {
        emitter.x = heartBar.children[1].x;
        emitter.y = heartBar.children[1].y;
        heartBar.children[1].animations.play('halfGlow');
        
    } else if (player.hp === 2) {
        emitter.x = heartBar.children[0].x;
        emitter.y = heartBar.children[0].y;
        heartBar.children[1].kill();
        
    } else if (player.hp === 1) {
        emitter.x = heartBar.children[0].x;
        emitter.y = heartBar.children[0].y;
        heartBar.children[0].animations.play('halfGlow');
        
    } else if (player.hp <= 0) {
        
        heartBar.children[0].kill();
        
    }
},


    update: function() {
    if (this.input.activePointer.withinGame) {
        this.game.physics.arcade.isPaused = false;
        pauseScreen.alpha = 0;
        music.resume();
    }
    else {
        pauseScreen.alpha = .8;
        player.animations.stop(null, true);
        enemy1.animations.stop(null, true);
        enemy2.animations.stop(null, true);
        playerWalkAudio.pause();
        enemy1BurstAudio.pause();
        music.pause();
        player.state = 'idle';
        this.game.physics.arcade.isPaused = true;
        
    }    
    //run the camera function
    this.moveCamera();
    //HUD heart animation
    this.updateHealth();
}
    };