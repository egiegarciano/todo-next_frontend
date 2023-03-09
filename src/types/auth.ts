export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type LogoutResponse = {
  message: string
}

export type Token = {
  username: string
  token: string
}
