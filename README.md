# Nesto E2E Test Suite

This project contains the end-to-end (E2E) test suite for the Nesto application, built with Cypress. It covers critical user flows such as signup and login, with support for both English and French languages.


### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project's root directory in your terminal.
3.  Install the required npm packages by running:

    ```bash
    npm install
    ```

## Running the Tests

This test suite can be run in headless mode directly from the command line or in interactive mode using the Cypress Test Runner.

### Headless Mode (Command Line)

The following commands will run the tests headlessly, which is ideal for CI/CD pipelines or quick checks.

-   **To run the English test suite:**
    ```bash
    npm run e2e-eng
    ```

-   **To run the French test suite:**
    ```bash
    npm run e2e-fr
    ```

### Interactive Mode (Cypress Test Runner)

To open the Cypress Test Runner for a visual and interactive testing experience, use the `cypress open` command. You can specify the language using the `--env` flag.

-   **To open in English:**
    ```bash
    npx cypress open --env language=en
    ```

-   **To open in French:**
    ```bash
    npx cypress open --env language=fr
    ```
