const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const map = new Map({rows: 50, cols: 50, cell: 15}, ctx)
const init = (w, h) => {
    canvas.width = window.innerWidth -2 || w
    canvas.height = window.innerHeight -2 || h
}

const run = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    map.update()
    requestAnimationFrame(run)
}

const start = () => {
    init()
    map.generate()
    run()
}

start()