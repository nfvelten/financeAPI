import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  role!: string

  @Column()
  position!: string

  @Column()
  avatar?: string

  @Column({ name: 'avatar_url' })
  avatarUrl?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @Column({ name: 'created_by' })
  createdBy!: string

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  @Column({ name: 'updated_by' })
  updatedBy?: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser?: User

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date

  @Column({ name: 'deleted_by' })
  deletedBy!: string
}
