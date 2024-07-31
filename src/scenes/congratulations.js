import ganaste from "../../public/images/ganaste.png";
import { RestarButton } from "../components/restartButton";
import ganastesample from "../../public/music/Ganaste.mp3";

export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: "congratulations" });
    this.restartButton = new RestarButton(this);
  }

  preload() {
    this.load.image("ganaste", ganaste);
    this.load.audio("ganastesample", ganastesample);
    this.restartButton.preload();
  }

  create() {
    this.add.image(410, 250, "background");
    this.sample = this.sound.add("ganastesample");
    this.ganasteImage = this.add.image(400, 90, "ganaste");
    this.sample.play();
    this.restartButton.create();
  }
}
