import { User } from '@modules/users/infra/typeorm/models/User'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('simulations')
export default class Simulation {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  email!: string

  @Column()
  cpf!: string

  @Column()
  phone!: string

  @Column({ name: 'loan_type' })
  loanType!: 'payrollLinked' | 'fgts'

  @Column()
  status!: 'Contratou' | 'Negociando' | 'Não contratou' | 'Simulou'

  @Column()
  negotiator?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy?: User

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date

  @Column({ name: 'deleted_by' })
  deletedBy?: string
}
