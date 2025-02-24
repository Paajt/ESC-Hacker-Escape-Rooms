const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://paajt.github.io/ESC-Hacker-Escape-Rooms/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
