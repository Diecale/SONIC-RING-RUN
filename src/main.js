import kPlay from "./kaplayCtx";
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game";
import gameover from "./scenes/gameover";

kPlay.loadSprite("chemical-bg", "graphics/chemical-bg.png");
kPlay.loadSprite("platforms", "graphics/platforms.png");
kPlay.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: true, speed: 100 },
  },
});

kPlay.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});

kPlay.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});

kPlay.loadFont("mania", "fonts/mania.ttf");

kPlay.loadSound("city", "sounds/city.mp3");
kPlay.loadSound("destroy", "sounds/Destroy.wav");
kPlay.loadSound("hurt", "sounds/Hurt.wav");
kPlay.loadSound("hyper-ring", "sounds/HyperRing.wav");
kPlay.loadSound("jump", "sounds/Jump.wav");
kPlay.loadSound("ring", "sounds/Ring.wav");

kPlay.scene("main-menu", mainMenu);

kPlay.scene("game", game);

kPlay.scene("gameover", gameover);

kPlay.go("main-menu");
