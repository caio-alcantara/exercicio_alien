 // Define a largura e altura do jogo
 const larguraJogo = 700;
 const alturaJogo = 710;

 // Configuração básica do jogo
 const config = {
     type: Phaser.AUTO,
     width: larguraJogo,
     height: alturaJogo,

     physics: {
         default: 'arcade',
         arcade: {
             gravity: { y: 300 },
             debug: true
         }
     },

     scene: [levelScene]
 };

 const game = new Phaser.Game(config);
