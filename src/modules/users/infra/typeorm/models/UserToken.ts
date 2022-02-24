import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated
} from 'typeorm'

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  @Generated('uuid')
  token!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'expires_in' })
  expiresIn!: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}
