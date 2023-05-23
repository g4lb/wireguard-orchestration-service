import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PeerService } from './peer.service';
import { Peer } from './peer.entity';

@WebSocketGateway()
export class PeerGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private connectedPeers: Set<string> = new Set();

  constructor(private readonly peerService: PeerService) {}

  async afterInit(server: Server) {
    // Start the heartbeat check at regular intervals
    setInterval(() => this.checkPeersHeartbeat(), 5000);
  }

  async handleConnection(client: Socket) {
    const peers = await this.peerService.findAll();
    client.emit('peers', peers);

    this.connectedPeers.add(client.id);
  }

  async handleDisconnect(client: Socket) {
    this.connectedPeers.delete(client.id);

    // Handle disconnection logic if needed
  }

  @SubscribeMessage('addPeer')
  async handleAddPeer(client: Socket, data: any) {
    // Handle adding a new peer
    const { tenantId, networkId, virtualIpAddress, realIpAddress } = data;

    // Create the new peer in the database
    const newPeer = new Peer();
    newPeer.tenantId = tenantId;
    newPeer.networkId = networkId;
    newPeer.virtualIpAddress = virtualIpAddress;
    newPeer.realIpAddress = realIpAddress;
    await this.peerService.create(newPeer);

    // Notify all connected clients about the new peer
    this.server.emit('peerAdded', newPeer);

    this.connectedPeers.add(client.id);
  }

  @SubscribeMessage('removePeer')
  async handleRemovePeer(client: Socket, peerId: string) {
    // Handle removing a peer
    await this.peerService.removePeer(peerId);

    // Notify all connected clients about the removed peer
    this.server.emit('peerRemoved', peerId);

    this.connectedPeers.delete(client.id);
  }

  private checkPeersHeartbeat() {
    for (const clientId of this.connectedPeers) {
      const client = this.server.sockets.sockets.get(clientId);

      // Check if the client is still connected
      if (!client) {
        // Handle unresponsive peer logic
        this.handleUnresponsivePeer(clientId);
      }
    }
  }

  private handleUnresponsivePeer(peerId: string) {
    // Handle the unresponsive peer, e.g., update its status, notify other peers, etc.
    console.log(`Peer ${peerId} is unresponsive.`);
  }
}
