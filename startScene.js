var naveMae, alien;
class startScene extends Phaser.Scene {
	constructor() {
		super({ key: 'startScene' })
	}

  preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('nave-mae', 'assets/nave-mae.png');
    this.load.image('alien', 'assets/alienigena.png');
  }

	create() {
    gameState.pontos = 0;
    this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/2, 'background')
    naveMae = this.add.image(-500, gameState.alturaJogo/2 - 200, 'nave-mae').setScale(0.18);
    alien = this.add.image(360, 150, 'alien');
    alien.setAlpha(0);
    this.tweens.add({
      targets: naveMae,
      x: 350,
      duration: 3000,
      ease: 'Power2',
      onComplete: () => {
      this.tweens.add({
        targets: alien,
        alpha: { from: 0, to: 1 },
        duration: 750,
        ease: 'Linear',
        onComplete: () => {
        }
      });
        
        this.tweens.add({
          targets: alien,
          y: 450,
          duration: 4000,
          ease: 'Power2',
          onComplete: () => {
            this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2, 'Clique para iniciar o jogo!', {fill: '#000000', fontSize: '20px'});
          }
        });

        
      }
    });
    
    
    this.time.delayedCall(5500, () => {
    })
		this.input.on('pointerdown', () => {
			this.scene.stop('startScene');
			this.scene.start('levelScene');
		})
	}
  
}
