
export default class EscapeTimer extends SidebarTab {
    maxTime: number;
    currentTime: number;
    timesUp: number;
    timer: number = 0;

    constructor(options={}) {
        super(options);
        this.maxTime = game.settings.get("escape", "startingTime") * 60 * 1000;
        this.currentTime = game.settings.get("escape", "currentTime");
        this.timesUp = Date.now() + this.currentTime;
    }

    /** @override */
    activateListeners() {
        document.getElementById("timer-reset")?.addEventListener("click", function() {
            let timer = (ui as any)["timer"];
            let reset = game.settings.get("escape", "startingTime") * 60 * 1000;
            game.settings.set("escape", "currentTime", reset);
            timer.timesUp = Date.now() + reset;
        });
    }
  
    /** @override */
    static get defaultOptions(): any {
        return mergeObject(SidebarTab.defaultOptions as any, {
            id: "timer",
            template: "systems/escape/templates/sidebar/timer.html",
            title: game.i18n.localize("TIMER.Title")
        });
    }


    /** @override */
    getData(options: any): Record<string, any> {
        const time: Record<string, any> = {};

        function zeroPad(n: number): String {
            return ('00'+n).slice(-2);
        }

        let neg = false;
        let curr = this.currentTime;
        if (curr < 0) {
            curr *= -1;
            neg = true;
        }

        curr = Math.round(curr / 1000);
        time["sec"] = zeroPad(curr % 60);
        curr = Math.floor(curr / 60);
        time["min"] = zeroPad(curr % 60);
        curr = Math.floor(curr / 60);
        time["hour"] = curr;


        return {
            user: game.user,
            neg: neg,
            time: time
        }
    }

    setTime(time: number): void {
        this.currentTime = time;
        this.render(true, {});
    }

    startTimer(): void {
        this.timesUp = this.currentTime + Date.now();
        this.timer = setInterval(EscapeTimer.updateTimer, 1000, this);
    }

    stopTimer(): void {
        clearInterval(this.timer);
    }

    static updateTimer(timer: EscapeTimer): void {
        game.settings.set("escape", "currentTime", timer.timesUp - Date.now());
    }

    _contextMenu(html: JQuery) {
        const timerOptions = this._getTimerContextOptions();
    }

    _getTimerContextOptions() {
        return [
            {
                name: "TIMER.Reset",
                icon: '<i class="fas fa-history"></i>',
                condition: game.user?.isGM,
                callback: (li: any) => {
                    console.log("Reset button clicked!");
                    let reset = game.settings.get("escape", "startingTime");
                    game.settings.set("escape", "currentTime", reset * 60 * 1000);
                }
            }
        ];
    }
  }