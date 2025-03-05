const canvas = document.getElementById("canvasJogo")
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 400

class Entity {
    constructor(sizex, sizey, posx, posy) {
        this.sizex = sizex
        this.sizey = sizey
        this.posx = posx
        this.posy = posy
    }

    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Racket extends Entity {
    constructor() {
        super(150, 10, canvas.width - 360, canvas.height - 30)
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Ball extends Entity {
    constructor() {
        super(60, 10, canvas.width - 308, canvas.height - 40)
        this.veloy = -5
        this.velox = 5
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, 8, 0, Math.PI * 2);
        ctx.fill();
    }
    moveBall() {
        if (this.posx + 8 >= canvas.width || this.posx - 8 <= 0) {
            this.velox = -this.velox
        }
        if (this.posy - 8 <= 0) {
            this.veloy = -this.veloy
        }

        if (this.posy + 8 >= canvas.height - 30 &&
            this.posx >= game.racket.posx &&
            this.posx <= game.racket.posx + game.racket.sizex) {
            this.veloy = -this.veloy
        } else if (this.posy > canvas.width - 20) {
            this.posx = canvas.width - 308
            this.posy = canvas.height - 40
            this.veloy = -5
        }

        this.posx += this.velox
        this.posy += this.veloy
    }
}

class Obstaule extends Entity {
    constructor(posx, posy) {
        super(100, 50, posx, posy)
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Game {
    constructor() {
        this.obstacles = []
        this.createObstacles()
        this.racket = new Racket()
        this.ball = new Ball()
        this.init()
    }
    createObstacles() {
        const rows = 2
        const cols = 5
        const obstacleWidth = 100
        const obstacleHeight = 40
        const padding = 20

        for (let row = 0; row <= rows; row++) {
            for (let col = 0; col <= cols; col++) {
                const posx = col * (obstacleWidth + padding) + 10
                const posy = row * (obstacleHeight + padding) + 50
                this.obstacles.push(new Obstaule(posx, posy));
            }
        }
    }

    init() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowRight") {

                if (this.racket.posx + this.racket.sizex < canvas.width) {
                    this.racket.posx += 10
                }
            }
            if (e.code === "ArrowLeft") {
                if (this.racket.posx > 0) {
                    this.racket.posx -= 10
                }
            }
        });
        this.loop()
    }

    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.racket.draw()
        this.ball.draw()
        this.obstacles.forEach(obs => {
            obs.draw()
        });
        this.ball.moveBall()
        requestAnimationFrame(() => this.loop())
    }
}

const game = new Game()  
