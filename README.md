# React Route Management Application

This project is a React-based application for managing routes and stops, utilizing Google Maps integration.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Libraries and Dependencies

This project uses several key libraries and dependencies:

### Core Libraries
- **React**: A JavaScript library for building user interfaces.
- **React DOM**: Serves as the entry point to the DOM and server renderers for React.
- **React Router**: Declarative routing for React applications.

### State Management
- **Redux**: A predictable state container for JavaScript apps.
- **React-Redux**: Official React bindings for Redux.

### UI Components
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

### Map Integration
- **react-google-places-autocomplete**: A Google Places Autocomplete component for React.
- **@react-google-maps/api**: React components for Google Maps API.

### Type Checking
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

### Development Tools
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier**: An opinionated code formatter.

### Testing
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **React Testing Library**: Simple and complete testing utilities that encourage good testing practices.

To install all dependencies, run:

```
npm install
```

Make sure to set up your Google Maps API key in the environment variables before running the application:

```
REACT_APP_GOOGLE_API_KEY=your_api_key_here
```
