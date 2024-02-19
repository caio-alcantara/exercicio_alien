class startScene extends Phaser.Scene {
	constructor() {
		super({ key: 'startScene' })
	}

  preload() {
    this.load.image('background', 'assets/bg.png')
  }

	create() {
    gameState.pontos = 0;
    this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/2, 'background')
		this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2, 'Clique para iniciar o jogo!', {fill: '#000000', fontSize: '20px'})
		this.input.on('pointerdown', () => {
			this.scene.stop('startScene');
			this.scene.start('levelScene');
		})
	}
}
