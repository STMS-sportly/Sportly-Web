import { User } from "./user"

export interface TeamDTO {
  id: number,
  teamType: string,
  teamName: string,
  organizationName?: string,
  location?: string,
  discipline: {name: string},
  membersCount: number,
  role: string
}



export interface TeamDetailsDTO {
  teamName: string,
  organizationName?: string,
  sportType: string,
  members: User[],
  discipline: {name: string},
  id: number,
  isAdmin: boolean,
  joinedDate: Date | null,
  location?: string,
  membersCount: number,
  name: string,
  teamType: string
}
