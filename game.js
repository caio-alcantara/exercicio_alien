 // Define a largura e altura do jogo

const gameState = {
    larguraJogo: 700,
    alturaJogo: 710,
    pontos: 0
}
 // Configuração básica do jogo
 const config = {
     type: Phaser.AUTO,
     width: gameState.larguraJogo,
     height: gameState.alturaJogo,

     physics: {
         default: 'arcade',
         arcade: {
             gravity: { y: 300 },
             debug: true
         }
     },

     scene: [startScene, levelScene, endScene]
 };

// Ideia: adiciionar elementos que o alien perca pontos/morra quando pegue - estilo bombas fruit ninja
// Pegar moedas carregam um turbo especial: barra de progresso
// Tipos de moedas com valores diferentes -> lista com tipos de moedas
// Som pro turbo
 const game = new Phaser.Game(config);
