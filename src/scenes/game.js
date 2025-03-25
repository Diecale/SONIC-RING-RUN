import kPlay from "../kaplayCtx";
import makeSonic from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";

export default function game() {
  kPlay.setGravity(3100);
  const citySfx = kPlay.play("city", { volume: 0.2, loop: true });

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
      kPlay.pos(platformWidth, 450),
      kPlay.scale(4),
    ]),
  ];

  let score = 0;
  let scoreMultiplier = 0;

  const scoreText = kPlay.add([
    kPlay.text(`SCORE: 0`, { font: "mania", size: 72 }),
    kPlay.pos(20, 20),
  ]);

  const sonic = makeSonic(kPlay.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      kPlay.play("destroy", { volume: 0.5 });
      kPlay.play("hyper-ring", { volume: 0.5 });
      kPlay.destroy(enemy);
      sonic.play("jump");
      sonic.jump();

      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `SCORE: ${score}`;

      sonic.ringCollectUI.text =
        scoreMultiplier === 1 ? "+10" : `x${scoreMultiplier}`;

      sonic.ringCollectUI.scale.x = 1.5;
      sonic.ringCollectUI.scale.y = 1.5;

      let elapsed = 0;
      const anim = kPlay.onUpdate(() => {
        elapsed += kPlay.dt();
        const progress = Math.min(elapsed / 0.5, 1);

        const bounceProgress = kPlay.easings.easeOutElastic(progress);
        sonic.ringCollectUI.scale.x = 1.5 - 0.5 * bounceProgress;
        sonic.ringCollectUI.scale.y = 1.5 - 0.5 * bounceProgress;

        if (progress >= 1) anim.cancel();
      });

      kPlay.wait(1.5, () => {
        sonic.ringCollectUI.text = "";
        sonic.ringCollectUI.scale.x = 1;
        sonic.ringCollectUI.scale.y = 1;
      });
      return;
    }
    kPlay.play("hurt", { volume: 0.5 });

    kPlay.setData("current-score", score);

    kPlay.go("gameover", citySfx);
  });

  let gameSpeed = 300;
  kPlay.loop(1, () => {
    gameSpeed += 50;
  });

  const spawnMotoBug = () => {
    const motobug = makeMotobug(kPlay.vec2(1950, 773));
    motobug.onUpdate(() => {
      if (gameSpeed < 3000) {
        motobug.move(-(gameSpeed + 300), 0);
        return;
      }

      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) kPlay.destroy(motobug);
    });

    const waitTime = kPlay.rand(0.5, 2.5);
    kPlay.wait(waitTime, spawnMotoBug);
  };

  spawnMotoBug();

  const spawnRing = () => {
    const ring = makeRing(kPlay.vec2(1950, 745));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) kPlay.destroy(ring);
    });
    const waitTime = kPlay.rand(0.5, 3);
    kPlay.wait(waitTime, spawnRing);
  };

  spawnRing();

  sonic.onCollide("ring", (ring) => {
    kPlay.play("ring", { volume: 0.5 });
    kPlay.destroy(ring);
    score++;
    scoreText.text = `SCORE: ${score}`;
    sonic.ringCollectUI.text = "+1";

    sonic.ringCollectUI.scale.x = 1.5;
    sonic.ringCollectUI.scale.y = 1.5;

    let elapsed = 0;
    const anim = kPlay.onUpdate(() => {
      elapsed += kPlay.dt();
      const progress = Math.min(elapsed / 0.5, 1);

      const bounceProgress = kPlay.easings.easeOutElastic(progress);
      sonic.ringCollectUI.scale.x = 1.5 - 0.5 * bounceProgress;
      sonic.ringCollectUI.scale.y = 1.5 - 0.5 * bounceProgress;

      if (progress >= 1) anim.cancel();
    });

    kPlay.wait(1.5, () => {
      sonic.ringCollectUI.text = "";
      sonic.ringCollectUI.scale.x = 1;
      sonic.ringCollectUI.scale.y = 1;
    });

    //Just to see if works
    kPlay.debug.log("Ring collected");
  });

  kPlay.add([
    kPlay.rect(1920, 300),
    kPlay.opacity(0),
    kPlay.pos(0, 832),
    kPlay.area(),
    kPlay.body({ isStatic: true }),
  ]);

  kPlay.onUpdate(() => {
    if (sonic.isGrounded()) {
      scoreMultiplier = 0;
    }

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
    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);

    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 20 - 50);
    bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 20 - 50);
  });
}
