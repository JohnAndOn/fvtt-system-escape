export default class EscapeSidebar extends Sidebar {
	static get defaultOptions() {
        console.log('escape | Getting default sidebar options');

        return mergeObject(super.defaultOptions as any, {
            template: "systems/escape/templates/sidebar/sidebar.html",
      });
    }
}