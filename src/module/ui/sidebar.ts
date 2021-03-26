export default class EscapeSidebar extends Sidebar {
	static get defaultOptions() {
        console.log('escape | Getting default sidebar options');

        return mergeObject(super.defaultOptions as any, {
            template: "systems/escape/templates/sidebar/sidebar.html",
      });
    }

  /**
   * Expand the Sidebar container from a collapsed state.
   * Take no action if the sidebar is already expanded.
   */
  /** @override */
  expand() {
    if ( !this._collapsed ) return;
    const sidebar = this.element;
    const tab = sidebar.find(".sidebar-tab.active");
    const icon = sidebar.find("#sidebar-tabs a.collapse i");

    // Animate the sidebar expansion
    tab.hide();
    // sidebar.animate({width: this.options.width, height: this.position.height}, 150, () => {
    sidebar.animate({}, 150, () => {
      // sidebar.css({width: "", height: ""});
      icon.removeClass("fa-caret-left").addClass("fa-caret-right");
      tab.fadeIn(250, () => tab.css("display", ""));
      this._collapsed = false;
      sidebar.removeClass("collapsed");
      Hooks.callAll("sidebarCollapse", this, this._collapsed);
    })
  }

	/* -------------------------------------------- */

  /**
   * Collapse the sidebar to a minimized state.
   * Take no action if the sidebar is already collapsed.
   */
  /** @override */
collapse() {
    if ( this._collapsed ) return;
    const sidebar = this.element;
    const tab = sidebar.find(".sidebar-tab.active");
    const icon = sidebar.find("#sidebar-tabs a.collapse i");

    // Animate the sidebar collapse
    tab.fadeOut(250, () => {
//      sidebar.animate({width: 30, height: 370}, 150, () => {
      sidebar.animate({}, 150, () => {
        icon.removeClass("fa-caret-right").addClass("fa-caret-left");
        this._collapsed = true;
        sidebar.addClass("collapsed");
        tab.css("display", "");
        Hooks.callAll("sidebarCollapse", this, this._collapsed);
      })
    })
  }

}