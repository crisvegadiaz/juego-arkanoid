import button from "../../public/images/button.png";

export class RestarButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet("button", button, {
      frameWidth: 162,
      frameHeight: 65,
    });
  }

  create() {
    this.startButton = this.relatedScene.add
      .sprite(400, 230, "button")
      .setInteractive();

    this.startButton.on("pointerover", () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on("pointerout", () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on("pointerdown", () => {
      this.relatedScene.sample.stop();
      this.relatedScene.scene.start("game");
    });
  }
}
