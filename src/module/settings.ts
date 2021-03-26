import EscapeSidebar from "./ui/sidebar";

export function registerSettings(): void {
  // Register any custom system settings here
  Object.assign(CONFIG.ui, {
    sidebar: EscapeSidebar
  });
}
