Game.Preloader = function(game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function() {
        
//load assets
    this.load.image('tiles', 'assets/tiles2.png');
    this.load.tilemap('tilemap1', 'assets/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('damage', 'assets/damage.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.atlas('bug', 'assets/bug.png', 'assets/bug.json');
    this.load.image('drone', 'assets/drone.png');
    this.load.image('playerDead', 'assets/player/dead.png');
    this.load.spritesheet('explosion', 'assets/explosion.png', 100, 114);
    this.load.audio('enemy1', 'assets/sound/enemy1Hit.mp3');
    this.load.audio('enemy2', 'assets/sound/enemy2.mp3');
    this.load.audio('enemy1Burst', 'assets/sound/enemy1Burst.mp3');
    this.load.audio('playerHit', 'assets/sound/playerDamage.mp3');
    this.load.audio('playerDie', 'assets/sound/playerDie.mp3');
    this.load.audio('playerWalk', 'assets/sound/playerWalk.mp3');
    this.load.audio('playerSword', 'assets/sound/sword.mp3');
    this.load.audio('music', 'assets/sound/music.mp3');
    this.load.spritesheet('playerShadow', 'assets/player/shadow_strip6.png', 14, 21);
    this.load.atlas('player', 'assets/player/player.png', 'assets/player/sprites.json');
    this.load.spritesheet('yenHUD', 'assets/yenHUD.png', 12, 12);
    this.load.spritesheet('heart', 'assets/heart.png', 16, 16);
    this.load.image('yen', 'assets/yen.png', 8, 12);
    this.load.spritesheet('pixel', 'assets/pixel.png', 3, 3);
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },
    create: function() {
        
        this.state.start('MainMenu');
    }
};