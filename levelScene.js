var alien, teclado, fogo, plataforma1, plataforma2, moeda, prata, bronze, placar;
const listaMoedas = ['moeda', 'prata', 'bronze', 'bomba'];

class levelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'levelScene' });
    }

    preload() {
        // Carrega todos os assets da fase
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

        // Adiciona o alien na tela e define que ele não pode sair da tela
        alien = this.physics.add.sprite(gameState.larguraJogo/2, gameState.alturaJogo/2 + 100, 'alien');
        alien.setCollideWorldBounds(true);
        alien.body.setSize(100, 85, true)

        teclado = this.input.keyboard.createCursorKeys();

        // Adiciona a imagem do turbo e a deixa invisível
        fogo = this.add.sprite(0, 0, 'turbo');
        fogo.setVisible(false);

        // Adiciona as plataformas na tela e define que o alien colide com elas
        plataforma1 = this.physics.add.staticImage(gameState.larguraJogo/2 + 200, gameState.alturaJogo/2 + 100, 'plataforma');
        plataforma2 = this.physics.add.staticImage(gameState.larguraJogo/2 - 150, gameState.alturaJogo/2 - 150, 'plataforma');
        this.physics.add.collider(alien, plataforma1);
        this.physics.add.collider(alien, plataforma2);

        // Chama a fução gerarMoedaNaTela a cada 1800 milissegundos
        this.time.addEvent({
            delay: 1800,
            callback: gerarMoedaNaTela,
            callbackScope: this,
            loop: true
        });

        // Adiciona o placar na tela
        placar = this.add.text(30, 30, 'Moedas:' + gameState.pontos, {fontSize:'30px', fill:'#495613'});
        alien.setDepth(1);
        fogo.setDepth(0);

        //this.add.image(50, 50, 'bomba').setScale(0.2);
    }

    update() {
        // Verifica se o jogador atingiu a pontuação máxima ou minima para terminar o jogo
        if (gameState.pontos >= 15 || gameState.pontos <= -5) {
            this.scene.stop('levelScene');
            this.scene.start('endScene');
        }

        // Lógica de movimento do alien
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
    if (moedaEscolhida == 'moeda') {//moeda = moeda de ouro
        var x = Math.random() * gameState.larguraJogo;; //Gera um valor aleatório para a posição x da moeda
        moedaEscolhida = this.physics.add.sprite(x, 100, moedaEscolhida); //Cria a moeda na posição x, 100
        moedaEscolhida.setCollideWorldBounds(true); //Define que a moeda não pode sair da tela
        moedaEscolhida.setBounce(0.7); //Define o quão alto a moeda pode pular
        this.physics.add.collider(moedaEscolhida, plataforma1); //Define que a moeda colide com a plataforma 1
        this.physics.add.collider(moedaEscolhida, plataforma2); //Define que a moeda colide com a plataforma 2
        this.physics.add.overlap(alien, moedaEscolhida, function(){
            moedaEscolhida.destroy(); //Destroi a moeda quando o alien a toca
            gameState.pontos += 5; //Adiciona 5 pontos ao placar
            placar.setText('Moedas: ' + gameState.pontos); //Atualiza o texto do placar
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
            gameState.pontos += 3; // Moeda de prata vale 3 pontos
            placar.setText('Moedas: ' + gameState.pontos);
        });
    } else if (moedaEscolhida == 'bronze'){
        var x = Math.random() * gameState.larguraJogo;;
        moedaEscolhida = this.physics.add.sprite(x, 100, moedaEscolhida).setScale(0.20);
        moedaEscolhida.setCollideWorldBounds(true);
        moedaEscolhida.setBounce(0.7);
        this.physics.add.collider(moedaEscolhida, plataforma1);
        this.physics.add.collider(moedaEscolhida, plataforma2); 
        moedaEscolhida.body.setSize(300, 300, true);
        this.physics.add.overlap(alien, moedaEscolhida, function(){
            moedaEscolhida.destroy();
            gameState.pontos += 1; // Moeda de bronze vale 1 ponto
            placar.setText('Moedas: ' + gameState.pontos);
        });
    } else {
        var x = Math.random() * gameState.larguraJogo;;
        moedaEscolhida = this.physics.add.sprite(x, 100, moedaEscolhida).setScale(0.2);
        moedaEscolhida.setCollideWorldBounds(true);
        moedaEscolhida.setBounce(0.7);
        this.physics.add.collider(moedaEscolhida, plataforma1);
        this.physics.add.collider(moedaEscolhida, plataforma2);
        moedaEscolhida.body.setSize(300, 230, true);
        this.physics.add.overlap(alien, moedaEscolhida, function(){
            moedaEscolhida.destroy();
            gameState.pontos -= 5; // Moeda de bronze vale 1 ponto
            placar.setText('Moedas: ' + gameState.pontos);
        });
    }
    
}