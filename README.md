# OrangeHRM Automation Tests

This repository contains end-to-end automation tests for the OrangeHRM application using [Playwright](https://playwright.dev/). The tests validate key functionalities of the OrangeHRM system to ensure robustness and reliability.

---

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js - (version 16 or above recommended)
- npm - (comes with Node.js)
- Docker - (optional, if you want to run tests in a container)

---

## Setup Instructions

**Clone the repository**

```bash
git clone https://github.com/haris1068/orangehr-automate.git
cd orangehr-automate
```

## Install dependencies

```bash
npm install
npx playwright install --with-deps
```

## Configure environment variables

Create a .env file in the root directory and add your credentials:
Make sure to replace the placeholders with your actual OrangeHRM admin username and password.


```env
ADMIN_USER=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

## Running Tests
Run all Playwright tests with:

```bash
npx playwright test
```

## Linting
To check the code quality using ESLint:

```bash
npm run lint:fix
```

## Docker Support
You can run the tests inside a Docker container:

Run the tests inside the container:

```bash
docker-compose run test
Ensure your .env file is properly configured before running tests inside Docker.
```
## Continuous Integration
### Workflow file: .github/workflows/playwright.yml

This repo contains a GitHub Actions workflow that:

    1. Installs dependencies
    2. Runs linting
    3. Executes Playwright tests


### Notes:
    - Never commit your .env file with credentials; add it to .gitignore if not already added.
    
    - Customize playwright.config.ts for additional configuration options like timeouts, retries, browsers, etc.
