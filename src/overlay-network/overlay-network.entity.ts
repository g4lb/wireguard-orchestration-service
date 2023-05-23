import { Tenant } from 'src/tenant/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OverlayNetwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => Tenant)
  tenant: Tenant;

  @Column('simple-array')
  addressPool: string[];
}
