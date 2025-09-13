# Concrete 🐺

Concrete is a Chrome extension that automates gameplay in [Wolvesville](https://www.wolvesville.com/). Paired with a small Node.js backend, it handles heartbeat monitoring, name verification, health checks, and can automatically farm XP for you in custom lobbies.

## ✨ Features

- 🎮 Wolvesville automation
- 📈 Automatic XP farming in custom lobbies
- ⚙️ Node.js server for backend tasks

## 🚀 Install the Extension

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select this project folder. The extension will appear in the list of installed extensions.

## 🛠️ Set Up and Run the Server

The extension communicates with a local server located in the `abstract-bot-server` directory.

1. **Install Node.js**  
   Download and install [Node.js](https://nodejs.org/) for your platform if it is not already available.

2. **Navigate to the server directory**

   ```cmd
   cd abstract-bot-server
   ```

3. **Initialize and install dependencies**

   The repository already contains a `package.json`, but if you are setting up the project from scratch run:

   ```cmd
   npm init -y
   npm install express cors
   ```

4. **Start the server**

   ```cmd
   node server.js
   ```

   The server listens on `http://localhost:3000` by default. Set the `PORT` environment variable to use a different port.

   On Windows you may start or configure the server using the provided batch files:

   - `start-server.bat` – launch the server with logging.
   - `autostart-installer.bat` – configure the server to run at startup.
   - `pm2-setup.bat` – run the server using PM2.

With the server running and the extension loaded in Chrome, Concrete will connect to the backend for its automation features, including automatic XP farming.
