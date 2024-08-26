Got it! Here’s an updated version of the README file that reflects the need to use the local IP address instead of `localhost`.

---

# Done With It API (Node.js)

This repository contains the backend for the Done With It application, which is part of Mosh Hamedani's React Native course. The backend was originally designed and created by Mosh Hamedani, and I have made updates to ensure compatibility with later versions of Expo and Node.js.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [License](#license)

## Introduction

The Done With It API is the backend service for the Done With It app, built in Mosh Hamedani's comprehensive React Native course. For more details about the course, visit [Code with Mosh](https://codewithmosh.com) and the specific course [link here](https://codewithmosh.com/p/the-ultimate-react-native-course-part1).

## Prerequisites

Before running the backend server, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or later is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/majshub/DoneWithIt-api-node.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd DoneWithIt-api-node
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

## Configuration

Before starting the server, you need to configure the `assetsBaseUrl` in `config/development.json` to point to your local machine's IP address.

1. Open `config/development.json` in a text editor.

2. Update the `assetsBaseUrl` with your local machine's IP address. It should look like this:

   ```json
   {
     "assetsBaseUrl": "http://<YOUR_LOCAL_IP>:9000/assets/",
     "port": 9000
   }
   ```

   **Important:** Replace `<YOUR_LOCAL_IP>` with your actual local IP address. Using `localhost` will not work because it will refer to the local loopback interface instead of your machine's network IP address.

## Running the Server

1. **Start the Server:**

   ```bash
   node index.js
   ```

2. **Verify the Server is Running:**

   Open your browser or use a tool like [Postman](https://www.postman.com/) to access `http://<YOUR_LOCAL_IP>:9000` and check if the server is responding.

## License

This project is licensed under the [MIT License](LICENSE).

---

For any issues or contributions, please open an issue or submit a pull request on this repository.

Happy coding! 🚀

---
