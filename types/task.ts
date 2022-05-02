import { User } from '~/types/user'
import { Lesson } from '~/types/lesson'

export interface Task {
  id: number
  title: string
  students: User[]
  creator: User
  lesson: Lesson
}
