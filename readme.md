# Playwright Automation Suite for Recruitment Task

This repository contains an automation suite built using **Playwright** and **TypeScript** to fulfill a recruitment task. The suite covers various scenarios related to the "Team table," "Date picker," "Pie chart," and "Settings" modules of the web application under consideration.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js (v14 or higher) installed on your machine.
- Git installed to clone this repository.

## Installation

Follow these steps to set up the automation suite:

1. Clone the repository:

```
git clone https://github.com/tymsam/playwright-automation-suite.git
```

2. Navigate to the project directory:

```
cd playwright-automation-suite
```

3. Install project dependencies using npm:

```
npm install
```

4. Update PLaywright browsers using:

```
npx playwright install
```

## Running the Automation Suite

You can run the automation suite with the following command:

```
npx playwright test
```

This command will execute the test scripts using Playwright and generate relevant reports and outputs.

## Test Scenarios

### Team Table

#### Scenario 1: Verify Table Column Sorting

#### Scenario 2: Verify Persistent Column Sorting

> Tests located in: `tests/teamTable.spec.ts`

### Date Picker

#### Scenario 1: Verify Date Picker Functionality

> Tests located in: `tests/datePicker.spec.ts`

### Pie Chart

#### Scenario 1: Verify Pie Chart Category Selection

> Tests located in: `tests/pieChart.spec.ts`

### Settings

#### Scenario 1: Verify Inability to Update Account without Password

#### Scenario 2: Verify Ability to Update Account with Password

> Tests located in: `tests/accountSettings.spec.ts`

## Commentary

The absence of proper IDs within HTML DOM elements and the intricate structure of the webpage pose difficulties in constructing effective locators for testing purposes. To enhance the test script's readability and robustness, it's essential to collaborate closely with developers. This collaboration will enable the creation of more elegant and resilient locators, ultimately improving the efficiency and maintainability of the testing process.
