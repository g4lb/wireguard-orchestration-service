import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverlayNetwork } from './overlay-network.entity';

@Injectable()
export class OverlayNetworkService {
  constructor(
    @InjectRepository(OverlayNetwork)
    private readonly overlayNetworkRepository: Repository<OverlayNetwork>,
  ) {}

  async create(overlayNetwork: OverlayNetwork) {
    await this.overlayNetworkRepository.save(overlayNetwork);
  }

  async findAll(): Promise<OverlayNetwork[]> {
    return this.overlayNetworkRepository.find();
  }

  async findByTenantId(tenantId: string): Promise<OverlayNetwork[]> {
    return this.overlayNetworkRepository.find({ where: { tenantId } });
  }

  async findById(id: string): Promise<OverlayNetwork> {
    return this.overlayNetworkRepository.findOne({ where: { id } });
  }

  async allocateIpAddress(networkId: string): Promise<string> {
    const network = await this.findById(networkId);
    const ipAddress = network.addressPool.shift();
    await this.overlayNetworkRepository.save(network);
    return ipAddress;
  }

  async deallocateIpAddress(networkId: string, ipAddress: string) {
    const network = await this.findById(networkId);
    network.addressPool.push(ipAddress);
    await this.overlayNetworkRepository.save(network);
  }
}
