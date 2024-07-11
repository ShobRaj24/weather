# Weather Dashboard Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [APIs](#apis)
- [Firebase Setup](#firebase-setup)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Weather Dashboard Application is a web-based platform that allows users to search for current weather conditions and a 5-day weather forecast for any city. Users can also save their favorite cities and view weather updates for these cities.

## Features
- Search for current weather conditions by city.
- View a 5-day weather forecast with detailed weather information.
- User authentication (sign up, log in, log out).
- Add and remove favorite cities.
- Responsive design for mobile and desktop views.

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- Firebase account (for authentication and Firestore database)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/ShobRaj24/weather.git
    cd weather
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up Firebase:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project.
    - Add a web app to your project and copy the Firebase configuration.
    - Enable Authentication (Email/Password and Google Sign-In).
    - Set up Firestore Database with appropriate rules.

4. Create a `.env` file in the root directory and add your Firebase configuration:
    ```
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

5. Start the development server:
    ```bash
    npm start
    ```

## Usage
- Visit `http://localhost:3000` in your browser.
- Register a new account or log in with an existing account.
- Use the search bar to find the current weather and 5-day forecast for any city.
- Add cities to your favorites list for quick access.

## Technologies Used
- React.js
- Material-UI
- Firebase (Authentication and Firestore)
- OpenWeatherMap API

## APIs
This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You need to sign up on OpenWeatherMap and get an API key to use the weather services.

## Firebase Setup
1. **Authentication**: Enable Email/Password and Google Sign-In methods in the Firebase console.
2. **Firestore Database**: Create a collection called `favorites` to store users' favorite cities. Ensure the Firestore rules allow read and write access to authenticated users.

## Project Structure
\''' weather-dashboard/
├── public/
│   ├── index.html        # Main HTML file
│   ├── cloud.jpg         # Background image
│   └── ...               # Other public assets
├── src/
│   ├── api/              # API utility functions
│   │   └── weatherApi.js # Weather API integration
│   ├── components/       # React components
│   │   ├── SearchBar.js        # Component for city search
│   │   ├── CurrentWeather.js   # Component to display current weather
│   │   ├── Favorites.js        # Component for managing favorite cities
│   │   └── ...                 # Other components
│   ├── contexts/         # React context providers
│   │   └── authContext.js      # Authentication context
│   ├── firebase/         # Firebase configuration and utilities
│   │   ├── auth.js             # Authentication functions
│   │   ├── config.js           # Firebase configuration setup
│   │   └── firestore.js        # Firestore database functions
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point of the application
│   └── ...               # Other application files
├── .env                  # Environment variables configuration
├── package.json          # Node.js package configuration
├── README.md             # Project documentation
└── ...                   # Other project files and folders
\'''
