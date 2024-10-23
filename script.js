const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;  // Tamanho de cada parte da cobra
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];  // Posição inicial da cobra
let food = generateRandomPosition();  // Posição inicial da comida
let direction = { x: 0, y: 0 };  // Direção inicial
let speed = 150;  // Velocidade inicial
let score = 0;
let isGameOver = false;

function gameLoop() {
    if (isGameOver) return;
    
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
    
    setTimeout(gameLoop, speed);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(part.x, part.y, boxSize, boxSize);
    });
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * boxSize,
        y: snake[0].y + direction.y * boxSize
    };
    
    snake.unshift(newHead);  // Adiciona nova cabeça

    // Se a cobra comer a comida
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food = generateRandomPosition();  // Gera nova posição para a comida
    } else {
        snake.pop();  // Remove a última parte da cobra
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function generateRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x, y };
}

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 37 && direction.x === 0) {  // Esquerda
        direction = { x: -1, y: 0 };
    } else if (key === 38 && direction.y === 0) {  // Cima
        direction = { x: 0, y: -1 };
    } else if (key === 39 && direction.x === 0) {  // Direita
        direction = { x: 1, y: 0 };
    } else if (key === 40 && direction.y === 0) {  // Baixo
        direction = { x: 0, y: 1 };
    }
}

function checkCollision() {
    const head = snake[0];

    // Verifica se a cobra colidiu com as paredes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    // Verifica se a cobra colidiu com si mesma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    isGameOver = true;
    alert(`Fim de jogo! Sua pontuação foi: ${score}`);
}

function resetGame() {
    snake = [{ x: boxSize * 5, y: boxSize * 5 }];
    direction = { x: 0, y: 0 };
    food = generateRandomPosition();
    isGameOver = false;
    score = 0;
    gameLoop();
}

// Listeners de eventos
document.addEventListener('keydown', changeDirection);
resetButton.addEventListener('click', resetGame);

// Inicia o jogo
gameLoop();
