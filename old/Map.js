class Map{
    constructor(size = {rows: 1, cols: 1, cell: 50}){
        this.size = size
        this.cells = []
    }

    update(){
        this.draw()
    }

    generate(){
        for(let i = 1; i < this.size.rows + 1; i++){
            for(let j = 1; j < this.size.cols + 1; j++){
                this.cells.push({x: i * this.size.cell, y: j * this.size.cell, w: this.size.cell, h: this.size.cell, type: undefined, availableTypes: ["Grass", "Sand", "Water"]})
            }
        }

        const startingCell = this.cells[Math.floor(Math.random() * ((this.cells.length - 1) - 0 + 1) + 0)]
        startingCell.type = "Grass"
        //this.propogate(startingCell, true)
        //this.propogateV2(startingCell)
        //this.propogateV3(startingCell, true)
        this.propogateV4(startingCell)
    }

    propogate(startingCell, load = false, iterations = 1, step = 0){
        if(step == iterations){
            return
        }
        step++
        let topOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1]
        if(topOfStartingCell && topOfStartingCell.type == undefined) topOfStartingCell.type = "Border"

        let topLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 - this.size.cols]
        if(topLeftOfStartingCell && topLeftOfStartingCell.type == undefined) topLeftOfStartingCell.type = "Border"

        let topRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 + this.size.cols]
        if(topRightOfStartingCell && topRightOfStartingCell.type == undefined) topRightOfStartingCell.type = "Border"

        let bottomOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1]
        if(bottomOfStartingCell && bottomOfStartingCell.type == undefined) bottomOfStartingCell.type = "Border"

        let bottomLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 - this.size.cols]
        if(bottomLeftOfStartingCell && bottomLeftOfStartingCell.type == undefined) bottomLeftOfStartingCell.type = "Border"

        let bottomRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 + this.size.cols]
        if(bottomLeftOfStartingCell && bottomLeftOfStartingCell.type == undefined) bottomLeftOfStartingCell.type = "Border"

        let leftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - this.size.cols]
        if(leftOfStartingCell && leftOfStartingCell.type == undefined) leftOfStartingCell.type = "Border"

        let rightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + this.size.cols]
        if(rightOfStartingCell && rightOfStartingCell.type == undefined) rightOfStartingCell.type = "Border"

        const potentialStartingCells = this.cells.filter(cell => cell.type == "Border")

        const newStartingCell = potentialStartingCells[Math.floor(Math.random() * (potentialStartingCells.length -1 * 0) + 0)]

        if(newStartingCell){
            topOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - 1]
            topLeftOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - 1 - this.size.cols]
            topRightOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - 1 + this.size.cols]
            bottomOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + 1]
            bottomLeftOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + 1 - this.size.cols]
            bottomRightOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + 1 + this.size.cols]
            leftOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - this.size.cols]
            rightOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + this.size.cols]
            const checkCells = [topLeftOfStartingCell, topOfStartingCell, topRightOfStartingCell, bottomLeftOfStartingCell, bottomOfStartingCell, bottomRightOfStartingCell, leftOfStartingCell, rightOfStartingCell]
            const checkType = checkCells.filter(cell => cell && cell.type != undefined && cell.type != "Border")
            const odds = Math.random()
            switch(checkType[Math.floor(Math.random() * (checkType.length -1 * 0) + 0)].type){
                case "Grass":
                    if(odds <= 0.95){
                        newStartingCell.type = "Grass"
                    }
                    else{
                        newStartingCell.type = "Sand"
                    }
                    break;
                case "Sand":
                    if(odds <= 0.90){
                        newStartingCell.type = "Sand"
                    }
                    else if(odds <= 0.92){
                        newStartingCell.type = "Grass"
                    }
                    else {
                        newStartingCell.type = "Water" 
                    }
                    break;
                case "Water":
                    if(odds <= 0.90){
                        newStartingCell.type = "Water"
                    }
                    else{
                        newStartingCell.type = "Sand" 
                    }
                    break;
            }
        } 
        
        if(load){
            setTimeout(()=>{
                    this.propogate(newStartingCell, true, this.cells.length, step)
                }, 1)
        } else {
            this.propogate(newStartingCell, false, this.cells.length, step)
        }
        
    }

    propogateV2(startingCell){
        for(let i = 0; i < this.cells.length; i++){
            let topOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1]
            if(topOfStartingCell && topOfStartingCell.type == undefined) topOfStartingCell.type = "Border"

            let topLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 - this.size.cols]
            if(topLeftOfStartingCell && topLeftOfStartingCell.type == undefined) topLeftOfStartingCell.type = "Border"

            let topRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 + this.size.cols]
            if(topRightOfStartingCell && topRightOfStartingCell.type == undefined) topRightOfStartingCell.type = "Border"

            let bottomOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1]
            if(bottomOfStartingCell && bottomOfStartingCell.type == undefined) bottomOfStartingCell.type = "Border"

            let bottomLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 - this.size.cols]
            if(bottomLeftOfStartingCell && bottomLeftOfStartingCell.type == undefined) bottomLeftOfStartingCell.type = "Border"

            let bottomRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 + this.size.cols]
            if(bottomLeftOfStartingCell && bottomLeftOfStartingCell.type == undefined) bottomLeftOfStartingCell.type = "Border"

            let leftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - this.size.cols]
            if(leftOfStartingCell && leftOfStartingCell.type == undefined) leftOfStartingCell.type = "Border"

            let rightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + this.size.cols]
            if(rightOfStartingCell && rightOfStartingCell.type == undefined) rightOfStartingCell.type = "Border"

            const potentialStartingCells = this.cells.filter(cell => cell.type == "Border")

            const newStartingCell = potentialStartingCells[Math.floor(Math.random() * (potentialStartingCells.length -1 * 0) + 0)]

            if(newStartingCell){
                topOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - 1]
                topLeftOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - 1 - this.size.cols]
                topRightOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - 1 + this.size.cols]
                bottomOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + 1]
                bottomLeftOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + 1 - this.size.cols]
                bottomRightOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + 1 + this.size.cols]
                leftOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) - this.size.cols]
                rightOfStartingCell = this.cells[this.cells.indexOf(newStartingCell) + this.size.cols]
                const checkCells = [topLeftOfStartingCell, topOfStartingCell, topRightOfStartingCell, bottomLeftOfStartingCell, bottomOfStartingCell, bottomRightOfStartingCell, leftOfStartingCell, rightOfStartingCell]
                const checkType = checkCells.filter(cell => cell && cell.type != undefined && cell.type != "Border")
                const odds = Math.random()
                switch(checkType[Math.floor(Math.random() * (checkType.length -1 * 0) + 0)].type){
                    case "Grass":
                        if(odds <= 0.85){
                            newStartingCell.type = "Grass"
                        }
                        else{
                            newStartingCell.type = "Sand"
                        }
                        break;
                    case "Sand":
                        if(odds <= 0.50){
                            newStartingCell.type = "Grass"
                        }
                        else if(odds <= 0.70){
                            newStartingCell.type = "Sand"
                        }
                        else if(checkType.filter(cell => cell.type == "Grass").length < 1){
                            newStartingCell.type = "Water" 
                        }
                        else {
                            newStartingCell.type = "Sand"
                        }
                        break;
                    case "Water":
                        if(odds <= 0.75){
                            newStartingCell.type = "Water"
                        }
                        else{
                            newStartingCell.type = "Sand" 
                        }
                        break;
                }
            } 
            startingCell = newStartingCell
        }
    }

    propogateV3(startingCell, load = false, iterations = 1, step = 0){
        if(step == iterations){
            return
        }
        step++
        let topOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1]
        if(topOfStartingCell && topOfStartingCell.type == undefined) topOfStartingCell.type = "Border"

        let topLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 - this.size.cols]
        if(topLeftOfStartingCell && topLeftOfStartingCell.type == undefined) topLeftOfStartingCell.type = "Border"

        let topRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 + this.size.cols]
        if(topRightOfStartingCell && topRightOfStartingCell.type == undefined) topRightOfStartingCell.type = "Border"

        let bottomOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1]
        if(bottomOfStartingCell && bottomOfStartingCell.type == undefined) bottomOfStartingCell.type = "Border"

        let bottomLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 - this.size.cols]
        if(bottomLeftOfStartingCell && bottomLeftOfStartingCell.type == undefined) bottomLeftOfStartingCell.type = "Border"

        let bottomRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 + this.size.cols]
        if(bottomRightOfStartingCell && bottomRightOfStartingCell.type == undefined) bottomRightOfStartingCell.type = "Border"

        let leftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - this.size.cols]
        if(leftOfStartingCell && leftOfStartingCell.type == undefined) leftOfStartingCell.type = "Border"

        let rightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + this.size.cols]
        if(rightOfStartingCell && rightOfStartingCell.type == undefined) rightOfStartingCell.type = "Border"

        const borders = this.cells.filter(cell => cell.type == "Border")

        borders.map(border => {
            switch(startingCell.type){
                case "Grass":
                    border.availableTypes = border.availableTypes.filter(type => type != "Water")
                    break;
                case "Water":
                    border.availableTypes = border.availableTypes.filter(type => type != "Grass")
                    break;
            }
        })

        const newStartingCell = borders[Math.floor(Math.random() * (borders.length -1 * 0) + 0)]

        if(newStartingCell){
            if(newStartingCell.availableTypes.includes("Grass") && newStartingCell.availableTypes.length == 2){
                let odds = Math.random()
                if(odds < 0.85){
                    newStartingCell.type = "Grass"
                } else {
                    newStartingCell.type = "Sand"
                }
            }
            else if(newStartingCell.availableTypes.includes("Water") && newStartingCell.availableTypes.length == 2){
                let odds = Math.random()
                if(odds < 0.95){
                    newStartingCell.type = "Water"
                } else {
                    newStartingCell.type = "Sand"
                }
            }  
            else {
                newStartingCell.type = newStartingCell.availableTypes[Math.floor(Math.random() * (newStartingCell.availableTypes.length - 1 * 0) + 0)]
            }
        }
        
        if(load){
            setTimeout(()=>{
                    this.propogateV3(newStartingCell, true, this.cells.length, step)
                }, 1)
        } else {
            this.propogateV3(newStartingCell, false, this.cells.length, step)
        }
        
    }

    propogateV4(startingCell){
        for(let i = 0; i < this.cells.length; i++){
            let topOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1]
            if(topOfStartingCell && topOfStartingCell.type == undefined) topOfStartingCell.type = "Border"

            let topLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 - this.size.cols]
            if(topLeftOfStartingCell && topLeftOfStartingCell.type == undefined) topLeftOfStartingCell.type = "Border"

            let topRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) - 1 + this.size.cols]
            if(topRightOfStartingCell && topRightOfStartingCell.type == undefined) topRightOfStartingCell.type = "Border"

            let bottomOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1]
            if(bottomOfStartingCell && bottomOfStartingCell.type == undefined) bottomOfStartingCell.type = "Border"

            let bottomLeftOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 - this.size.cols]
            if(bottomLeftOfStartingCell && bottomLeftOfStartingCell.type == undefined) bottomLeftOfStartingCell.type = "Border"

            let bottomRightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + 1 + this.size.cols]
            if(bottomRightOfStartingCell && bottomRightOfStartingCell.type == undefined) bottomRightOfStartingCell.type = "Border"

            let leftOfStartingCell = this.cells[this.cells.indexOf(startingCell) - this.size.cols]
            if(leftOfStartingCell && leftOfStartingCell.type == undefined) leftOfStartingCell.type = "Border"

            let rightOfStartingCell = this.cells[this.cells.indexOf(startingCell) + this.size.cols]
            if(rightOfStartingCell && rightOfStartingCell.type == undefined) rightOfStartingCell.type = "Border"

            const borders = this.cells.filter(cell => cell.type == "Border")

            borders.map(border => {
                switch(startingCell.type){
                    case "Grass":
                        border.availableTypes = border.availableTypes.filter(type => type != "Water")
                        break;
                    case "Water":
                        border.availableTypes = border.availableTypes.filter(type => type != "Grass")
                        break;
                }
            })

            const newStartingCell = borders[Math.floor(Math.random() * ((borders.length) - 0) + 0)]
            if(newStartingCell){
                if(newStartingCell.availableTypes.includes("Grass") && newStartingCell.availableTypes.length == 2){
                    let odds = Math.random()
                    if(odds < 0.95){
                        newStartingCell.type = "Grass"
                    } else {
                        newStartingCell.type = "Sand"
                    }
                }
                else if(newStartingCell.availableTypes.includes("Water") && newStartingCell.availableTypes.length == 2){
                    let odds = Math.random()
                    if(odds < 0.95){
                        newStartingCell.type = "Water"
                    } else {
                        newStartingCell.type = "Sand"
                    }
                }  
                else {
                    newStartingCell.type = newStartingCell.availableTypes[Math.floor(Math.random() * ((newStartingCell.availableTypes.length) - 0) + 0)]
                }
            }
            startingCell = newStartingCell
        }
    }

    draw(){
        this.cells.map((cell) => {
            // ctx.beginPath();
            // ctx.strokeStyle = "white"
            // ctx.rect(cell.x, cell.y, cell.w, cell.h);
            // ctx.stroke();
            // ctx.closePath();

            ctx.beginPath();
            switch(cell.type){
                case "Grass":
                    ctx.fillStyle = "green"
                    break;
                case "Sand":
                    ctx.fillStyle = "sandybrown"
                    break;
                case "Water":
                    ctx.fillStyle = "lightskyblue"
                    break;
                case "Snow":
                    ctx.fillStyle = "snow"
                    break;
                case "Border":
                    ctx.fillStyle = "red"
                    break;
                default:
                    ctx.fillStyle = "black"
                    break;
            }
            ctx.fillRect(cell.x, cell.y, cell.w, cell.h)
            
        })
    }
}