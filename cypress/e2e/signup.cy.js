
describe('Signup Flow', () => {
  const language = Cypress.env('language') || 'en';
  let t;
  let users;
  let newUser;

  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.fixture('users.json').then((data) => {
       users = data;
    });
    cy.fixture(language).then((langData) => {
      t = langData;
    });

    const url = language === 'fr' ? '/fr/signup' : '/signup';
    cy.visit(url);
  });

  it('User is able to successfully sign up with valid credentials', () => {

   newUser = { ...users.validUser, email: `test-${Date.now()}@nesto.com` };
    cy.fillSignupForm(newUser);
    cy.createAccountButton();

    cy.url().should('include', '/getaquote');
    cy.get('.navbar_home__M0vge').should('be.visible');

  });

 
  it('User is able to successfully login', () => {

    cy.login(newUser);
    cy.get('[data-testid="my-portfolio-button"]').should('be.visible');
  });

  it('an error message is displayed when passwords do not match', () => {
    const user = { ...users.mismatchedPasswordUser };

    cy.fillSignupForm(user);
    cy.createAccountButton();
    cy.get('[data-testid="passwordConfirmation-error-message-typography"]').should('be.visible')
    .and('contain', t.errors.passwordMismatch);
  });


  it('An error message is displayed when the required fields when left empty', () => {
    
   cy.createAccountButton();

    cy.get('[data-testid="first-name-error-message-typography"]').should('be.visible');
    cy.get('[data-testid="last-name-error-message-typography"]').should('be.visible');
    cy.get('[data-testid="phone-error-message-typography"]').should('be.visible');
  });

  it('User is able to sign up and validate the API response', () => {
    const region = 'ON';
    const user = { ...users.validUser, email: `test-${Date.now()}@nesto.com` };
    cy.intercept('GET', '**/api/account').as('createAccount');

    cy.fillSignupForm(user);
    cy.createAccountButton();
    cy.url().should('include', '/getaquote');
     // API Validation 
      cy.wait('@createAccount').then((interception) => {
        const { response } = interception;
        
        expect(response.statusCode).to.eq(200);

        expect(response.body.firstName).to.eq(user.firstName);
        expect(response.body.lastName).to.eq(user.lastName);
        expect(response.body.email).to.eq(user.email);
        expect(response.body.phone).to.eq(`+1${user.phoneNumber}`);
        expect(response.body.region).to.eq(region);
        expect(response.body).to.have.property('id').and.to.not.be.null;
      })
  });

    it('Validate all form fields and labels are displayed correctly', () => {
    cy.get('[data-testid="typography"]').should('contain', t.signup.title);
    cy.get('[data-testid="first-name-input"]').should('have.attr', 'placeholder', t.labels.firstName);;
    cy.get('[data-testid="last-name-input"]').should('have.attr', 'placeholder', t.labels.lastName);
    cy.get('[data-testid="phoneInput"]').should('have.attr', 'placeholder', t.labels.phone);
    cy.get('[data-testid="region-select"]').should('contain', t.labels.province);
    cy.get('[data-testid="email-input"]').should('have.attr', 'placeholder',t.labels.email);
    cy.get('[data-testid="password-input"]').should('have.attr', 'placeholder', t.labels.password);
    cy.get('[data-testid="passwordConfirmation-input"]').should('have.attr', 'placeholder', t.labels.confirmPassword);
    cy.get('[data-testid="submit-button"]').should('contain', t.buttons.createAccount);
  });
});
