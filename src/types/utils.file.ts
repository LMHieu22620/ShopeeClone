export interface SuccessReponseApi<Data> {
  message: string
  data: Data
}

export interface ErrorReponseApi<Data> {
  message: string
  data?: Data
}
