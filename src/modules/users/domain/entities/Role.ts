export type PossibleRole = 'super'|'admin'|'editor'

export class Role {
  readonly value: PossibleRole

  constructor(role: PossibleRole) {
    this.value = role
  }

  isAllowed(role: PossibleRole): boolean {
    const levels: Record<PossibleRole, number> = {
      super: 3,
      admin: 2,
      editor: 1
    }

    return levels[this.value] >= levels[role]
  }
}
