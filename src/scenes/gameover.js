import kPlay from "../kaplayCtx";

export default function gameover(citySfx) {
  if (citySfx) citySfx.pause = true;

  let bestScore = kPlay.getData("best-score", 0);
  const currentScore = kPlay.getData("current-score", 0);

  const rankGrades = ["F", "E", "D", "C", "B", "A", "S"];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  let currentRank = "F";
  let bestRank = "F";

  for (let i = rankValues.length - 1; i >= 0; i--) {
    if (currentScore >= rankValues[i]) {
      currentRank = rankGrades[i];
      break;
    }
  }

  for (let i = rankValues.length - 1; i >= 0; i--) {
    if (bestScore >= rankValues[i]) {
      bestRank = rankGrades[i];
      break;
    }
  }

  // Update best score if current is higher
  if (currentScore > bestScore) {
    bestScore = currentScore;
    bestRank = currentRank;
    kPlay.setData("best-score", bestScore);
  }
  // Clear previous screen elements
  kPlay.destroyAll();

  const goldColor = kPlay.color(255, 215, 0);
  const darkGrayColor = kPlay.color(20, 20, 20);
  const redColor = kPlay.color(255, 0, 0);

  // Background overlay
  kPlay.add([
    kPlay.rect(kPlay.width(), kPlay.height()),
    kPlay.color(0, 0, 0, 0.7),
    kPlay.fixed(),
    kPlay.z(0),
  ]);

  // Game Over text

  kPlay.add([
    kPlay.text("GAME OVER", { font: "mania", size: 96 }),
    kPlay.anchor("center"),
    kPlay.pos(kPlay.center().x, kPlay.center().y - 300),
    kPlay.color(255, 0, 0),
  ]);

  // Score display
  kPlay.add([
    kPlay.text(`BEST SCORE : ${bestScore}`, {
      font: "mania",
      size: 64,
    }),
    kPlay.anchor("center"),
    kPlay.pos(kPlay.center().x - 400, kPlay.center().y - 200),
    kPlay.z(1),
  ]);

  kPlay.add([
    kPlay.text(`CURRENT SCORE : ${currentScore}`, {
      font: "mania",
      size: 64,
    }),
    kPlay.anchor("center"),
    kPlay.pos(kPlay.center().x + 400, kPlay.center().y - 200),
    kPlay.z(1),
  ]);

  // Rank Boxes
  const createRankBox = (xOffset, rank) => {
    const box = kPlay.add([
      kPlay.rect(400, 400, { radius: 20 }), // Larger radius for rounded corners
      darkGrayColor,
      kPlay.anchor("center"),
      kPlay.outline(6, goldColor), // Gold outline
      kPlay.pos(kPlay.center().x + xOffset, kPlay.center().y + 50),
    ]);

    box.add([
      kPlay.text(rank, { font: "mania", size: 200 }), // Bigger rank letter
      kPlay.anchor("center"),
      goldColor, // Gold text
    ]);

    return box;
  };

  createRankBox(-400, bestRank);
  createRankBox(400, currentRank);

  // Restart prompt (appears after delay)
  kPlay.wait(1, () => {
    const prompt = kPlay.add([
      kPlay.text("Press SPACE or CLICK to Play Again", {
        font: "mania",
        size: 48,
      }),
      kPlay.anchor("center"),
      kPlay.pos(kPlay.center().x, kPlay.center().y + 350),
    ]);
  });

  let elapsed = 0;
  const fadeIn = kPlay.onUpdate(() => {
    elapsed += kPlay.dt();
    const progress = Math.min(elapsed / 0.5, 1);
    prompt.opacity = progress;
    if (progress >= 1) fadeIn.cancel();
  });

  // Restart controls
  kPlay.onKeyPress("space", () => kPlay.go("game"));
  kPlay.onMousePress(() => kPlay.go("game"));
}
