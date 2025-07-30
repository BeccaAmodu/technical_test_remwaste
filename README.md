# REM Waste Technical Test

This repository contains automated tests for both UI (Cypress) and API (Postman) layers of the application.

## Table of Contents
- [Test Structure](#test-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Data](#test-data)
- [Reporting](#reporting)

## Test Structure

### Cypress UI Tests
| Test File          | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `login.cy.js`      | Tests login functionality with valid/invalid credentials                    |
| `customer.cy.js`   | Tests full customer CRUD operations with randomized test data               |


## Prerequisites
- Node.js v16+
- Cypress v10+


## Installation
```bash
git clone https://github.com/BeccaAmodu/technical_test_remwaste.git
cd technical_test_remwaste
npm install
```

## Running Tests
### CYPRESS Tests
- npx cypress run --spec "cypress/e2e/login.cy.js" # To run specific test
- npx cypress open                                 # To run all test

## Test Data 
- url: https://dmsfrontenduat.z6.web.core.windows.net/
- username: 07035528282
- password: 07035528282
 
## Reporting

### Cypress:
- Screenshots saved in /cypress/screenshots
