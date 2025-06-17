export default class Apple {
    position: number[]; //exportation de la classe Apple

    constructor(position = [10,10]) {
        this.position = position;
    }

    setNewPosition(widthInBlocks:number, heightInBlocks:number) { //permet de changer de position la pomme
        const newX = Math.round(Math.random()*(widthInBlocks-1));
        const newY = Math.round(Math.random()*(heightInBlocks-1));
        this.position = [newX,newY];
    }

    isOnSnake(snakeToCheck: { body: any; }) { //vérifier si le serpent s'est mordu lui-même
        let isOnSnake = false;
        for (let block of snakeToCheck.body){
            if(this.position[0] === block[0] && this.position[1] === block[1]){
                isOnSnake = true;
            }
        }
        return isOnSnake;
    }

}