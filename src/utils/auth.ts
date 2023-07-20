import { User } from 'src/types/user.type'

export const setAccesTokenToLs = (acces_token: string) => {
  localStorage.setItem('access_token', acces_token)
}

export const clearLs = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenToLs = () => localStorage.getItem('access_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
