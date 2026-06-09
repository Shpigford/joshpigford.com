export interface SharedProps {
  auth: {
    user: { id: number; email: string } | null
  }
  errors: Record<string, string[]>
  [key: string]: unknown
}

export interface GuestbookEntry {
  id: number
  name: string
  message: string
  homepage: string | null
  createdAt: string
  countryCode: string | null
  reactions: Record<string, number>
  reactionEmojis: string[]
}

export interface PendingGuestbookEntry {
  id: number
  name: string
  message: string
  status: string
  moderationReason: string | null
}
