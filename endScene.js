class endScene extends Phaser.Scene {
    constructor() {
      super({ key: 'endScene' });
    }
  
    preload() {
      this.load.image('background', 'assets/bg.png')
    }
  
    create() {
      this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/2, 'background')
      this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 - 50, 'Fim de jogo!', {fill: '#000000', fontSize: '20px'})
      this.add.text(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 , 'Pontuação: ' + gameState.pontos + ' ponto(s)!', {fill: '#000000', fontSize: '20px'})
      this.input.on('pointerdown', () => {
        this.scene.stop('endScene');
        this.scene.start('startScene');
      })
    }
    update() {}
  }   