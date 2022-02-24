import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from '.'

@Entity('retirement_organizations')
export class RetirementOrganization {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category!: Category

  @Column()
  name!: string

  @Column({ name: 'interest_per_month', type: 'decimal' })
  interestPerMonth!: number

  @Column({ name: 'term_in_months', type: 'int' })
  termInMonths!: number

  @Column({ name: 'coefficient', type: 'decimal' })
  coefficient!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
