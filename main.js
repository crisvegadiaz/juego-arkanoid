import "./style.css";
import Phaser from "phaser";
import { Game } from "./src/scenes/game.js";
import { GameOver } from "./src/scenes/gameover.js";
import { Congratulations } from "./src/scenes/congratulations.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: "game",
  backgroundColor: "#049cd8",
  scene: [Game, GameOver, Congratulations],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

new Phaser.Game(config);
