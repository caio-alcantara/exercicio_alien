class endScene extends Phaser.Scene {
    constructor() {
      super({ key: 'endScene' });
    }
  
    preload() {
      this.load.image('background', 'assets/bg.png')
    }
  
    create() {
      this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/2, 'background')
      if (gameState.pontos >= 15) {
        this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 - 50, 'Parabéns!', {fill: '#000000', fontSize: '20px'})
        this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 , 'Você ganhou com ' + gameState.pontos + ' ponto(s)!', {fill: '#000000', fontSize: '20px'})
      } else {
        this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 - 50, 'Que pena!', {fill: '#000000', fontSize: '20px'})
        this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 , 'Você perdeu com ' + gameState.pontos + ' ponto(s)!', {fill: '#000000', fontSize: '20px'})
      }

      this.input.on('pointerdown', () => {
        this.scene.stop('endScene');
        this.scene.start('startScene');
      })
    }
    update() {}
  }   