export interface User{
  nickname?: string,
  email: string,
  password: string,
  techsupport?: boolean
}

export interface Ticket {
  id?: string
  title: string
  text1: string
  text2?: string
  author: string
  authorSupport?: string
  date: Date
  dateResolve?: Date
  resolve?: boolean
}
