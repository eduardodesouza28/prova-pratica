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
        super(60, 10, canvas.width - 340, canvas.height - 30)
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Ball extends Entity {
    constructor() {
        super(60, 10, canvas.width - 308, canvas.height - 40)
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(canvas.width - 308, canvas.height - 40, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Obstaule extends Entity {
    constructor(posx) {
        super(60, 10, posx = canvas.width - 340, canvas.height - 380)
    }
    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.posx, this.posy, this.sizex, this.sizey)
    }
}

class Game {
    constructor() {
        this.obstacles = [this.obstacle = new Obstaule(), this.obstacle = new Obstaule(400)]
        // for (i = 0; i <= 5; i++){
        //     this.obstacles.push(this.obstacle = new Obstaule())
        // }
        this.racket = new Racket()
        this.ball = new Ball()
        this.init()
    }

    init() {
        document.addEventListener("keypress", (e) => {
            if (e.code === "ArrowRight") {
                this.racket.posx += 10
            }
        })
        this.loop()
    }

    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.racket.draw()
        this.ball.draw()
        this.obstacles.forEach(obs => {
            obs.draw()
        });
        requestAnimationFrame(() => this.loop())
    }
}

const game = new Game()  
