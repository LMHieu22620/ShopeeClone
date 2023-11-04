import { User } from './user.type'
import { SuccessReponseApi } from './utils.file'

export type AuthResponse = SuccessReponseApi<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: string
  user: User
}>

export type RefreshTokenReponse = SuccessReponseApi<{
  access_token: string
}>
