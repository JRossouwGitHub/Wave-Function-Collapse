const canvas = document.getElementsByTagName("canvas")[0]
const ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 800
const squareSize = 50
const entropy = ["Grass", "Sand", "Water"]
const map = [
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
    [entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy, entropy],
]

let currentNode = null
let neighbours = {
    topLeft: null,
    top: null,
    topRight: null,
    right: null,
    bottomRight: null,
    bottom: null,
    bottomLeft: null,
    left: null
}
const getLowestEntropy = () => {
    if(!currentNode){
        let y = Math.floor(Math.random() * ((map.length - 1) - 0 + 1) + 0)
        let x = Math.floor(Math.random() * ((map.length - 1) - 0 + 1) + 0)
        currentNode = [x, y]
        neighbours.topLeft = [x - 1 >= 0 ? x - 1 : null, y - 1 >= 0 ? y - 1 : null]
        neighbours.top = [x, y - 1 >= 0 ? y - 1 : null]
        neighbours.topRight = [x + 1 < map.length ? x + 1 : null, y - 1 >= 0 ? y - 1 : null]
        neighbours.right = [x + 1 < map.length ? x + 1 : null, y]
        neighbours.bottomRight = [x + 1 < map.length ? x + 1 : null, y + 1 < map.length ? y + 1 : null]
        neighbours.bottom = [x, y + 1 < map.length ? y + 1 : null]
        neighbours.bottomLeft = [x - 1 >= 0 ? x - 1 : null, y + 1 < map.length ? y + 1 : null]
        neighbours.left = [x - 1 > 0 ? x - 1 : null, y]
        console.log([x, y])
    }
    ctx.beginPath();
    ctx.fillStyle = "green"
    ctx.fillRect(currentNode[0] * 50, currentNode[1] * 50, 50, 50);
    ctx.closePath();

    for(const neighbour of Object.entries(neighbours)){
        if(neighbour.filter(c => c[0] && c[1]).length > 0){
            //console.log(neighbour)
            ctx.beginPath();
            ctx.fillStyle = "yellow"
            ctx.fillRect(neighbour[0] * 50, neighbour[1] * 50, 50, 50);
            ctx.closePath();
        }
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)

    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            ctx.beginPath();
            ctx.strokeStyle = "white"
            ctx.rect(i * squareSize, j * squareSize, squareSize, squareSize);
            ctx.stroke();
            ctx.closePath();

            //Draw the text
            ctx.beginPath();
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = `${squareSize/2}px Arial`
            ctx.fillText(map[i][j].length, i * squareSize + (squareSize/2), j * squareSize + (squareSize/2))
            ctx.closePath();
        }
    }

    getLowestEntropy()
}

animate()