var alien, teclado, fogo, plataforma, moeda, placar;
var pontos = 0;

class levelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'levelScene' });
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('alien', 'assets/alienigena.png');
        this.load.image('turbo', 'assets/turbo.png');
        this.load.image('plataforma', 'assets/tijolos.png');
        this.load.image('moeda', 'assets/moeda.png');
    }

    create() {
        // Adiciona a imagem de fundo, centralizada de acordo com a largura e altura do jogo
        this.add.image(larguraJogo/2, alturaJogo/2, 'background');
        alien = this.physics.add.sprite(larguraJogo/2, alturaJogo/2, 'alien');
        alien.setCollideWorldBounds(true);
        alien.body.setSize(100, 85, true)
        teclado = this.input.keyboard.createCursorKeys();
        fogo = this.add.sprite(0, 0, 'turbo');
        fogo.setVisible(false);
        plataforma = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'plataforma');
        this.physics.add.collider(alien, plataforma);
        moeda = this.physics.add.sprite(larguraJogo/2, 50, 'moeda');
        moeda.setCollideWorldBounds(true);
        moeda.setBounce(0.7);
        this.physics.add.collider(moeda, plataforma);
        // adicionando placar 
        placar = this.add.text(30, 30, 'Moedas:' + pontos, {fontSize:'30px', fill:'#495613'});
        alien.setDepth(1);
        fogo.setDepth(0);

        // Adiciona um evento de colisão entre o alien e a moeda
        this.physics.add.overlap(alien, moeda, function(){
            moeda.setVisible(false);
            var posicaoMoedaY = Phaser.Math.RND.between(50, 650);
            moeda.setPosition(posicaoMoedaY, 100);
            pontos ++;
            placar.setText('Moedas: ' + pontos);
            moeda.setVisible(true);
        });
    }

    update() {
        if (teclado.left.isDown) {
            alien.setVelocityX(-150);
            desativarTurbo();
        } else if (teclado.right.isDown) {
            alien.setVelocityX(150);
            desativarTurbo();
        } else {
            alien.setVelocityX(0);
            desativarTurbo();
        }

        if (teclado.up.isDown) {
            alien.setVelocityY(-150);
            ativarTurbo();
        }
        fogo.setPosition(alien.x, alien.y + alien.height/2);
    }
}

function ativarTurbo() {
    fogo.setVisible(true);
}
function desativarTurbo() {
    fogo.setVisible(false);
}
