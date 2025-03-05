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
        super(150, 10, canvas.width - 370, canvas.height - 30)
        this.right = false
        this.left = false
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
        this.lifes = 5
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.posx, this.posy, 8, 0, Math.PI * 2)
        ctx.fill()
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
            this.posy = canvas.height - 40
            this.veloy = -this.veloy
        } else if (this.posy > canvas.height && this.lifes > 0) {
            this.resetBall()
            this.lifes--
        } else if (this.posy > canvas.height && this.lifes <= 0) {
            location.reload()
        }

        this.posx += this.velox
        this.posy += this.veloy
        this.drawlifes()
    }

    drawlifes() {
        ctx.fillStyle = "blue"
        ctx.font = "40px Arial"
        ctx.fillText(this.lifes, canvas.width - 300, canvas.height - 50)
    }

    resetBall() {
        this.posx = canvas.width / 2
        this.posy = canvas.height - 40
        this.veloy = -5
        this.velox = 5
    }

}

class Obstaule extends Entity {
    constructor(posx, posy) {
        super(50, 25, posx, posy)
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
        this.points = 0
        this.gameover = false
        this.init()
    }
    createObstacles() {
        const rows = 6
        const cols = 10
        const obstacleWidth = 50
        const obstacleHeight = 30
        const padding = 5

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const posx = col * (obstacleWidth + padding) + 25
                const posy = row * (obstacleHeight + padding) + 10
                this.obstacles.push(new Obstaule(posx, posy))
            }
        }
    }

    gameOver() {
        this.ball.velox = 0
        this.ball.veloy = 0
        this.gameover = true
        ctx.fillStyle = "blue"
        ctx.fillRect((canvas.width / 2) - 150, (canvas.height / 2) - 50, 300, 100)
        ctx.fillStyle = "black"
        ctx.font = "40px Arial"
        ctx.fillText("Game Over", (canvas.width / 2) - 95, (canvas.height / 2))
    }

    drawPoints() {
        ctx.fillStyle = "blue"
        ctx.font = "40px Arial"
        ctx.fillText(this.points, canvas.width - 150, canvas.height - 50)
    }
    checkObstacleCollision() {
        for (let i = 0; i < this.obstacles.length; i++) {
            const obs = this.obstacles[i];
            console.log(obs)
            if (this.ball.posx + 8 >= obs.posx && this.ball.posx - 8 <= obs.posx + obs.sizex &&
                this.ball.posy + 8 >= obs.posy && this.ball.posy - 8 <= obs.posy + obs.sizey) {
                this.obstacles.splice(i, 1)
                this.ball.veloy = -this.ball.veloy
                this.points ++
                break
            }
        }
        if (this.obstacles.length == 0) {
            location.reload()
        }
    }
    movimentRacket() {
        if (this.racket.right) {
            this.racket.posx += 10
            if (this.racket.posx + this.racket.sizex > canvas.width) {
                this.racket.posx = canvas.width - this.racket.sizex
            }
        }
        if (this.racket.left) {
            this.racket.posx -= 10;
            if (this.racket.posx < 0) {
                this.racket.posx = 0
            }
        }
    }
    init() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowRight") {
                this.racket.right = true
            }
            if (e.code === "ArrowLeft") {
                this.racket.left = true
            }
        })

        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowRight") {
                this.racket.right = false
            }
            if (e.code === "ArrowLeft") {
                this.racket.left = false
            }
        })
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                if (this.gameover) {
                    location.reload()
                }
            }
        })
        this.loop()
    }

    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.ball.moveBall()
        this.movimentRacket()
        this.racket.draw()
        this.ball.draw()
        this.drawPoints()
        this.checkObstacleCollision()
        this.obstacles.forEach(obs => {
            obs.draw()
        });
        if(this.ball.lifes <= 0){
            this.gameOver()
        }
        if(this.obstacles.length == 0){
            this.createObstacles()
        }

        requestAnimationFrame(() => this.loop())
    }
}

const game = new Game()  
