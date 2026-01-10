# Concrete 🐺

Concrete is a Chrome extension that demonstrates automated interaction flows in controlled environments. Paired with a small Node.js backend, it handles heartbeat monitoring, name verification, health checks, and can simulate repetitive in-game actions in custom lobbies for testing or educational purposes.

## ⚠️ Usage Notice

This project is provided as-is for educational and experimental purposes.  
Any use of this software is at the user’s own risk.  
Users are responsible for ensuring their actions comply with the rules and policies of any platform.

## ✨ Features

- Demonstrates automated interaction flows for Wolvesville  
- Includes backend logic for monitoring and validation  
- Can simulate repetitive tasks in controlled or test environments

## 🚀 Install the Extension

1. Clone or download this repository.  
2. Open Google Chrome and navigate to `chrome://extensions`.  
3. Enable Developer mode in the top right.  
4. Click **Load unpacked** and select this project folder.  
5. The extension will appear in the list of installed extensions.

## 🛠️ Set Up and Run the Server

The extension communicates with a local server located in the `abstract-bot-server` directory.

1. Install Node.js if not already installed.  
2. Navigate to the server directory:

cd abstract-bot-server

    Initialize and install dependencies (if starting from scratch):

npm init -y
npm install express cors

    Start the server:

node server.js

    The server listens on http://localhost:3000 by default.

    To use a different port, set the PORT environment variable.

Windows batch options

    start-server.bat – Launch the server with logging.

    autostart-installer.bat – Configure the server to run at startup.

    pm2-setup.bat – Run the server using PM2.

With the server running and the extension loaded in Chrome, Concrete demonstrates automated interaction flows for testing or educational purposes.
⚙️ Notes

    This project is for experimentation and learning only.

    Users are solely responsible for how they use it.

    Designed for controlled or test environments, not production or live gameplay.
