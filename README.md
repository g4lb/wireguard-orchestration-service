# Wireguard Orchestration Service

The Wireguard Orchestration Service is a service that manages the synchronization of peers in an overlay network using the Wireguard VPN tunnel protocol.

## Features

- Tenant-based architecture: Each tenant owns a single overlay network, and each network belongs to a single tenant.
- Peer management: Onboards and offboards peers into the overlay network.
- Virtual IP address allocation: Allocates and deallocates virtual IP addresses from the network's address pool.
- Peer notifications: Notifies existing peers when a peer is added or removed.
- Handling unresponsive peers: Detects and handles unresponsive peers in a graceful manner.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/g4lb/wireguard-orchestration-service.git
   ```

2. Install the dependencies:

   ```shell
   cd wireguard-orchestration-service
   npm install
   ```

3. Set up the database connection by configuring the `ormconfig.json` file with your database credentials.

4. Run the migrations to set up the database schema:

   ```shell
   npm run typeorm migration:run
   ```

5. Start the server:

   ```shell
   npm run start:dev
   ```

## API Endpoints

The Wireguard Orchestration Service provides the following API endpoints:

- `POST /peers`: Add a new peer to the overlay network.
- `DELETE /peers/:id`: Remove a peer from the overlay network.
- `GET /peers`: Get a list of all peers in the overlay network.

Please refer to the API documentation for detailed information on request and response formats.

## WebSocket Notifications

The service uses WebSocket notifications to inform connected clients about peer changes. The following events are emitted:

- `peerAdded`: Triggered when a new peer is added to the overlay network.
- `peerRemoved`: Triggered when a peer is removed from the overlay network.
- `peers`: Triggered upon WebSocket connection to provide the initial list of peers.

## Technologies Used

- NestJS: A progressive Node.js framework for building efficient and scalable applications.
- TypeORM: An Object-Relational Mapping library for TypeScript and JavaScript.
- WebSocket: A communication protocol for real-time bidirectional communication between clients and servers.
