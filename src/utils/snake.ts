export default class Snake {
    body: any; //exportation de la classe Snake
    direction: string;
    ateApple: boolean;

    constructor(direction: string, ...body: any) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
    }

    advance() { //permet l'avancement du serpent
        const nextPosition = this.body[0].slice();
        switch(this.direction){
            case "left":
                nextPosition[0] -= 1;
                break;
            case "right":
                nextPosition[0] += 1;
                break;
            case "down":
                nextPosition[1] += 1;
                break;
            case "up":
                nextPosition[1] -= 1;
                break;
            default:
                throw("invalid direction");
        }
        this.body.unshift(nextPosition);
        if (!this.ateApple)
            this.body.pop();
        else
            this.ateApple = false;
    }

    setDirection(newDirection:string) { //permet de changer de direction le serpent
        let allowedDirections;
        switch(this.direction){
            case "left":
            case "right":
                allowedDirections=["up","down"];
                break;
            case "down":
            case "up":
                allowedDirections=["left","right"];
                break;
            default:
                throw("invalid direction");
        }
        if (allowedDirections.includes(newDirection)){
            this.direction = newDirection;
        }
    }

    checkCollision(widthInBlocks:number, heightInBlocks:number) { //vérifier s'il y a une collision contre le mur ou le serpent lui-même
        let wallCollision = false;
        let snakeCollision = false;
        const [head, ...rest]= this.body;
        const[snakeX, snakeY] = head;
        const minX = 0;
        const minY = 0;
        const maxX = widthInBlocks;
        const maxY = heightInBlocks;
        const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
            wallCollision = true;

        for (let block of rest){
            if (snakeX === block[0] && snakeY === block[1])
                snakeCollision = true;
        }

        return wallCollision || snakeCollision;
    }

    isEatingApple(appleToEat:any) { //Le serpent mange la pomme
        const head = this.body[0];
        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
            return true;
        else
            return false;
    }

}