

export function registerSettings(): void {
  // Register any custom system settings here
  game.settings.register("escape", "startingTime", {
    name: "SETTINGS.EscapeTime.start",
    hint: "SETTINGS.EscapeTime.hint",
    scope: "world",
    type: Number,
    default: 60,
    config: true,
    onChange: s => {
      let t = (s as number) * 60 * 1000;
      const timer = (ui as any)["timer"];
      if (timer.currentTime == timer.maxTime) {
        game.settings.set("escape", "currentTime", t)
      }
      timer.maxTime = t;
    }
  });

  game.settings.register("escape", "currentTime", {
    scope: "world",
    type: Number,
    default: game.settings.get("escape", "startingTime") * 60 * 1000,
    config: false,
    onChange: s => {
      const timer = (ui as any)["timer"];
      timer.setTime((s as number));
    }
  });

}
