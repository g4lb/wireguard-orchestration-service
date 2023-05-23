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
   git clone https://github.com/your-repo-url.git
