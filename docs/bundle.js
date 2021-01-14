/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Apple\n/* harmony export */ });\nclass Apple {\n\n    constructor(position = [10,10]) {\n        this.position = position;\n    }\n\n    setNewPosition(widthInBlocks, heightInBlocks) {\n        const newX = Math.round(Math.random()*(widthInBlocks-1));\n        const newY = Math.round(Math.random()*(heightInBlocks-1));\n        this.position = [newX,newY];\n    }\n\n    isOnSnake(snakeToCheck) {\n        let isOnSnake = false;\n        for (let block of snakeToCheck.body){\n            if(this.position[0] === block[0] && this.position[1] === block[1]){\n                isOnSnake = true;\n            }\n        }\n        return isOnSnake;\n    }\n\n}\n\n\n//# sourceURL=webpack://jeu-serpent/./src/apple.js?");

/***/ }),

/***/ "./src/drawing.js":
/*!************************!*\
  !*** ./src/drawing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Drawing\n/* harmony export */ });\nclass Drawing{\n  static gameOver(ctx, centreX, centreY) {\n      ctx.save();\n      ctx.font = \"bold 70px sans-serif\";\n      ctx.fillStyle = \"#000\";\n      ctx.textAlign = \"center\";\n      ctx.textBaseline = \"middle\";\n      ctx.strokeStyle = \"white\";\n      ctx.lineWidth = 5;\n      ctx.strokeText(\"Game Over\", centreX, centreY - 180);\n      ctx.fillText(\"Game Over\", centreX, centreY - 180);\n      ctx.font = \"bold 30px sans-serif\";\n      ctx.strokeText(\"Appuyer sur la touche Espace pour rejouer\", centreX, centreY - 120);\n      ctx.fillText(\"Appuyer sur la touche Espace pour rejouer\", centreX, centreY - 120);\n      ctx.restore();\n  }\n  static drawScore(ctx, centreX, centreY, score){\n      ctx.save();\n      ctx.font = \"bold 200px sans-serif\";\n      ctx.fillStyle = \"gray\";\n      ctx.textAlign = \"center\";\n      ctx.textBaseline = \"middle\";\n      ctx.fillText(score.toString(), centreX, centreY);\n      ctx.restore();\n  }\n  static drawSnake(ctx, blockSize, snake){\n    ctx.save();\n    ctx.fillStyle=\"#ff0000\";\n    for (let block of snake.body){\n        this.drawBlock(ctx,block, blockSize);\n    }\n    ctx.restore();\n  }\n  static drawApple(ctx, blockSize, apple) {\n    const radius = blockSize/2;\n    const x = apple.position[0]*blockSize + radius;\n    const y = apple.position[1]*blockSize + radius;\n    ctx.save();\n    ctx.fillStyle = \"#33cc33\";\n    ctx.beginPath();\n    ctx.arc(x, y, radius, 0, Math.PI*2, true);\n    ctx.fill();\n    ctx.restore();\n  }\n  static drawBlock(ctx, position, blockSize){\n      const [x,y] = position;\n      ctx.fillRect(x*blockSize,y*blockSize,blockSize,blockSize);\n  }\n}\n\n\n//# sourceURL=webpack://jeu-serpent/./src/drawing.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\n/* harmony import */ var _apple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apple.js */ \"./src/apple.js\");\n/* harmony import */ var _drawing_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawing.js */ \"./src/drawing.js\");\n\n\n\n\nclass Game{\n  constructor(canvasWidth = 900, canvasHeight = 600){\n    this.canvasWidth = canvasWidth;\n    this.canvasHeight = canvasHeight;\n    this.blockSize = 30;\n    this.canvas = document.createElement('canvas');\n    this.ctx = this.canvas.getContext('2d');\n    this.widthInBlocks = this.canvasWidth/this.blockSize;\n    this.heightInBlocks = this.canvasHeight/this.blockSize;\n    this.centreX = this.canvasWidth / 2;\n    this.centreY = this.canvasHeight / 2;\n    this.delay = 100;\n    this.snakee;\n    this.applee;\n    this.score;\n    this.timeOut;\n  }\n  init(){\n      this.canvas.width = this.canvasWidth;\n      this.canvas.height = this.canvasHeight;\n      this.canvas.style.border = \"30px solid gray\";\n      this.canvas.style.margin = \"50px auto\";\n      this.canvas.style.display = \"block\";\n      this.canvas.style.backgroundColor = \"#ddd\";\n      document.body.appendChild(this.canvas);\n      this.launch();\n  }\n\n  launch(){\n      this.snakee = new _snake_js__WEBPACK_IMPORTED_MODULE_0__.default(\"right\", [6,4],[5,4],[4,4],[3,4],[2,4]);\n      this.applee = new _apple_js__WEBPACK_IMPORTED_MODULE_1__.default();\n      this.score = 0;\n      clearTimeout(this.timeOut);\n      this.delay = 100;\n      this.refreshCanvas();\n  }\n\n  refreshCanvas(){\n      this.snakee.advance();\n      if (this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)){\n          _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.gameOver(this.ctx, this.centreX, this.centreY);\n      } else {\n          if (this.snakee.isEatingApple(this.applee)){\n              this.score++;\n              this.snakee.ateApple = true;\n\n              do {\n                  this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);\n              } while(this.applee.isOnSnake(this.snakee));\n\n              if(this.score % 10 == 0){\n                  this.speedUp();\n              }\n          }\n          this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);\n          _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.drawScore(this.ctx, this.centreX, this.centreY, this.score);\n          _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.drawSnake(this.ctx, this.blockSize, this.snakee);\n          _drawing_js__WEBPACK_IMPORTED_MODULE_2__.default.drawApple(this.ctx, this.blockSize, this.applee);\n          this.timeOut = setTimeout(this.refreshCanvas.bind(this),this.delay);\n       }\n  }\n\n  speedUp(){\n      this.delay /= 2;\n  }\n}\n\n\n//# sourceURL=webpack://jeu-serpent/./src/game.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\r\n\r\n\r\nwindow.onload = () => {\r\n\r\n    let myGame = new _game_js__WEBPACK_IMPORTED_MODULE_0__.default();\r\n    myGame.init();\r\n\r\n    document.onkeydown = (e) => {\r\n        const key = e.keyCode;\r\n        let newDirection;\r\n        switch(key){\r\n            case 37:\r\n                newDirection = \"left\";\r\n                break;\r\n            case 38:\r\n                newDirection = \"up\";\r\n                break;\r\n            case 39:\r\n                newDirection = \"right\";\r\n                break;\r\n            case 40:\r\n                newDirection = \"down\";\r\n                break;\r\n            case 32:\r\n                myGame.launch();\r\n                myGame2.launch();\r\n                return;\r\n            default:\r\n                return;\r\n        }\r\n        myGame.snakee.setDirection(newDirection);\r\n    };\r\n\r\n}\r\n\n\n//# sourceURL=webpack://jeu-serpent/./src/script.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Snake\n/* harmony export */ });\nclass Snake {\n\n    constructor(direction, ...body) {\n        this.body = body;\n        this.direction = direction;\n        this.ateApple = false;\n    }\n\n    advance() {\n        const nextPosition = this.body[0].slice();\n        switch(this.direction){\n            case \"left\":\n                nextPosition[0] -= 1;\n                break;\n            case \"right\":\n                nextPosition[0] += 1;\n                break;\n            case \"down\":\n                nextPosition[1] += 1;\n                break;\n            case \"up\":\n                nextPosition[1] -= 1;\n                break;\n            default:\n                throw(\"invalid direction\");\n        }\n        this.body.unshift(nextPosition);\n        if (!this.ateApple)\n            this.body.pop();\n        else\n            this.ateApple = false;\n    }\n\n    setDirection(newDirection) {\n        let allowedDirections;\n        switch(this.direction){\n            case \"left\":\n            case \"right\":\n                allowedDirections=[\"up\",\"down\"];\n                break;\n            case \"down\":\n            case \"up\":\n                allowedDirections=[\"left\",\"right\"];\n                break;\n           default:\n                throw(\"invalid direction\");\n        }\n        if (allowedDirections.includes(newDirection)){\n            this.direction = newDirection;\n        }\n    }\n\n    checkCollision(widthInBlocks, heightInBlocks) {\n        let wallCollision = false;\n        let snakeCollision = false;\n        const [head, ...rest]= this.body;\n        const[snakeX, snakeY] = head;\n        const minX = 0;\n        const minY = 0;\n        const maxX = widthInBlocks - 1;\n        const maxY = heightInBlocks - 1;\n        const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;\n        const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;\n\n        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)\n            wallCollision = true;\n\n        for (let block of rest){\n            if (snakeX === block[0] && snakeY === block[1])\n                snakeCollision = true;\n        }\n\n        return wallCollision || snakeCollision;\n    }\n\n    isEatingApple(appleToEat) {\n        const head = this.body[0];\n        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])\n            return true;\n        else\n            return false;\n    }\n\n}\n\n\n//# sourceURL=webpack://jeu-serpent/./src/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
