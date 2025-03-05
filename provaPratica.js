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
        super(100, 10, canvas.width - 360, canvas.height - 30)
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Ball extends Entity {
    constructor() {
        super(60, 10, canvas.width - 308, canvas.height - 40)
        this.veloy = 5
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
        if (this.posy + 8 >= canvas.height || this.posy - 8 <= 0) {
            this.veloy = -this.veloy
        }
        this.posx += this.velox
        this.posy += this.veloy
    }
}

class Obstaule extends Entity {
    constructor(posx) {
        super(60, 10, posx = canvas.width - 340, canvas.height - 380)
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Game {
    constructor() {
        this.obstacles = [this.obstacle = new Obstaule(100), this.obstacle = new Obstaule(400)]
        // for (i = 0; i <= 5; i++){
        //     this.obstacles.push(this.obstacle = new Obstaule())
        // }
        this.racket = new Racket()
        this.ball = new Ball()
        this.init()
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
