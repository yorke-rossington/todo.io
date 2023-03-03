import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:5173",
        specPattern: "**/*.spec.cy.ts",
        supportFile: "e2e/cypress/support/e2e.ts",
        screenshotsFolder: "e2e/cypress/screenshots",
        videosFolder: "e2e/cypress/videos",
        fixturesFolder: "e2e/cypress/fixtures",
        experimentalRunAllSpecs: true
    }
});
