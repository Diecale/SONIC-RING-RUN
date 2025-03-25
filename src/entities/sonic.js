import kPlay from "../kaplayCtx";

export default function makeSonic(pos) {
  const sonic = kPlay.add([
    kPlay.sprite("sonic", { anim: "run" }),
    kPlay.scale(4),
    kPlay.area(),
    kPlay.anchor("center"),
    kPlay.pos(pos),
    kPlay.body({ jumpForce: 1700 }),
    {
      ringCollectUI: null,
      setControls() {
        kPlay.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            kPlay.play("jump", { volume: 0.5 });
          }
        });
      },

      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);

  sonic.ringCollectUI = sonic.add([
    kPlay.text("", { font: "mania", size: 24 }),
    kPlay.color(255, 255, 0),
    kPlay.pos(30, -10),
    kPlay.anchor("center"),
    kPlay.scale(1),
  ]);

  return sonic;
}
