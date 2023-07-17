export interface SuccessReponseApi<Data> {
  message: string
  data: Data
}

export interface ErrorReponseApi<Data> {
  message: string
  data?: Data
}

export type NoUndefineField<T> = {
  [P in keyof T]-?: NoUndefineField<NonNullable<T[P]>>
}
