# hw-playwright-2
Overview
This is a beginner-level automation practice project using Playwright. The repository is created to learn and practice the basics of UI test automation, including writing tests with JavaScript/TypeScript constructs, applying the Page Object Model (POM) pattern, and managing test data effectively.

The main goal is to understand how to build stable, maintainable, and readable automated UI tests.

What's inside
Page Object Model (POM)
The project uses a HomePage class (in the pages folder) to encapsulate interactions with the homepage elements. This helps keep test code clean, reusable, and easier to maintain.

Test Data
JSON files (article-data.json, article-data-for-loop.json) contain test data for article content. Separating data from test logic improves clarity and flexibility.

Test Examples
Located in the tests folder, the tests demonstrate:

Navigating the site

Clicking tags to filter articles

Validating that articles displayed match the selected tags

Using loops and conditional statements to verify multiple elements

Working with async functions and Playwright locators

Helper Utilities
helper.ts includes utility functions that simplify locator handling and test operations.

JavaScript/TypeScript Practice
Files like if-else.js show examples of conditional logic and loops to strengthen understanding of core language features in test scenarios.

How to run
Clone the repository:

bash
git clone https://github.com/SerhiiKuznetsQA/hw-playwright-2.git
cd hw-playwright-2
Install dependencies:

bash
npm install
Run tests:

bash
npx playwright test
Key classes and methods
HomePage

The constructor receives a Playwright page object.

Navigation methods such as navigateTo(), navigateToTagFeed()

Interaction methods like clickByTag()

Locators for homepage elements including article lists and popular tags

A method feedObj() returns an array of article texts used for assertions in tests

Tests
Each test instantiates HomePage, performs navigation, interacts with tags, and verifies that displayed articles correspond to the selected tag. Some tests use loops to iterate through articles and validate conditions.