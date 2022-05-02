import { Role } from '~/types/role'
import { Institute } from '~/types/institute/institute'
import { Lesson } from '~/types/lesson'
import { Group } from '~/types/institute/group'

export interface User {
  id: number
  role?: Role
  fullName?: string
  avatarPath?: string
  birthDate?: string
  username: string
  institute?: Institute
  lessons?: Lesson[]
  group?: Group
}
