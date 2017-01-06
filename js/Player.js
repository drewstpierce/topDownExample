var Player = function(game, x, y, key, hp) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.frame = 21;
    this.game.enableBody = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.setSize(10, 10, 16, 21);
        this.body.allowRotation = false;
        this.key = 'key';
        this.hp = hp;
        this.facing = 3;
        this.attacked = false;
        this.xx = this.x;
        this.yy = this.y;
        this.state = "idle";
        this.weaponTime = 0;
        this.walkTime = 0;
        this.hitTime = 0;
        this.dead = false;
        this.body.bounce.set(1);
        //add player's shadow
        playerShadow = this.game.add.image(0, 0, 'playerShadow');
        playerShadow.anchor.setTo(0.5, 0.5);
        shadowAnimate = playerShadow.animations.add('shadowAnimate'), 10, false;
        //animations from spritesheet(aka Sprite Atlas) and JSON data
        walkUp = this.animations.add('walkUp', Phaser.Animation.generateFrameNames('upWalk', 1, 6), 10, false);
        walkRight =  this.animations.add('walkRight', Phaser.Animation.generateFrameNames('rightWalk', 1, 6), 10, false);
        walkLeft =  this.animations.add('walkLeft', Phaser.Animation.generateFrameNames('leftWalk', 1, 6), 10, false);
        walkDown = this.animations.add('walkDown', Phaser.Animation.generateFrameNames('downWalk', 1, 6), 10, false);
        attackRight = this.animations.add('attackRight', Phaser.Animation.generateFrameNames('attackRight', 1, 7), 10, false);
        attackDown = this.animations.add('attackDown', Phaser.Animation.generateFrameNames('attackDown', 1, 7), 10, false);
        attackUp = this.animations.add('attackUp', Phaser.Animation.generateFrameNames('attackUp', 1, 7),10, false);
        //Set resetFrames function to fire once the attack animations are finished.
        attackRight.onComplete.add(this.resetFrames, this);
        attackDown.onComplete.add(this.resetFrames, this);
        attackUp.onComplete.add(this.resetFrames, this);
        /* runs attack function when attackKey(spacebar) is pressed.
        keeping this out of the update loop keeps the animation and
        damage object locked into its state mandated parameters until 
        the animation finishes */ 
        attackKey.onDown.add(this.attack, this);
            };

// Followers are a type of Phaser.Sprite
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

    Player.prototype.update = function() {

    this.game.physics.arcade.collide(this, layer);
    this.game.physics.arcade.overlap(Enemy, this, this.hitEnemy, null, this);
           this.body.velocity.x = 0;
           this.body.velocity.y = 0;
           playerShadow.x = this.x;
           playerShadow.y = this.y;

          switch(this.state) {
            case 'up':
              this.facing = 1;
              this.body.velocity.y = -175;
              this.animations.play('walkUp');
              this.scale.x = 1;
              this.playerWalkSound();
              this.attacked = false;
              playerShadow.x = this.x;
              playerShadow.y = this.y;
              playerShadow.animations.play('shadowAnimate');
            break;
            case 'down':
              this.facing = 3;
              this.body.velocity.y = 175;
              this.animations.play('walkDown');
              this.scale.x = 1;
              this.playerWalkSound();
              this.attacked = false;
              playerShadow.x = this.x;
              playerShadow.y = this.y + 2;
              playerShadow.animations.play('shadowAnimate');
            break;
            case 'left':
              this.facing = 4;
              this.body.velocity.x = -175;
              this.animations.play('walkLeft');
              this.scale.x = 1;
              this.playerWalkSound();
              this.attacked = false;
              playerShadow.x = this.x - 2;
              playerShadow.y = this.y;
              playerShadow.animations.play('shadowAnimate');
            break;
            case 'right':
              this.facing = 2;
              this.body.velocity.x = 175;
              this.animations.play('walkRight');
              this.scale.x = 1;
              this.playerWalkSound();
              this.attacked = false;
              playerShadow.x = this.x + 2;
              playerShadow.y = this.y;
              playerShadow.animations.play('shadowAnimate');
            break;
            case 'attackUp':
              this.facing = 1;
              this.attacked = true;
              this.body.velocity.y = 0; 
              this.animations.play('attackUp');
              this.scale.x = 1; 
              this.yy = this.y - 10;
              this.xx = this.x; 
              this.fireWeapon();
              playerShadow.x = this.x;
              playerShadow.y = this.y;
              playerShadow.frame = 2; 
            break;
            case 'attackDown':
              this.facing = 3;
              this.attacked = true;
              this.body.velocity.y = 0; 
              this.animations.play('attackDown');
              this.scale.x = 1;  
              this.yy = this.y + 10;
              this.xx = this.x; 
              this.fireWeapon();
              playerShadow.x = this.x;
              playerShadow.y = this.y;
              playerShadow.frame = 2;    
            break;
            case 'attackLeft':
              this.facing = 4;
              this.attacked = true;
              this.body.velocity.x = 0;
              this.animations.play('attackRight');
              this.scale.x = -1;
              this.yy = this.y;
              this.xx = this.x - 10; 
              this.fireWeapon();
              playerShadow.x = this.x;
              playerShadow.y = this.y;
              playerShadow.frame = 2;
            break;
            case 'attackRight':
              this.facing = 2;
              this.attacked = true;
              this.body.velocity.x = 0;
              this.animations.play('attackRight');
              this.scale.x = 1;
              this.yy = this.y;
              this.xx = this.x + 10;
              this.fireWeapon();
              playerShadow.x = this.x;
              playerShadow.y = this.y;
              playerShadow.frame = 2;
            break;
            case 'idle':
            if ((this.facing === 1) && (!this.attacked))  {
                  this.frame = 35;
                  this.scale.x = 1;
                  playerShadow.frame = 0;
              } else if ((this.facing === 2) && (!this.attacked)) {
                  this.frame = 26;
                  this.scale.x = 1;
                  playerShadow.frame = 0;
              } else if ((this.facing === 3) && (!this.attacked)) {
                  this.frame = 38;
                  this.scale.x = 1;
                  playerShadow.frame = 0;
              } else if ((this.facing === 4) && (!this.attacked)) {
                  this.frame = 25;
                  this.scale.x = 1;
                  playerShadow.frame = 0;
                }  
              break;
            } 

      if ((!this.attacked) && ((this.state != 'attackRight') || (this.state != 'attackLeft') || (this.state != 'attackUp') || (this.state != 'attackDown'))) {
       if (upKey.isDown) {
            this.state = 'up';
        } else if (downKey.isDown) {
            this.state = 'down';
        } else if (leftKey.isDown) {
            this.state = 'left';
        } else if (rightKey.isDown) {
            this.state = 'right';
        } else {
          this.state = 'idle';
        }
        
      }

      if (this.hp <= 0) {
        this.deathAnimation();
      }
};

Player.prototype.resetFrames = function() {
          this.attacked = false;
          this.state = 'idle';
      };

Player.prototype.createWeapon = function() {
  this.game.add.existing(
    damage = new Damage(this.game, player.xx, player.yy, 'damage')
    );
        };

Player.prototype.playerWalkSound = function() {
  if (this.game.time.now > this.walkTime) {
                playerWalkAudio.play();
          this.walkTime = this.game.time.now + 270;
        }              
};

Player.prototype.fireWeapon = function() {
    if (this.game.time.now > this.weaponTime) {
         playerSwordAudio.play();
         this.game.time.events.add(Phaser.Timer.SECOND * .36, this.createWeapon, this);
         if (this.damage) {
  this.weaponTime = this.game.time.now + 770;
        }
    }         
};

Player.prototype.hitEnemy = function(player, Enemy) {
    /* Here's where the view comes into play. The shake function jostles it around when the player collides with an enemy. */
          if (this.game.time.now > this.hitTime) {
              player.tint = 0xff4800;
              //make particles shoot from the heart emitters
              if ((player.hp === 6)) {
                  heartBar.children[2].addChild(emitter);
                 } else if ((player.hp === 5)) {
                  heartBar.children[1].addChild(emitter);
                 } else if ((player.hp === 4)) {
                  heartBar.children[1].addChild(emitter);
                 } else if ((player.hp === 3)) {
                  heartBar.children[0].addChild(emitter);
                 } else if ((player.hp === 2)) {
                  heartBar.children[0].addChild(emitter);
                 } else if ((player.hp === 1)) {
                  heartBar.children[0].addChild(emitter);
                 } 
                 emitter.start(true, 2000, null, 20);  
                 
              this.game.time.events.add(Phaser.Timer.SECOND * .3, player.changeTint, this);
                playerHitAudio.play();
                 this.game.camera.shake(.05, 100);
                 player.hp -= 1;
                console.log(player.hp);
          }
          this.hitTime = this.game.time.now + 200;
      };

Player.prototype.changeTint = function() {
  player.tint = 0xffffff;
};

Player.prototype.attack = function() {
             if (this.facing === 2) {
        this.state = 'attackRight';
        } else if (this.facing === 4) { 
        this.state = 'attackLeft';
        } else if (this.facing === 1) { 
        this.state = 'attackUp';
        } else if (this.facing === 3) { 
        this.state = 'attackDown';
            }
          };

Player.prototype.knockBack = function() {
    this.game.time.events.add(Phaser.Timer.Second * .2, player.knockBackStop, this);
                if ((player.x) >= (this.enemy.x)) {
                  player.body.velocity.x = 200;
                } else if ((player.x) <= (this.enemy.x)) {
                  player.body.velocity.x = -200;
                } else if ((player.y) <= (this.enemy.y)) {
                  player.body.velocity.y = -200;
                } else if ((player.y) >= (this.enemy.y)) {
                  player.body.velocity.y = 200;
                } 
            };

Player.prototype.knockBackStop = function() { 
    player.body.velocity = 0; 
};  

Player.prototype.deathAnimation = function() {
    player.dead = true;
};        