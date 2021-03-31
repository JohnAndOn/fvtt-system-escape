/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your system.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';

import EscapeTimer from "./ui/timer";
import EscapeSidebar from "./ui/sidebar";

// Initialize system
Hooks.once('init', async () => {
  console.log('escape | Initializing escape');

  // Assign custom classes and constants here
  Object.assign(CONFIG.ui, {
    sidebar: EscapeSidebar,
    timer: EscapeTimer
  });

  // Register custom system settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

// Setup system
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the system is ready
});

// Add any additional hooks if necessary
Hooks.on("pauseGame", async (paused) => {
  console.log("Pause state changed");
  if (paused) {
    (ui as any).timer.stopTimer();
  } else {
    (ui as any).timer.startTimer();
  }
});