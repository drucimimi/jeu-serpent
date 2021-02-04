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
            case "left":
                newDirection = "left";
                break;
            case "up":
                newDirection = "up";
                break;
            case "right":
                newDirection = "right";
                break;
            case "down":
                newDirection = "down";
                break;
            case "Escape":
                myGame.launch();
                return;
            default:
                return;
        }
        myGame.snakee.setDirection(newDirection);
    };

}
