# SnapURL

Welcome to SnapURL, a URL shortener application designed to make your links shorter and easier to share. Built with TypeScript, MongoDB, React, Vite, and Express, SnapURL offers a fast and user-friendly way to shorten URLs with just a few clicks.

## Features

- **URL Shortening**: Convert long URLs into short, manageable links.
- **Link Management**: Easily manage your shortened URLs.
- **Analytics**: Track how many times your links are clicked.
- **User Accounts**: Create an account to manage your links and view analytics.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (LTS version)
- MongoDB (Local or Cloud Atlas)
- Yarn or npm installed

## Installation

To install SnapURL, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/holabayor/SnapURL.git
cd SnapURL
```

2. Install backend dependencies:

```
cd server
npm install
```

3. Install frontend dependencies:

```
cd ../client
npm install
```

4. Create a .env file in the backend directory with your MongoDB URI and any other environment variables. See the .env.example file:

```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

## Running SnapURL

To run SnapURL, you'll need to start both the backend and frontend servers.

1. Start the backend server:

```
cd server 
npm run dev
```

In a new terminal, start the frontend server:

```
cd client 
npm run dev
```

Navigate to http://localhost:3000 to see the application in action.

## Contributing to SnapURL

Contributions to SnapURL are welcome!

1. Fork the project.
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

<hr/>

SnapURL is an open-source project developed by [Aanuoluwapo Liasu](https://github.com/holabayor). For questions and support, please open an issue in the GitHub repository.
