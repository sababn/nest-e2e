const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.qa.nesto.ca",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
