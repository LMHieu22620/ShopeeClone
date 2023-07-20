import { User } from './user.type'
import { SuccessReponseApi } from './utils.file'

export type AuthResponse = SuccessReponseApi<{
  access_token: string
  expires: string
  user: User
}>
