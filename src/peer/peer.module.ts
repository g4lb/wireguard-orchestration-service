import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peer } from './peer.entity';
import { PeerController } from './peer.controller';
import { PeerService } from './peer.service';
import { PeerGateway } from './peer.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Peer])],
  controllers: [PeerController],
  providers: [PeerService, PeerGateway],
})
export class PeerModule {}
