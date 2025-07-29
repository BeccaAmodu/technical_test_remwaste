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

### Postman API Tests
| Collection File                          | Description                                                                 |
|------------------------------------------|-----------------------------------------------------------------------------|
| `tech_test.postman_collection.json`      | Tests REST API endpoints for posts resource with positive/negative scenarios |

## Prerequisites
- Node.js v16+
- Cypress v10+
- Postman (for API tests)


## Installation
```bash
git clone <repository-url>
cd <project-directory>
npm install
```

## Running Tests
### CYPRESS Tests
- npx cypress run --spec "cypress/e2e/login.cy.js" # To run specific test
- npx cypress open                                 # To run all test

### POSTMAN Tests
- Run Postman on you PC
- Import `tech_test.postman_collection.json` collection
- run collection


## Test Data
### Cypress
- url: https://dmsfrontenduat.z6.web.core.windows.net/
- username: 07035528282
- password: 07035528282

### Postman
- url: https://dmsfrontenduat.z6.web.core.windows.net/
- username: 07035528282
- password: 07035528282

## Reporting

### Cypress:
- Screenshots saved in /cypress/screenshots
- Videos saved in /cypress/videos (when running headless)

### Postman:
- Detailed test results in Postman console
- Response validation for each request


