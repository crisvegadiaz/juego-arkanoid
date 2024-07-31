import ball from "../../public/images/ball.png";
import bloque1 from "../../public/images/bloque1.png";
import bloque2 from "../../public/images/bloque2.png";
import bloque3 from "../../public/images/bloque3.png";
import bloque4 from "../../public/images/bloque4.png";
import platform from "../../public/images/platform.png";
import { Scoreboard } from "../components/Scoreboard.js";
import background from "../../public/images/background.jpg";
import melodiessample from "../../public/music/Melodies.mp3";
import platformsample from "../../public/music/golpe-seco.mp3";
import brickimpactsample from "../../public/music/golpe-corto-suave.mp3";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.n = true;
  }

  init() {
    this.scoreboard = new Scoreboard(this);
  }

  preload() {
    const assets = {
      images: [
        { name: "ball", path: ball },
        { name: "bloque1", path: bloque1 },
        { name: "bloque2", path: bloque2 },
        { name: "bloque3", path: bloque3 },
        { name: "bloque4", path: bloque4 },
        { name: "background", path: background },
      ],
      audio: [
        {
          name: "brickimpactsample",
          path: brickimpactsample,
        },
        { name: "platformsample", path: platformsample },
        { name: "melodiessample", path: melodiessample },
      ],
    };

    assets.images.forEach((image) => this.load.image(image.name, image.path));
    assets.audio.forEach((audio) => this.load.audio(audio.name, audio.path));
    this.load.spritesheet("platform", platform, {
      frameWidth: 128,
      frameHeight: 49,
    });
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(410, 250, "background");
    this.brickImpactSample = this.sound.add("brickimpactsample");
    this.platformSample = this.sound.add("platformsample");
    this.melodiesSample = this.sound.add("melodiessample");

    this.scoreboard.create();

    this.bricks = this.createGroup(
      ["bloque1", "bloque2", "bloque3", "bloque4"],
      10,
      10,
      4,
      60,
      50,
      100,
      50,
      1,
      0.4
    );

    this.platform = this.physics.add
      .image(400, 460, "platform")
      .setImmovable()
      .setCollideWorldBounds(true)
      .setScale(0.8);
    this.platform.body.allowGravity = false;
    this.platform.setFrame(1);

    this.ball = this.physics.add
      .image(400, 429, "ball")
      .setScale(0.7)
      .setData("glue", true)
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.physics.add.collider(this.ball, this.platform, this.platformImpact);
    this.physics.add.collider(this.ball, this.bricks, this.bricksImpact);

    this.melodiesSample.play({ loop: true });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createGroup(
    keys,
    frameQuantity,
    width,
    height,
    cellWidth,
    cellHeight,
    x,
    y,
    origin,
    scale
  ) {
    const group = this.physics.add.staticGroup({
      key: keys,
      frameQuantity,
      gridAlign: { width, height, cellWidth, cellHeight, x, y },
    });

    group.children.iterate((child) => {
      child.setOrigin(origin);
      child.setScale(scale);
      child.refreshBody();
    });

    return group;
  }

  platformImpact = (ball, platform) => {
    this.platformSample.play();
    const relativeImpact = ball.x - platform.x;

    if (Math.abs(relativeImpact) < 0.1) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      ball.setVelocityX(10 * relativeImpact);
    }
  };

  bricksImpact = (ball, brick) => {
    this.brickImpactSample.play();
    brick.disableBody(true, true);
    this.scoreboard.incrementPoint(10);
    if (this.bricks.countActive() === 0) {
      this.showCongratulations();
    }
  };

  update() {
    if (!this.cursors || !this.platform) return;
    const velocity = 700;

    if (this.cursors.left.isDown) {
      this.setPlatformVelocity(-velocity);
      this.platform.setFrame(0);
    } else if (this.cursors.right.isDown) {
      this.setPlatformVelocity(velocity);
      this.platform.setFrame(2);
    } else {
      this.setPlatformVelocity(0);
      this.platform.setFrame(1);
    }

    if (this.ball.y > 500) {
      console.log("fin");
      this.showGameOver();
    }

    if (this.n && this.cursors.up.isDown) {
      this.ball.setVelocity(-75, -300);
      this.ball.setData("glue", false);
      this.n = false;
    }
  }

  setPlatformVelocity(velocity) {
    this.platform.setVelocityX(velocity);
    if (this.ball.getData("glue")) {
      this.ball.setVelocityX(velocity);
    }
  }

  showGameOver() {
    this.melodiesSample.stop();
    this.scene.start("gameover");
    this.n = true;
  }

  showCongratulations() {
    this.melodiesSample.stop();
    this.scene.start("congratulations");
    this.n = true;
  }
}
