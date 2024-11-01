# PTS Test - Front-End and Data Structure

## Project Setup

To get started with the project, begin by cloning the repository to your local machine. After cloning, navigate to the project directory and run npm install to install all the necessary dependencies. Before launching the application, ensure that you fill out the .env file with the required environment variables. The database can be found in the public directory as database.json, where you can add or remove data, provided it adheres to the specified rules.

## Project Structure

This project utilizes the Next.js page router and is organized into seven main folders, along with a middleware directory. Below is an overview of each folder's purpose:

- components: Contains modules for the UI components, including page component or reusable components.

- constants: Stores variable paths.

- hooks: Includes custom hooks that are used throughout the application to manage various states and logic.

- lib: Contains reusable helper functions that assist with common tasks across the app and Zustand State management.

- pages: The default Next.js folder that defines the application's routing structure, with each file corresponding to a route, contains API Route to simulate database fetching.

- styles: The default Next.js folder for storing global CSS files and stylesheets.
