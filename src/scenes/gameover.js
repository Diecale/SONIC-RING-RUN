import kPlay from "../kaplayCtx";

export default function gameover() {
  kPlay.scene("gameover", () => {
    kPlay.add([
      kPlay.text("GAME OVER", { size: 48 }),
      kPlay.pos(kPlay.center),
      kPlay.anchor("center"),
      kPlay.color(255, 0, 0), //Red text
    ]);
  });

  // Press R to restart
  kPlay.onKeyPress("r", () => {
    kPlay.go("game"); // Swtich back to the game scene
  });

  // Display score
  kPlay.add([
    kPlay.text(`Score: ${score}`, { size: 32 }),
    kPlay.pos(kPlay.center().x, kPlay.center().y + 60),
    kPlay.anchor("center"),
  ]);
}
