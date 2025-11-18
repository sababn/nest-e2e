
Cypress.Commands.add('enterFirstName', (firstname) => {
    cy.get('[data-testid="first-name-input"]').clear().type(firstname)
})

Cypress.Commands.add('enterLastName', (lastName) => {
    cy.get('[data-testid="last-name-input"]').clear().type(lastName)
})

Cypress.Commands.add('enterPhoneNumber', (phoneNumber) => {
    cy.get('[data-testid="phoneInput"]').clear().type(phoneNumber)
})

Cypress.Commands.add('selectProvince', (province) => {
    cy.get('[data-testid="region-select"]').select(province)
})

Cypress.Commands.add('enterEmail', (email) => {
    cy.get('[data-testid="email-input"]').clear().type(email)
})

Cypress.Commands.add('enterPassword', (password) => {
    cy.get('[data-testid="password-input"]').clear().type(password, { log: false })
})

Cypress.Commands.add('confirmPassword', (confirmPassword) => {
    cy.get('[data-testid="passwordConfirmation-input"]').clear().type(confirmPassword, { log: false })
})

Cypress.Commands.add('createAccountButton', () => {
    cy.get('[data-testid="submit-button"]').click()
})

Cypress.Commands.add('fillSignupForm', (user) => {
    if (user.firstName) cy.enterFirstName(user.firstName);
    if (user.lastName) cy.enterLastName(user.lastName);
    if (user.phoneNumber) cy.enterPhoneNumber(user.phoneNumber);
    if (user.province) cy.selectProvince(user.province);
    if (user.email) cy.enterEmail(user.email);
    if (user.password) cy.enterPassword(user.password);
    if (user.confirmPassword) cy.confirmPassword(user.confirmPassword);
});

Cypress.Commands.add('login', (user) => {
    cy.get('[data-testid="header-login-button"]').click();
    cy.origin('https://auth.nesto.ca', { args: { user } }, ({ user }) => {
        cy.get('input[name="email"]').clear().type(user.email);
        cy.get('input[name="password"]').clear().type(user.password, { log: false });
        cy.get('button[type="submit"]').click();
    })
});