var alien, teclado, fogo, plataforma1, plataforma2, moeda, prata, bronze, placar;
const listaMoedas = ['moeda', 'prata', 'bronze'];

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
        this.load.image('prata', 'assets/moeda_prata.png');
        this.load.image('bronze', 'assets/moeda_bronze.png');
        this.load.image('bomba', 'assets/bomba.png');
    }

    create() {
        // Adiciona a imagem de fundo, centralizada de acordo com a largura e altura do jogo
        
        this.add.image(gameState.larguraJogo/2, gameState.alturaJogo/2, 'background');
        alien = this.physics.add.sprite(gameState.larguraJogo/2, gameState.alturaJogo/2 + 100, 'alien');
        alien.setCollideWorldBounds(true);
        alien.body.setSize(100, 85, true)
        teclado = this.input.keyboard.createCursorKeys();
        fogo = this.add.sprite(0, 0, 'turbo');
        fogo.setVisible(false);
        plataforma1 = this.physics.add.staticImage(gameState.larguraJogo/2 + 200, gameState.alturaJogo/2 + 100, 'plataforma');
        plataforma2 = this.physics.add.staticImage(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 - 150, 'plataforma');
        this.physics.add.collider(alien, plataforma1);
        this.physics.add.collider(alien, plataforma2);

        //moeda = this.physics.add.sprite(gameState.larguraJogo/2, 50, 'moeda');
       // moeda.setCollideWorldBounds(true);
       // moeda.setBounce(0.7);
        //this.physics.add.collider(moeda, plataforma1);
        //this.physics.add.collider(moeda, plataforma2);
       
      //  prata = this.physics.add.sprite(gameState.larguraJogo/2, gameState.alturaJogo/2, 'prata').setScale(0.25);
       // prata.setCollideWorldBounds(true);
       // prata.setBounce(0.7);
        //this.physics.add.collider(prata, plataforma1);
       // this.physics.add.collider(prata, plataforma2);
        // adicionando placar 

        const moedas = this.physics.add.group();
        

        this.time.addEvent({
            delay: 1800,
            callback: gerarMoedaNaTela,
            callbackScope: this,
            loop: true
        });

        placar = this.add.text(30, 30, 'Moedas:' + gameState.pontos, {fontSize:'30px', fill:'#495613'});
        alien.setDepth(1);
        fogo.setDepth(0);



        // Adiciona um evento de colisão entre o alien e a moeda
        
        this.physics.add.overlap(alien, prata, function(){
            prata.destroy(); 
            gameState.pontos += 3;
            placar.setText('Moedas: ' + gameState.pontos);
        });

        this.add.image(50, 50, 'bomba').setScale(0.2);
    }

    update() {

        if (gameState.pontos >= 15) {
            this.scene.stop('levelScene');
            this.scene.start('endScene');
        }

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
        } else if(teclado.down.isDown) {
            alien.setVelocityY(150);
            desativarTurbo();
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

function escolherMoeda() {
    return listaMoedas[Math.floor(Math.random() * listaMoedas.length)];
}

function gerarMoedaNaTela() {
    var moedaEscolhida = escolherMoeda();
    if (moedaEscolhida == 'moeda') {
        var x = Math.random() * gameState.larguraJogo;;
        moedaEscolhida = this.physics.add.sprite(x, 100, moedaEscolhida);
        moedaEscolhida.setCollideWorldBounds(true);
        moedaEscolhida.setBounce(0.7);
        this.physics.add.collider(moedaEscolhida, plataforma1);
        this.physics.add.collider(moedaEscolhida, plataforma2);
        this.physics.add.overlap(alien, moedaEscolhida, function(){
            moedaEscolhida.destroy();
            gameState.pontos += 5;
            placar.setText('Moedas: ' + gameState.pontos);
        });
        
    } else if (moedaEscolhida == 'prata') {
        var x = Math.random() * gameState.larguraJogo;;
        moedaEscolhida = this.physics.add.sprite(x, 100, moedaEscolhida).setScale(0.25);
        moedaEscolhida.setCollideWorldBounds(true);
        moedaEscolhida.setBounce(0.7);

        this.physics.add.collider(moedaEscolhida, plataforma1);
        this.physics.add.collider(moedaEscolhida, plataforma2);
        this.physics.add.overlap(alien, moedaEscolhida, function(){
            moedaEscolhida.destroy();
            gameState.pontos += 3;
            placar.setText('Moedas: ' + gameState.pontos);
        });
    } else {
        var x = Math.random() * gameState.larguraJogo;;
        moedaEscolhida = this.physics.add.sprite(x, 100, moedaEscolhida).setScale(0.20);
        moedaEscolhida.setCollideWorldBounds(true);
        moedaEscolhida.setBounce(0.7);
        this.physics.add.collider(moedaEscolhida, plataforma1);
        this.physics.add.collider(moedaEscolhida, plataforma2); 
        moedaEscolhida.body.setSize(300, 300, true);
        this.physics.add.overlap(alien, moedaEscolhida, function(){
            moedaEscolhida.destroy();
            gameState.pontos += 1;
            placar.setText('Moedas: ' + gameState.pontos);
        });
    }
    
}