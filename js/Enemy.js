var Enemy = function(game, x, y, key, hp) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.enableBody = true;
    this.anchor.setTo(0.5, 0.5);
    this.body.allowRotation = false;
    this.body.setSize(36, 32);
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.key = 'key';
    this.game.time.events.add(Phaser.Timer.SECOND * Math.random(0.1, 0.5), this.loadAnimations, this);
    this.state = 'left';
    this.burstSoundTime = 0;    
     
    };

// Followers are a type of Phaser.Sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

    Enemy.prototype.update = function() {
     this.game.physics.arcade.collide(this, layer);
     this.game.physics.arcade.overlap(damage, this, this.hit, null, this);
     this.game.physics.arcade.overlap(player, this, player.hitEnemy, null, this);
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            switch(this.state) {
                case 'left':
                    this.moveLeft();
                    break;
                case 'right':
                    this.moveRight();
                    break;
                case 'turning':
                    this.turning();
                    break;
                case 'dying':
                    this.dying();
                    break;
            }

            if (this.hp <= 0) {
                this.state = 'dying';
            } else if (this.hp > 0) {
                this.state = this.state;
            }
      };

Enemy.prototype.hit = function(enemy, Damage) {
    enemy1HitAudio.play();
    this.hp -= 1;
    damage.destroy();
    console.log(this.hp);
    this.tint = 0xaa00ff;
    this.game.time.events.add(Phaser.Timer.SECOND * .2, this.changeTint, this);
};

Enemy.prototype.animationEndShake = function() {
    if (this.exists) {
    this.game.camera.shake(.02, 17);
    if (this.game.time.now > this.burstSoundTime) {
                enemy1BurstAudio.play();
          this.burstSoundTime = this.game.time.now + 570;
        }
    } 
};

Enemy.prototype.loadAnimations = function() {
    bugMove = this.animations.add('bugMove', Phaser.Animation.generateFrameNames('bugMove', 1, 6), 12, false);
    bugTurn =  this.animations.add('bugTurn', Phaser.Animation.generateFrameNames('bugTurn', 1, 10), 12, false);
    bugSplode =  this.animations.add('bugSplode', Phaser.Animation.generateFrameNames('bugSplode', 1, 14), 10, false); 
   
    bugSplode.killOnComplete = true;
    bugTurn.onComplete.add(this.changeFromTurn, this);
    bugMove.onComplete.add(this.changeState, this);
};

Enemy.prototype.moveLeft = function() {
    
    this.body.velocity.x = -70;
    this.scale.x = 1;
    this.animations.play('bugMove');
};

Enemy.prototype.moveRight = function() {
    
    this.body.velocity.x = 70;
    this.scale.x = -1;
    this.animations.play('bugMove');
};


Enemy.prototype.turning = function() {
    this.animations.play('bugTurn');
    
    
};

Enemy.prototype.dying = function() {
    this.animations.play('bugSplode');
    this.game.time.events.add(Phaser.Timer.SECOND * .85, this.animationEndShake, this);
};

Enemy.prototype.changeState = function() {
    if (this.state === 'left') {
        this.state = 'turning';
    } else if (this.state === 'right') {
        this.state = 'turning';
        this.scale.x = -1;
    } else if (this.state === 'turning') {
        if (this.scale.x === 1) {
            this.state = 'right';
        } else if (this.scale.x === -1) {
            this.state = 'left';
        }
    }
    
};

Enemy.prototype.changeFromTurn = function() {
    if (this.scale.x === -1) {
        this.state = "left";
    } else if (this.scale.x === 1) {
        this.state = "right";
    }
    
};

Enemy.prototype.changeTint = function() {
  this.tint = 0xffffff;
};
