/*Importation du compilateur babel ainsi que la classe Game*/
import "babel-polyfill";
import Game from "./game.js";

/*Au chargement de la page, le jeu se lance*/
window.onload = () => {

    let myGame = new Game();
    myGame.init();

    /*Diriger le serpent avec les flèches du clavier*/
    document.onkeydown = (e) => {
        const key = e.key;
        let newDirection;
        switch(key){
            case "Left":
            case "ArrowLeft":    
                newDirection = "left";
                break;
            case "Up":
            case "ArrowUp":   
                newDirection = "up";
                break;
            case "Right":
            case "ArrowRight":
                newDirection = "right";
                break;
            case "Down":
            case "ArrowDown":
                newDirection = "down";
                break;
            case "Enter":
                myGame.launch();
                return;
            default:
                return;
        }
        myGame.snakee.setDirection(newDirection);
    };

}
