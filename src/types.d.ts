export interface Song {
  id: number
  title: string
  author: string
  lyrics: { id: number, content: string }[]
}