/**
 * @testSuite User Login Test
 * @description This test suite validates the login functionality of a web application by testing:
 * - Login with an invalid phone number
 * - Login with an invalid password
 * - Successful login with valid credentials
 */
describe('User login Test', () => {

  // Base URL of the application under test (UAT environment)
  let baseUrl = "https://dmsfrontenduat.z6.web.core.windows.net/";

  // Valid phone number used for login
  let vPhone = "07035528282";

  // Valid password matching the valid phone number
  let vPassword = "07035528282";

  // Invalid phone number (simulates user error)
  let ivPhone = "0700000000";

  // Invalid password (simulates user error)
  let ivPassword = "password";

  /**
   * @testCase Invalid Phone Number Login
   * @objective Ensure login fails when an incorrect phone number is provided
   * @expectedResult User should remain on the login page and not be redirected
   */
  it('Confirm user cannot login using invalid phone number', () => {
    // Visit the login page
    cy.visit(baseUrl);

    // Enter an invalid phone number
    cy.get('#username').type(ivPhone);

    // Enter a valid password
    cy.get('#password').type(vPassword);

    // Attempt to log in
    cy.get('.btn').click();

    // Assert that the URL has not changed (still on login page)
    cy.url().should('eq', baseUrl);

    // Take a screenshot for visual confirmation/debugging
    cy.screenshot('login-page(invalid phone)');
  });

  /**
   * @testCase Invalid Password Login
   * @objective Ensure login fails when an incorrect password is provided
   * @expectedResult User should remain on the login page and not be redirected
   */
  it('Confirm user cannot login using invalid password', () => {
    // Visit the login page
    cy.visit(baseUrl);

    // Enter a valid phone number
    cy.get('#username').type(vPhone);

    // Enter an invalid password
    cy.get('#password').type(ivPassword);

    // Attempt to log in
    cy.get('.btn').click();

    // Assert that the URL has not changed (still on login page)
    cy.url().should('eq', baseUrl);

    // Take a screenshot for visual confirmation/debugging
    cy.screenshot('login-page(invalid password)');
  });

  /**
   * @testCase Valid Login
   * @objective Verify that user can successfully log in with correct credentials
   * @expectedResult User should be redirected to the brand selection page
   */
  it('Confirm user can login using valid data', () => {
    // Visit the login page
    cy.visit(baseUrl);

    // Enter a valid phone number
    cy.get('#username').type(vPhone);

    // Enter the corresponding valid password
    cy.get('#password').type(vPassword);

    // Attempt to log in
    cy.get('.btn').click();

    // Assert that the user is redirected to the expected authenticated page
    cy.url().should('eq', baseUrl + 'buy/brand');

    // Take a screenshot for visual confirmation/debugging
    cy.screenshot('login-page(valid login)');
  });

});
