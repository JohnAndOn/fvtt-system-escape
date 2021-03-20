import { ESCAPE } from '../config';

export default class EscapeActorSheet extends ActorSheet {
    private _filters: Record<string, any>;

    constructor(actor: Actor, options: BaseEntitySheet.Options) {
        super(actor, options);

        /**
         * Track the set of item filters which are applied
         * @type {Set}
         */
         this._filters = {
            inventory: new Set(),
            spellbook: new Set(),
            features: new Set(),
            effects: new Set()
        };  

    }

    /** @override */
    static get defaultOptions() {
        return super.defaultOptions;
    }

    /** @override */
    get template() {
        if ( (game.user && !game.user.isGM) && this.actor.limited ) return "systems/escape/templates/actors/actor-sheet-limited.html";
        return `systems/escape/templates/actors/actor-sheet.html`;
    }

    /** @override */
    getData() {

        // Basic data
        let isOwner = this.entity.owner;
        const data: any = {
            owner: isOwner,
            limited: this.entity.limited,
            options: this.options,
            editable: this.isEditable,
            cssClass: isOwner ? "editable" : "locked",
            config: CONFIG.ESCAPE,
          };

          // Actor and Items
          data.actor = duplicate(this.actor.data);
          data.items = this.actor.items.map(i => {
              let o: Record<string, any> = i;
              o.data.labels = o.labels;
              return o.data;
          });
          data.items.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
          data.data = data.actor.data;
          data.labels = (this.actor as Record<string, any>).labels || {};
          data.filters = (this as Record<string, any>)._filters;

          // Return data to the sheet
          return data;
    }
}