import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Peer } from './peer.entity';

@Injectable()
export class PeerService {
  constructor(
    @InjectRepository(Peer)
    private readonly peerRepository: Repository<Peer>,
  ) {}

  async create(peer: Peer) {
    await this.peerRepository.save(peer);
  }

  async findAll(): Promise<Peer[]> {
    return this.peerRepository.find();
  }

  async findByTenantId(tenantId: string): Promise<Peer[]> {
    return this.peerRepository.find({ where: { tenantId } });
  }

  async findByNetworkId(networkId: string): Promise<Peer[]> {
    return this.peerRepository.find({ where: { networkId } });
  }

  async findById(id: string): Promise<Peer> {
    return this.peerRepository.findOne({ where: { id } });
  }

  async removePeer(id: string) {
    await this.peerRepository.delete(id);
  }
}
