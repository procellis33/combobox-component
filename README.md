# ComboBox & Input

This repository is an application built with React, TypeScript and Vite. The codebase is maintained using ESLint and Prettier to ensure proper code structure and
syntax.

Additional technologies used: TanStack Query, Axios, React Hook Form, Zod, Floating UI, TailwindCSS.

## Specification

### Overview:
The project involves creating a ComboBox component using TypeScript, React, and other required libraries.
The ComboBox component should function as an input field with autocomplete functionality, allowing users to select from a list of options.

### Project Tasks:

#### Task 1: Basic Text Input Component
 - Create a basic text input component that can be integrated with React Hook Form but is also usable independently.
 - The component should support states for disabled and error.

#### Task 2: Fetching Data for ComboBox
 - Use Axios and TanStack Query to fetch data from an endpoint that provides a list of universities.
 - The endpoint URL format should include parameters for country (set to Czech Republic) and university name for dynamic filtering.
 - The fetched data should be used to populate the options for the ComboBox.

#### Task 3: ComboBox Component
 - Build the ComboBox component using the previously created text input component and the fetched university data.
 - The ComboBox should display a panel with autocomplete options based on user input.
 - When the input field receives focus, show all universities if the field is empty.
 - Implement the ability to select an option from the panel by clicking on it.
 - Allow users to clear the selected option by clicking on a close icon.
 - Provide support for disabled and error states, similar to the basic text input component.
 - Ensure responsiveness of the panel and display a scrollbar if the list of options exceeds the available space.

#### Task 4: Form Integration
 - Utilize both the text input and ComboBox components to create a form.
 - Implement frontend validation using the chosen form library to ensure the first name field is filled.
 - Display an error message if the first name field is empty.
 - Upon successful form submission, display an alert window with the entered first name and selected university (if any).

### Expected Behavior:
 - The ComboBox should provide autocomplete suggestions based on user input.
 - The form should validate the first name field and display an error message if it's empty.
 - Upon form submission, an alert should display the entered first name and selected university (if any).

### Additional Considerations:
 - Ensure the ComboBox and text input components are usable independently and within a form context.
 - Ensure responsiveness and accessibility of the ComboBox panel.


#### [Click here to see it showcased on YouTube](https://youtu.be/SGCl4qQ0IEg)

## Running application locally

To run the application on your local machine, follow these steps:

- Clone this repository.
- Install dependencies by running `npm install`.
- Start the development server with `npm run dev`.

## Documentation

Here are some useful scripts you can run:

- `npm run dev`: Builds the production version and opens the application in development mode.
- `npm run lint`: Runs ESLint.
- `lint-and-format`: Runs ESLint and Prettier to check and format the code.
