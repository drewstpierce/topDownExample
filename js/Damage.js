var Damage = function(game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);

        this.key = 'key';
        this.anchor.setTo(0.5, 0.5);
        this.game.enableBody = true;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowRotation = false;
        this.game.time.events.add(Phaser.Timer.SECOND * .09, this.destroyWeapon, this);
        this.visible = false;
    };

// Followers are a type of Phaser.Sprite
Damage.prototype = Object.create(Phaser.Sprite.prototype);
Damage.prototype.constructor = Damage;


    
    Damage.prototype.update = function() {

      };


          

Damage.prototype.destroyWeapon = function() {
    this.destroy();
}

