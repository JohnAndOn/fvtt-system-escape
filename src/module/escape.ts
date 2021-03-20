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

import EscapeActor from './actor/actor';
import EscapeActorSheet from './actor/actorSheet';
import EscapeItem from './item/item';
import EscapeItemSheet from './item/itemSheet';

// Initialize system
Hooks.once('init', async () => {
  console.log('escape | Initializing escape');

  // Assign custom classes and constants here
  CONFIG.Actor.entityClass = EscapeActor;
  CONFIG.Item.entityClass = EscapeItem;

  // Register custom system settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  Actors.registerSheet("escape", EscapeActorSheet, {
    label: 'ESCAPE.ActorSheet',
    types: [],
    makeDefault: true
  });
  Items.registerSheet("escape", EscapeItemSheet, {
    label: 'ESCAPE.ItemSheet',
    types: [],
    makeDefault: true
  });
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
