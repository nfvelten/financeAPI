import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('config_fgts_birthday')
export class FgtsBirthdayConfig {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'interest_per_month' })
  interestPerMonth!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
