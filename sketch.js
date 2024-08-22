// Variáveis do Menu
var xBotao = 150;
var yBotao1 = 200;
var yBotao2 = 250;
var alturaBotao = 40;
var larguraBotao = 200;
var tela = 0;
var imagem1;
var xBotaoVoltar = 10;
var yBotaoVoltar = 10;
var alturaBotaovolta = 30;
var larguraBotaovolta = 30;
var xBotaoInstrucoes = 370;
var yBotaoInstrucoes = 450;
var alturaBotaoInstrucoes = 40;
var larguraBotaoInstrucoes = 100;

// Variáveis do Jogo Tetris
var cols = 10;
var rows = 20;
var grid = [];
var currentPiece;
var nextPiece;
var score = 0;
var dropInterval = 500;
var lastDropTime = 0;

// Cores das peças Tetris
var colors = [
  null,
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];

// Peças Tetris
var pieces = [
  [ // I
    [1, 1, 1, 1]
  ],
  [ // J
    [2, 0, 0],
    [2, 2, 2]
  ],
  [ // L
    [0, 0, 3],
    [3, 3, 3]
  ],
  [ // O
    [4, 4],
    [4, 4]
  ],
  [ // S
    [0, 5, 5],
    [5, 5, 0]
  ],
  [ // T
    [0, 6, 0],
    [6, 6, 6]
  ],
  [ // Z
    [7, 7, 0],
    [0, 7, 7]
  ]
];

function setup() {
  createCanvas(500, 500);
  imagem1 = loadImage('menu.png');
  
  // Inicializa a grade vazia
  for (let r = 0; r < rows; r++) {
    grid[r] = Array(cols).fill(0);
  }

  newPiece(); // Gera a primeira peça
}

function draw() {
  if (tela == 0) {
    // Tela do Menu
    background(imagem1);
    
    let colors = [
      color(255, 0, 0),  // Red
      color(0, 255, 0),  // Green
      color(0, 0, 255),  // Blue
      color(255, 255, 0), // Yellow
      color(255, 165, 0), // Orange
      color(128, 0, 128)  // Purple
    ];
    
    let word = "TETRIS";
    let x = 200;
    
    textFont("impact");
    textSize(40);
    
    for (let i = 0; i < word.length; i++) {
      fill(colors[i % colors.length]);
      text(word[i], x + i * 20, 160);
    }

    // Desenha o botão de "Iniciar"
    if (mouseX > xBotao && mouseX < xBotao + larguraBotao && mouseY > yBotao1 && mouseY < alturaBotao + yBotao1) {
      fill(200);
    } else {
      fill(255);
    }
    rect(xBotao, yBotao1, larguraBotao, alturaBotao, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Iniciar", xBotao + larguraBotao / 2, yBotao1 + alturaBotao / 2);

    // Desenha o botão de "Créditos"
    if (mouseX > xBotao && mouseX < xBotao + larguraBotao && mouseY > yBotao2 && mouseY < alturaBotao + yBotao2) {
      fill(200, 0, 0);
    } else {
      fill(255);
    }
    rect(xBotao, yBotao2, larguraBotao, alturaBotao, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Créditos", xBotao + larguraBotao / 2, yBotao2 + alturaBotao / 2);

    // Desenha o botão de "Instruções"
    if (mouseX > xBotaoInstrucoes && mouseX < xBotaoInstrucoes + larguraBotaoInstrucoes && mouseY > yBotaoInstrucoes && mouseY < alturaBotaoInstrucoes + yBotaoInstrucoes) {
      fill(200);
    } else {
      fill(255);
    }
    rect(xBotaoInstrucoes, yBotaoInstrucoes, larguraBotaoInstrucoes, alturaBotaoInstrucoes, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Instruções", xBotaoInstrucoes + larguraBotaoInstrucoes / 2, yBotaoInstrucoes + alturaBotaoInstrucoes / 2);
  }

  if (tela == 1) {
    // Tela do Jogo Tetris
    background(0);
    drawGrid(); // Desenha a grade
    drawPiece(currentPiece); // Desenha a peça atual

    if (millis() - lastDropTime > dropInterval) {
      currentPiece.moveDown(); // Move a peça para baixo
      lastDropTime = millis();
    }

    // Exibe a pontuação
    fill(255);
    textSize(20);
    text("Pontuação: " + score, 20, 30);
  }

  if (tela == 2) {
    // Tela dos Créditos
    background(imagem1);
    
    let colors = [
      color(255, 0, 0),  // Red
      color(0, 255, 0),  // Green
      color(0, 0, 255),  // Blue
      color(255, 255, 0), // Yellow
      color(255, 165, 0), // Orange
      color(128, 0, 128)  // Purple
    ];

    let word = "CRÉDITOS";
    let x = 170;
    
    textFont("impact");
    textSize(40);

    for (let i = 0; i < word.length; i++) {
      fill(colors[i % colors.length]);
      text(word[i], x + i * 20, 100);
    }

    // Desenha o bloco branco para os créditos
    noStroke();
    fill(255);
    rect(50, 150, 400, 200, 10); 

    // Adiciona o texto dos créditos dentro do bloco
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Criador: Marcus Vinícius de Almeida Amaral\n" +
         "Orientador: Orivaldo Santana\n" +
         "Lógica de programação. Turma 2C de C&T", 
         60, 160, 360, 180); 

    // Desenha o botão de "Voltar"
    fill(128, 128, 128); 
    stroke(0);
    strokeWeight(1);
    rect(xBotaoVoltar, yBotaoVoltar, larguraBotaovolta, alturaBotaovolta, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("↩", xBotaoVoltar + larguraBotaovolta / 2, yBotaoVoltar + alturaBotaovolta / 2);
  }

  if (tela == 3) {
    // Tela das Instruções
    background(imagem1);
    
    let colors = [
      color(255, 0, 0),  // Red
      color(0, 255, 0),  // Green
      color(0, 0, 255),  // Blue
      color(255, 255, 0), // Yellow
      color(255, 165, 0), // Orange
      color(128, 0, 128)  // Purple
    ];

    let word = "INSTRUÇÕES";
    let x = 170;
    
    textFont("impact");
    textSize(40);

    for (let i = 0; i < word.length; i++) {
      fill(colors[i % colors.length]);
      text(word[i], x + i * 20, 100);
    }

    // Desenha o bloco branco para as instruções
    noStroke();
    fill(255);
    rect(50, 150, 400, 200, 10); 

    // Adiciona o texto das instruções dentro do bloco
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Forme linhas com os blocos para ganhar pontos!\n" +
         "Setas esquerda e direita movem a peça\n" +
         "Seta para cima troca de posição\n" +
         "Seta para baixo faz a peça cair mais rápido", 
         60, 160, 360, 180); 

    // Desenha o botão de "Voltar"
    fill(128, 128, 128); 
    stroke(0);
    strokeWeight(1);
    rect(xBotaoVoltar, yBotaoVoltar, larguraBotaovolta, alturaBotaovolta, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("↩", xBotaoVoltar + larguraBotaovolta / 2, yBotaoVoltar + alturaBotaovolta / 2);
  }
}

// Função para desenhar a grade do Tetris
function drawGrid() {
  stroke(50);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c]) {
        fill(colors[grid[r][c]]);
        rect(c * 25, r * 25, 25, 25);
      } else {
        fill(0);
        rect(c * 25, r * 25, 25, 25);
      }
    }
  }
}

// Função para desenhar a peça atual
function drawPiece(piece) {
  for (let r = 0; r < piece.blocks.length; r++) {
    for (let c = 0; c < piece.blocks[r].length; c++) {
      if (piece.blocks[r][c]) {
        fill(colors[piece.type]);
        rect((piece.x + c) * 25, (piece.y + r) * 25, 25, 25);
      }
    }
  }
}

// Função para gerar uma nova peça
function newPiece() {
  let index = floor(random(pieces.length));
  currentPiece = new Piece(pieces[index], index + 1);
}

// Classe para as peças
class Piece {
  constructor(blocks, type) {
    this.blocks = blocks;
    this.type = type;
    this.x = floor(cols / 2) - floor(this.blocks[0].length / 2);
    this.y = 0;
  }

  // Função para mover a peça para baixo
  moveDown() {
    if (!this.collides(0, 1)) {
      this.y++;
    } else {
      this.lock();
      newPiece();
    }
  }

  // Função para mover a peça horizontalmente
  moveHorizontal(dir) {
    if (!this.collides(dir, 0)) {
      this.x += dir;
    }
  }

  // Função para rotacionar a peça
  rotate() {
    let newBlocks = [];
    for (let c = 0; c < this.blocks[0].length; c++) {
      let newRow = [];
      for (let r = this.blocks.length - 1; r >= 0; r--) {
        newRow.push(this.blocks[r][c]);
      }
      newBlocks.push(newRow);
    }

    let originalBlocks = this.blocks;
    this.blocks = newBlocks;

    if (this.collides(0, 0)) {
      this.blocks = originalBlocks;
    }
  }

  // Função para verificar colisões
  collides(offsetX, offsetY) {
    for (let r = 0; r < this.blocks.length; r++) {
      for (let c = 0; c < this.blocks[r].length; c++) {
        if (this.blocks[r][c]) {
          let newX = this.x + c + offsetX;
          let newY = this.y + r + offsetY;

          if (newX < 0 || newX >= cols || newY >= rows || grid[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Função para travar a peça no grid
  lock() {
    for (let r = 0; r < this.blocks.length; r++) {
      for (let c = 0; c < this.blocks[r].length; c++) {
        if (this.blocks[r][c]) {
          grid[this.y + r][this.x + c] = this.type;
        }
      }
    }
    this.clearLines(); // Limpa as linhas completas
  }

  // Função para limpar as linhas completas
  clearLines() {
    for (let r = rows - 1; r >= 0; r--) {
      let isComplete = true;
      for (let c = 0; c < cols; c++) {
        if (!grid[r][c]) {
          isComplete = false;
          break;
        }
      }
      if (isComplete) {
        score++;
        grid.splice(r, 1); // Remove a linha completa
        grid.unshift(Array(cols).fill(0)); // Adiciona uma nova linha vazia no topo
        r++; // Reavalia a mesma linha, pois as linhas acima caíram
      }
    }
  }
}

// Função de controle das teclas
function keyPressed() {
  if (tela == 1) {
    if (keyCode === LEFT_ARROW) {
      currentPiece.moveHorizontal(-1);
    } else if (keyCode === RIGHT_ARROW) {
      currentPiece.moveHorizontal(1);
    } else if (keyCode === DOWN_ARROW) {
      currentPiece.moveDown();
    } else if (keyCode === UP_ARROW) {
      currentPiece.rotate();
    }
  }
}

// Função de clique do mouse
function mouseClicked() {
  if (mouseX > xBotao && mouseX < xBotao + larguraBotao && mouseY > yBotao1 && mouseY < alturaBotao + yBotao1) {
    tela = 1; // Vai para a tela do jogo
  } else if (mouseX > xBotao && mouseX < xBotao + larguraBotao && mouseY > yBotao2 && mouseY < alturaBotao + yBotao2) {
    tela = 2; // Vai para a tela de créditos
  } else if (mouseX > xBotaoInstrucoes && mouseX < xBotaoInstrucoes + larguraBotaoInstrucoes && mouseY > yBotaoInstrucoes && mouseY < alturaBotaoInstrucoes + yBotaoInstrucoes) {
    tela = 3; // Vai para a tela de instruções
  } else if (mouseX > xBotaoVoltar && mouseX < xBotaoVoltar + larguraBotaovolta && mouseY > yBotaoVoltar && mouseY < alturaBotaovolta + yBotaoVoltar) {
    tela = 0; // Volta para a tela do menu
  }
}
