import { OrderStatus } from '@/enums/order-status.enum'
import { PaymentGate } from '@/enums/payment-gate.enum'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ type: 'int', default: 0 })
  game_id: number

  @Index()
  @Column({ type: 'int', default: 0 })
  user_id: number

  @Column({ type: 'varchar', nullable: true })
  ref_code: string

  @Column({ type: 'varchar', nullable: true })
  paygate: PaymentGate

  @Column({ type: 'json' })
  payload: any

  @Column({ type: 'json' })
  webhook: any

  @Column({ type: 'smallint', default: 0 })
  status: OrderStatus

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
