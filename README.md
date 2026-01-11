# Concrete

![Node.js](https://img.shields.io/badge/Node.js-18.x+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/Chrome-Manifest_V3-4285F4?style=flat&logo=googlechrome&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=flat)

A Chrome extension demonstrating automated interaction flows for browser-based game clients in controlled environments. Paired with a Node.js backend for heartbeat monitoring, name verification, and health checks.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Chrome Extension](#chrome-extension)
  - [Backend Server](#backend-server)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)

---

## Features

- Automated interaction flow demonstration
- Real-time heartbeat monitoring
- Name verification and validation
- Health check endpoints
- Configurable task simulation
- Chrome Manifest V3 compliant

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Google Chrome](https://www.google.com/chrome/) browser

---

## Installation

### Chrome Extension

1. Clone the repository:
   ```bash
   git clone https://github.com/kasumigaokasama/Concrete.git
   cd Concrete
   ```

2. Open Chrome and navigate to:
   ```
   chrome://extensions
   ```

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the `Concrete` project folder

5. The extension icon will appear in your browser toolbar

### Backend Server

1. Navigate to the server directory:
   ```bash
   cd abstract-bot-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. The server runs on `http://localhost:3000` by default

---

## Usage

1. Ensure the backend server is running
2. Click the Concrete extension icon in Chrome
3. Configure your settings via the popup interface
4. The extension will communicate with the local server for monitoring and validation

### Windows Quick Start

| Script | Description |
|--------|-------------|
| `start-server.bat` | Launch server with logging |
| `autostart-installer.bat` | Configure server to run at startup |
| `pm2-setup.bat` | Run server using PM2 process manager |

---

## Project Structure

```
Concrete/
├── manifest.json          # Chrome extension manifest (V3)
├── background.js          # Extension service worker
├── Concrete.js            # Content script
├── popup.html             # Extension popup UI
├── popup.js               # Popup functionality
├── icons/                 # Extension icons
└── abstract-bot-server/   # Backend server
    ├── server.js          # Express server
    └── package.json       # Server dependencies
```

---

## API Endpoints

The backend server exposes the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/heartbeat` | Heartbeat monitoring |
| `POST` | `/verify` | Name verification |

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |

Example:
```bash
PORT=8080 npm start
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Disclaimer

> **Warning**: This project is provided as-is for **educational and experimental purposes only**.

- Use at your own risk
- Users are responsible for ensuring compliance with platform rules and policies
- Designed for controlled/test environments, not production or live gameplay
- The authors assume no liability for misuse


---

<p align="center">
  Made with determination
</p>
