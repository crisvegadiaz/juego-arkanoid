export class Scoreboard {
  constructor(scene) {
    this.relatedScene = scene;
    this.score = 0;
  }

  create() {
    this.scoreText = this.relatedScene.add.text(
      16,
      16,
      `PUNTOS: ${this.score}`,
      {
        fontSize: "20px",
        fill: "#181920",
        fontFamily: "verdana,arial,sans-serif",
      }
    );
  }

  incrementPoint(points) {
    this.score += points;
    this.scoreText.setText(`PUNTOS: ${this.score}`);
  }
}
