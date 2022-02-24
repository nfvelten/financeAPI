export interface IHashProvider {
  hash: (toHash: string) => Promise<string>
  compare: (payload: string, hashed: string) => Promise<boolean>
}
