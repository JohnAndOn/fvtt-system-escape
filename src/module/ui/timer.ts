
export default class EscapeTimer extends SidebarTab {
    maxTime: number;
    currentTime: number = 0;
    timesUp: number;
    timer: number = 0;

    constructor(options={}) {
        super(options);
        let t = game.settings.get("escape", "startingTime") * 60 * 1000;
        this.maxTime = t;
        this.currentTime = t;
        this.timesUp = Date.now() + this.currentTime;
    }

    /** @override */
    activateListeners(html: any) {
        console.log(html);
        document.getElementById("timer-reset")?.addEventListener("click", function() {
            // let timer = (ui as any)["timer"];
            // let reset = game.settings.get("escape", "startingTime") * 60 * 1000;
            // game.settings.set("escape", "currentTime", reset);
            // timer.timesUp = Date.now() + reset;
        });

        this._contextMenu(html);
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
        return {
            user: game.user,
            time: this.parseTime()
        }
    }

    setTime(t: number): void {
        this.currentTime = t;

        let time = this.parseTime();

        this.element.find("#timer-sec")[0].innerHTML = time["sec"];
        this.element.find("#timer-min")[0].innerHTML = time["min"];
        this.element.find("#timer-hour")[0].innerHTML = time["hour"];
    }

    parseTime(): { "hour": string, "min": string, "sec": string } {
        let time = { "hour": "0", "min": "00", "sec": "00" };

        function zeroPad(n: number): string {
            return ('00'+n).slice(-2);
        }

        let curr = this.currentTime;
        if (curr < 0) {
            curr *= -1;
            this.element[0].classList.add("negative");
        }

        curr = Math.round(curr / 1000);
        time["sec"] = zeroPad(curr % 60);
        curr = Math.floor(curr / 60);
        time["min"] = zeroPad(curr % 60);
        curr = Math.floor(curr / 60);
        time["hour"] = curr.toString();

        return time;
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
        //let timer = document.getElementById("timer");
        const timerOptions = this._getTimerContextOptions();
        if (html) new ContextMenu(html as any, "#time-remaining", timerOptions);
    }

    _getTimerContextOptions() {
        return [
            {
                name: "TIMER.Reset",
                icon: '<i class="fas fa-history"></i>',
                condition: game.user?.isGM,
                callback: (li: any) => {
                    console.log("Reset button clicked!");
                    let reset = game.settings.get("escape", "startingTime") * 60 * 1000;
                    game.settings.set("escape", "currentTime", reset);
                    (ui as any)["timer"].timesUp = Date.now() + reset;
                }
            },
            {
                name: "TIMER.Adjust",
                icon: '<i class="fas fa-calculator"></i>',
                condition: game.user?.isGM,
                callback: (li: any) => {
                    console.log("Adjustment button clicked!");
                }
            }
        ];
    }
  }