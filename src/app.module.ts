import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { OverlayNetworkModule } from './overlay-network/overlay-network.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeerModule } from './peer/peer.module';
import config from './utils/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TenantModule,
    OverlayNetworkModule,
    PeerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
