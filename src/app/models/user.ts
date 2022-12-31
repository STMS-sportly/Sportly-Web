export interface User {
  firstName: string,
  id: number,
  lastName: string,
  isAdmin: boolean
}

export interface GetCurrentUserDTO{
  userId: number,
  firstName: string,
  lastName: string
}
