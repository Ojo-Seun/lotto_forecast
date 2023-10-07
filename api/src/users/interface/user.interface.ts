export type Role = 'USER' | 'SUBSCRIBER' | 'ADMINISTRATOR'

export interface USER {
  name: string
  email: string
  password: string
  roles: Role[]
  code: string
}

export interface UserPayload {
  name: string
  email: string
  sub: string
  roles: Role[]
}
