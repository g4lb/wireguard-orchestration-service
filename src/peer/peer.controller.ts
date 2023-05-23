import { Controller, Get } from '@nestjs/common';
import { PeerService } from './peer.service';

@Controller('peers')
export class PeerController {
  constructor(private readonly peerService: PeerService) {}

  @Get()
  findAll() {
    return this.peerService.findAll();
  }
}
