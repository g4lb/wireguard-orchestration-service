import { Controller, Param, Patch } from '@nestjs/common';
import { OverlayNetworkService } from './overlay-network.service';

@Controller('overlay-networks')
export class OverlayNetworkController {
  constructor(private readonly overlayNetworkService: OverlayNetworkService) {}

  @Patch(':networkId/allocate-ip')
  allocateIpAddress(@Param('networkId') networkId: string) {
    const ipAddress = this.overlayNetworkService.allocateIpAddress(networkId);
    return { ipAddress };
  }

  @Patch(':networkId/deallocate-ip/:ipAddress')
  deallocateIpAddress(
    @Param('networkId') networkId: string,
    @Param('ipAddress') ipAddress: string,
  ) {
    this.overlayNetworkService.deallocateIpAddress(networkId, ipAddress);
    return { message: 'IP address deallocated successfully.' };
  }
}
