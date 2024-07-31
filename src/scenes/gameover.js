import gameover from "../../public/images/gameover.png";
import { RestarButton } from "../components/restartButton";
import gameoversample from "../../public/music/GameOver.mp3";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
    this.restartButton = new RestarButton(this);
  }

  preload() {
    this.load.image("gameover", gameover);
    this.load.audio("gameoversample", gameoversample);
    this.restartButton.preload();
  }

  create() {
    this.sample = this.sound.add("gameoversample");
    this.add.image(410, 250, "background");
    this.gameoverImage = this.add.image(400, 90, "gameover");
    this.sample.play();
    this.restartButton.create();
  }
}
