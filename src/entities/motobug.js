import kPlay from "../kaplayCtx";

export function makeMotobug(pos) {
  return kPlay.add([
    kPlay.sprite("motobug", { anim: "run" }),
    kPlay.area({ shape: new kPlay.Rect(kPlay.vec2(-5, 0), 32, 32) }),
    kPlay.scale(4),
    kPlay.anchor("center"),
    kPlay.pos(pos),
    kPlay.offscreen(),
    "enemy",
  ]);
}
