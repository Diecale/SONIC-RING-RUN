import kPlay from "../kaplayCtx";

export function makeRing(pos) {
  return kPlay.add([
    kPlay.sprite("ring", { anim: "spin" }),
    kPlay.area(),
    kPlay.scale(4),
    kPlay.anchor("center"),
    kPlay.pos(pos),
    kPlay.offscreen(),
    "ring",
  ]);
}
