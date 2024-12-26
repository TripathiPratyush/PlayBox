// Get the canvas and context
const canvas = document.getElementById("dino-game");
const ctx = canvas.getContext("2d");

// Dinosaur object with properties
let dino = {
    x: 50,
    y: 150,
    width: 30,
    height: 30,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    isJumping: false,
};

// Obstacle object
let obstacle = {
    x: canvas.width,
    y: 150,
    width: 20,
    height: 30,
    dx: 5,
};

// Game variables
let score = 0;
let gameOver = false;

// Function to draw the dinosaur
function drawDino() {
    ctx.fillStyle = "green";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Function to draw the obstacle
function drawObstacle() {
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Function for the jump action
function jump() {
    if (!dino.isJumping) {
        dino.isJumping = true;
        dino.dy = dino.jumpPower;
    }
}

// Game update loop
function update() {
    if (gameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity to the dinosaur
    dino.dy += dino.gravity;
    dino.y += dino.dy;

    // Prevent the dino from falling through the floor
    if (dino.y > 150) {
        dino.y = 150;
        dino.isJumping = false;
    }

    // Move the obstacle
    obstacle.x -= obstacle.dx;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = canvas.width;
        score++;
    }

    // Check for collision with the obstacle
    if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.height + dino.y > obstacle.y
    ) {
        gameOver = true;
        alert("Game Over! Your score: " + score);
    }

    // Draw the dinosaur and obstacle
    drawDino();
    drawObstacle();

    // Display the score
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    // Loop the update function
    requestAnimationFrame(update);
}

// Event listener for the jump action
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        jump();
    }
});

// Start the game update loop
update();
