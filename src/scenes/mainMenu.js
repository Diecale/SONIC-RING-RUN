import kPlay from "../kaplayCtx";
import makeSonic from "../entities/sonic";

export default function mainMenu() {
  if (!kPlay.getData("best-score")) kPlay.setData("best-score", 0);
  kPlay.onButtonPress("jump", () => {
    kPlay.go("game");
  });

  const bgPieceWidth = 1920;
  const bgPieces = [
    kPlay.add([
      kPlay.sprite("chemical-bg"),
      kPlay.pos(0, 0),
      kPlay.scale(2),
      kPlay.opacity(0.8),
    ]),
    kPlay.add([
      kPlay.sprite("chemical-bg"),
      kPlay.pos(bgPieceWidth, 0),
      kPlay.scale(2),
      kPlay.opacity(0.8),
    ]),
  ];

  const platformWidth = 1280;
  const platforms = [
    kPlay.add([kPlay.sprite("platforms"), kPlay.pos(0, 450), kPlay.scale(4)]),
    kPlay.add([
      kPlay.sprite("platforms"),
      kPlay.pos(platformWidth * 4, 450),
      kPlay.scale(4),
    ]),
  ];

  makeSonic(kPlay.vec2(200, 745));

  kPlay.add([
    kPlay.text("SONIC RING RUNG", { font: "mania", size: 96 }),
    kPlay.pos(kPlay.center().x, 200),
    kPlay.anchor("center"),
  ]);

  kPlay.add([
    kPlay.text("Press Space/Click/Touch to play", {
      font: "mania",
      size: 42,
    }),
    kPlay.pos(kPlay.center().x, 300),
    kPlay.anchor("center"),
  ]);

  kPlay.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
      platforms.push(platforms.shift());
    }
    platforms[0].move(-4000, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
  });
}
