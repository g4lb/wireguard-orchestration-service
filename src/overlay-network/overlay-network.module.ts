import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OverlayNetwork } from './overlay-network.entity';
import { OverlayNetworkController } from './overlay-network.controller';
import { OverlayNetworkService } from './overlay-network.service';

@Module({
  imports: [TypeOrmModule.forFeature([OverlayNetwork])],
  controllers: [OverlayNetworkController],
  providers: [OverlayNetworkService],
})
export class OverlayNetworkModule {}
