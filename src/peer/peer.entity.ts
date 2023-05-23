import { OverlayNetwork } from 'src/overlay-network/overlay-network.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Peer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => Tenant)
  tenant: Tenant;

  @Column()
  networkId: string;

  @ManyToOne(() => OverlayNetwork)
  network: OverlayNetwork;

  @Column()
  virtualIpAddress: string;

  @Column()
  realIpAddress: string;
}
