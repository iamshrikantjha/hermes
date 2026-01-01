# Hermes (Open Source)

Hermes is a secure, real-time code collaboration platform featuring video calls and chat, built with a privacy-first approach. It uses **Gun.js** for decentralized data synchronization and **WebRTC** for P2P video calls, ensuring no data persists on a central server.

## Features

- **Real-time Code Collaboration**: Monaco Editor with multi-language support (TS, JS, Python, Go, Rust, etc.).
- **P2P Video & Audio Calls**: Crystal clear communication via WebRTC.
- **Instant Chat**: Ephmemeral chat synced via Gun.js.
- **No Sign-up**: Just create a room share the link.
- **Privacy First**: Data is ephemeral. 

## Technology Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: TailwindCSS v4, DaisyUI 5, Inter Font
- **Realtime**: Gun.js (Decentralized Graph Database)
- **Video/Audio**: Simple-Peer (WebRTC)
- **Editor**: Monaco Editor

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamshrikantjha/hermes.git
   cd hermes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

## Usage

1. Enter your name on the home page.
2. Click "Get Started" to create a new room (or enter an existing Room ID).
3. Share the Room URL with others.
4. Collaborate on code, chat, and use video/audio calls instantly.

## Architecture

- `src/realtime/gun.ts`: Manages Gun.js connection and state synchronization.
- `src/realtime/webrtc.ts`: Handles WebRTC signaling and stream management.
- `src/components`: UI components (Editor, Chat, VideoGrid).
- `src/routes`: Application routes (Home, Room).

## License

GNU General Public License v3.0