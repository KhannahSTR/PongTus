// Déclaration des constantes
const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

// Initialisation des variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const paddleHeight = 100;
const paddleWidth = 10;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 10;

// Fonction de dessin de la balle
function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI * 2);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
}

// Fonction de dessin des raquettes
function drawPaddles() {
    // Raquette de joueur 1
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);

    // Raquette de joueur 2
    context.fillStyle = "#FFFFFF";
    context.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
}

// Fonction de dessin du terrain de jeu
function draw() {
    // Effacer le canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la balle
    drawBall();

    // Dessiner les raquettes
    drawPaddles();

    // Mettre à jour la position de la balle
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebond de la balle sur les murs verticaux
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Rebond de la balle sur les raquettes
    if (ballX < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight ||
        ballX > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Détection de la perte de la balle par le joueur 1
    if (ballX < 0) {
        // Réinitialiser la position de la balle
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5;
        ballSpeedY = 5;
    }

    // Mettre à jour l'affichage
    requestAnimationFrame(draw);
}

// Écouteur d'événement pour le mouvement des raquettes
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    } else if (event.key === "ArrowDown" && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += paddleSpeed;
    } else if (event.key === "w" && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    } else if (event.key === "s" && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }
});

// Démarrer le jeu
draw();
