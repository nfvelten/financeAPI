export type PaginationResponse<T> = T & {
  numberOfRegisters: number
  numberOfPages: number
}
